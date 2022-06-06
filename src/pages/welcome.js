import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
function Welcome() {
    const [ErrorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();

    //function submit the login form
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
        const responseCode = response.status;
        switch (responseCode){
            case 200:
                console.log("Success")
                if (response.data.accessToken) {
                    localStorage.setItem("token", JSON.stringify(response.data.jwt));
                }
                navigate(`/main`)
                break;
            default:
                console.log("Unknown error")
                setErrorMessage("Es ist ein Fehler aufgetreten.")
                break;
        }
    }

    return (
        <div className="general">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <img className="mb-4" src="/logo.png" alt="" width="200" height="200" style={{margin: 20}}/>
                        <h1 className="h1 mb-3 font-weight-normal">Willkommen bei RateYourProf</h1>
                        <p style={{marginBottom: 50}}>Bitte melden Dich an, um fortzufahren.</p>
                    </div>
                </div>
            </div>
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
        </div>
    );
}
export default Welcome;