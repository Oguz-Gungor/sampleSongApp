import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Login from "./containers/Pages/Login/Login";
import MainPanel from "./containers/Pages/MainPanel/MainPanel";
import Register from "./containers/Pages/Register/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<MainPanel />} />
      </Routes>
    </>
  );
}

export default App;
