import React, {useState} from "react";
import { createBrowserHistory } from 'history';
import {Route, Router, Navigate} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import '../App.css';
function Welcome() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [ErrorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();

    async function submitUserdata () {
        setErrorMessage("")
        const response = await fetch('https://reqres.in/api/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userlogin": [{
                    status: 1,
                    email: email,
                    password: password,
                }]
            })
        })
        const data = await response.json();
        console.log(JSON.stringify(data));
        if (data.userlogin[0].status == 1) { //Je nach Rückgabe abzuändern
            console.log("Success")
            navigate(`/main`)
        } else {
            setErrorMessage("Es ist ein Fehler aufgetreten.")
        }
    }

    return (
            <form>
                <div className="mb-3">
                    <label htmlFor="InputEmail1" className="form-label">E-Mail-Adresse</label>
                    <input type="email" className="form-control" id="InputEmail1" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label">Passwort</label>
                    <input type="password" className="form-control" id="InputPassword" onChange={e => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => submitUserdata()}>Submit</button>
                <p>{ErrorMessage}</p>
            </form>
    );
}
export default Welcome;