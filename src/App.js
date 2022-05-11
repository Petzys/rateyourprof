import {BrowserRouter, Route, Routes, Navigate, Router, Link } from "react-router-dom";
import Welcome from "./pages/welcome"
import NotFound from "./pages/notfound";
import {Container, Nav, Navbar} from "react-bootstrap";
import Main from "./pages/main";
import Signup from "./pages/signup";
function App() {
  return (
      <div className="App">
          <Navbar bg="light" expand="lg">
              <Container>
                  <Navbar.Brand as={Link} to="/">Rate your Prof</Navbar.Brand>
                  <Nav className="me-auto">
                  </Nav>
              </Container>
          </Navbar>
        <Routes>
            <Route path='/' element={<Navigate replace to='/welcome' />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/main" element={<Main />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
  );
}
export default App;