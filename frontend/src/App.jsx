import React from 'react'
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Editor from './pages/Editor';
// import About from './pages/About';
// import Services from './pages/Services';
import Contact from './pages/Contact';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <RouteHandler />
      </BrowserRouter>
    </>
  )
};

const RouteHandler = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to={"/login"} />} />
        {/* <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to={"/login"} />} /> */}
        {/* <Route path="/services" element={isLoggedIn ? <Services /> : <Navigate to={"/login"} />} /> */}
        <Route path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to={"/login"} />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editior/:id" element={isLoggedIn ? <Editor /> : <Navigate to={"/login"} />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  )
}

export default App;
