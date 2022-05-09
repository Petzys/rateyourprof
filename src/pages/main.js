import React from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
function NotFound() {
    return (
        <>
            <label htmlFor="inputPassword5" className="form-label">Suche deinen Dozenten</label>
            <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"/>
        </>

    );
}
export default NotFound;