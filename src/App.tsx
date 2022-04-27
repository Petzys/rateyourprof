import {BrowserRouter, Route, Routes, Navigate, Router, Link } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import './App.css';
import Navbar from "./Navbar/index";

function App() {
    return (
        <div className={"App"}>
            <Navbar/>
                <Routes>
                    <Route path='/' element={<Navigate replace to='/home' />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
        </div>
    );
}
export default App;