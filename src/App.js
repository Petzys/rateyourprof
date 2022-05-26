import {Route, Routes, Navigate, Link } from "react-router-dom";
import Welcome from "./pages/welcome"
import NotFound from "./pages/notfound";
import {Container, Nav, Navbar} from "react-bootstrap";
import Main from "./pages/main";
import Signup from "./pages/signup";
import Prof from "./pages/prof";
import Module from "./pages/module";
import Rating from "./pages/rating";
import Comments from "./pages/comments";
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
            <Route exact path='/' element={<Navigate replace to='/welcome' />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/main" element={<Main />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/prof/:id" element={<Prof />}/>
            <Route path="/prof/:id/module/:mod" element={<Module />} />
            <Route path="/prof/:id/module/:mod/rating" element={<Rating />} />
            <Route path="/prof/:id/module/:mod/comments" element={<Comments />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
  );
}
export default App;