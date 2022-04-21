import { Route, Routes, Navigate, Link } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";

import './App.css';
function App() {
  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Navigate replace to='/home' />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
  );
}
export default App;