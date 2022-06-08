import {useState} from 'react';
import {Route, Routes, Navigate, Link, useNavigate} from "react-router-dom";
import Welcome from "./pages/welcome"
import NotFound from "./pages/notfound";
import {Container, Nav, Navbar} from "react-bootstrap";
import Main from "./pages/main";
import Signup from "./pages/signup";
import Prof from "./pages/prof";
import Module from "./pages/module";
import Rating from "./pages/rating";
import Comments from "./pages/comments";
import './index.css'
import Profile from "./pages/profile";
import {BsPersonFill} from "react-icons/bs";

function App() {
    let navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);
    function logout() {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    }

    return (
            <>
                <Navbar variant="light" expand="lg" style={{backgroundColor: "#fff"}}>
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            <img
                                alt=""
                                src="/logo.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />
                            {'  '}RateYourProf
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/main">Suche</Nav.Link>
                            {!isLoggedIn && (<Nav.Link href="/welcome">Anmelden</Nav.Link>)}
                            {!isLoggedIn && (<Nav.Link href="/signup">Registrieren</Nav.Link>)}
                            {isLoggedIn && (<Nav.Link onClick={() => logout()}>Abmelden</Nav.Link>)}
                            <Nav.Link href="/profile"><BsPersonFill size={25}/> </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <div className="App">
                    <Routes>
                        <Route exact path='/' element={<Navigate replace to='/welcome'/>}/>
                        <Route path="/welcome" element={<Welcome/>}/>
                        <Route path="/main" element={<Main/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/prof/:id" element={<Prof/>}/>
                        <Route path="/prof/:id/module/:mod" element={<Module/>}/>
                        <Route path="/prof/:id/module/:mod/rating" element={<Rating/>}/>
                        <Route path="/prof/:id/module/:mod/comments" element={<Comments/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>
                </div>
            </>
    );
}

export default App;