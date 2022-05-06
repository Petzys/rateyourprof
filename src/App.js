import {BrowserRouter, Route, Routes, Navigate, Router, Link } from "react-router-dom";
import Welcome from "./pages/welcome"
import NotFound from "./pages/notfound";
import Login from "./pages/login";
function App() {
  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Navigate replace to='/welcome' />} />
          <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
  );
}
export default App;