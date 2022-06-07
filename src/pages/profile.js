import React, {useState, useEffect} from "react";
import '../App.css';
function Profile() {
    const [email, setEmail] = useState('');
    const [forename, setForename] = useState('');
    const [surname, setSurname] = useState('');
    const [ErrorMessage, setErrorMessage] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        getUserData();
    }, []);

    async function getUserData () {
        setErrorMessage("")
        const response = await fetch('http://localhost:8000/users/profile/view', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }})
        const responseCode = response.status;
        switch (responseCode){
            case 200:
                console.log("Profile view request was successful")
                const data = await response.json()
                console.log(JSON.stringify(data))
                setForename(data[0].forename)
                setSurname(data[0].surname)
                setEmail(data[0].email)
                break;
            case 401:
                console.log("Not logged in")
                setErrorMessage("Du bist nicht eingeloggt.")
                break;
            case 403:
                console.log("Not authorized")
                setErrorMessage("Du hast nicht die nötigen Rechte.")
                break;
            default:
                console.log("Unknown error")
                setErrorMessage("Es ist ein Fehler aufgetreten.")
                break;
        }
    }

    async function submitUserdata () {
        setErrorMessage("")
        const response = await fetch('http://localhost:8000/users/profile/edit', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
            body: JSON.stringify({
                forename: (((document.getElementById("InputForename").value).length > 0) ? document.getElementById("InputForename").value : forename),
                surname: (((document.getElementById("InputSurname").value).length > 0) ? document.getElementById("InputSurname").value : surname),
                password: (((document.getElementById("InputPassword").value).length > 0) ? document.getElementById("InputPassword").value : ""),
            })
        })
        const responseCode = response.status;
        switch (responseCode){
            case 200:
                console.log("Profile data changed successfully")
                //Bootstrap Popup?
                setModalMessage("Deine Daten wurden erfolgreich geändert!")
                break;
            case 401:
                console.log("Not logged in")
                setErrorMessage("Du bist nicht eingeloggt.")
                break;
            case 403:
                console.log("Not authorized")
                setErrorMessage("Du hast nicht die nötigen Rechte.")
                break;
            default:
                console.log("Unknown error")
                setModalMessage("Es ist ein Fehler aufgetreten.")
                break;
        }
    }

    return (
        <div className="general">
            <h2>Profildaten</h2>
            <table className="table table-dark table-striped">
                <tbody>
                <tr>
                    <th scope="row">Vorname</th>
                    <td>
                        {forename}
                    </td>
                </tr>
                <tr>
                    <th scope="row">Nachname</th>
                    <td>
                        {surname}
                    </td>
                </tr>
                <tr>
                    <th scope="row">E-Mail</th>
                    <td>
                        {email}
                    </td>
                </tr>
                </tbody>
            </table>
            <form style={{marginTop: 30}}>
                <h3>Ändere jetzt deine Profildaten</h3>
                <h6><i>Alles, was nicht geändert werden soll, bitte leer lassen.</i></h6>
                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label">Passwort</label>
                    <input type="password" className="form-control" id="InputPassword"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputForename" className="form-label">Vorname</label>
                    <input type="text" className="form-control" id="InputForename"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputSurname" className="form-label">Nachname</label>
                    <input type="text" className="form-control" id="InputSurname"/>
                </div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => submitUserdata()}>Senden</button>
            </form>
            <p>{ErrorMessage}</p>

            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{color: "black"}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Änderungsstatus</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{modalMessage}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Schließen</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;