import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
function Welcome() {
    const [ErrorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();

    async function submitUserdata () {
        setErrorMessage("")
        const response = await fetch('http://localhost:8000/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    email: document.getElementById("InputEmail").value,
                    password: document.getElementById("InputPassword").value,
            })
        })
        const data = await response.json();
        console.log(JSON.stringify(data));
        if (data.authenticated == true) { //Je nach Rückgabe abzuändern
            console.log("Success")
            navigate(`/main`)
        } else {
            setErrorMessage("Es ist ein Fehler aufgetreten.")
        }
    }

    return (
            <form>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">E-Mail-Adresse</label>
                    <input type="email" className="form-control" id="InputEmail"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label">Passwort</label>
                    <input type="password" className="form-control" id="InputPassword"/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => submitUserdata()}>Submit</button>
                <p>{ErrorMessage}</p>
            </form>
    );
}
export default Welcome;