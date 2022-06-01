import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
function Signup() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [forename, setForename] = useState('');
    const [surname, setSurname] = useState('');
    const [ErrorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();

    async function submitUserdata () {
        setErrorMessage("")
        const response = await fetch('http://localhost:8000/users/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: forename,
                //surname: surname,
                //forename: forename,
            })
        })
        const responseCode = response.status;
        switch (responseCode){
            case 201:
                console.log("User Added successfully")
                navigate(`/main`)
                break;
            case 200:
                console.log("Userdata already exists")
                const data = await response.json();
                console.log("Following data is duplicate: " + JSON.stringify(data));
                switch (data.exists) {
                    case "email":
                        setErrorMessage("Deine E-Mail-Adresse existiert bereits!")
                        break;
                    case "name":
                        setErrorMessage("Dein Name existiert bereits!")
                        break;
                }
                break;
            default:
                console.log("Unknown error")
                setErrorMessage("Es ist ein Fehler aufgetreten.")
                break;
        }
    }

    return (
        <div className="general">
            <form>
                <p>Melde dich direkt an und gib deine Daten ein!</p>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">E-Mail-Adresse</label>
                    <input type="email" className="form-control" id="InputEmail" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label">Passwort</label>
                    <input type="password" className="form-control" id="InputPassword" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputForename" className="form-label">Vorname</label>
                    <input type="text" className="form-control" id="InputForename" onChange={e => setForename(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputSurname" className="form-label">Nachname</label>
                    <input type="text" className="form-control" id="InputSurname" onChange={e => setSurname(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => submitUserdata()}>Senden</button>
                <p>{ErrorMessage}</p>
            </form>
        </div>
    );
}
export default Signup;