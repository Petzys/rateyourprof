import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
function Signup() {
    const [ErrorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();

    //function submit the signup form
    async function submitUserdata (event) {
        event.preventDefault();
        console.log("Submitting userdata");
        setErrorMessage("")
        const response = await fetch('http://localhost:8000/users/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: document.getElementById("InputEmail").value,
                forename: document.getElementById("InputForename").value,
                surname: document.getElementById("InputSurname").value,
                password: document.getElementById("InputPassword").value,
            })
        })
        const responseCode = response.status;
        const data = await response.json();
        switch (responseCode){
            case 201:
                console.log("User Added successfully")
                if (data.jwt) {
                    localStorage.setItem("token", JSON.stringify(data.jwt));
                }
                navigate(`/main`)
                break;
            case 401:
                console.log("Userdata already exists")
                setErrorMessage("E-Mail existiert bereits.")
                break;
            default:
                console.log("Unknown error")
                setErrorMessage("Es ist ein Fehler aufgetreten.")
                break;
        }
    }

    return (
        <div className="general">
            <form onSubmit={submitUserdata}>
                <p>Melde dich direkt an und gib deine Daten ein!</p>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">E-Mail-Adresse</label>
                    <input type="email" className="form-control" id="InputEmail"/>
                </div>
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
                <button type="submit" className="btn btn-primary">Senden</button>
                <p>{ErrorMessage}</p>
            </form>
        </div>
    );
}
export default Signup;