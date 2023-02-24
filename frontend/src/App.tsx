import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Login from "./containers/Pages/Login/Login";
import MainPanel from "./containers/Pages/MainPanel/MainPanel";
import Register from "./containers/Pages/Register/Register";
import AppRoutes from "./config/RouteConfig.json";

/**
 * Wrapper App function to set router
 * @returns application content in specified routing
 */
function App() {
  return (
      <Routes>
        <Route path={AppRoutes.ALL} element={<Login />} />
        <Route path={AppRoutes.REGISTER} element={<Register />} />
        <Route path={AppRoutes.MAIN} element={<MainPanel />} />
      </Routes>
  );
}

export default App;
