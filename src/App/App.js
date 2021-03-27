import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import Messaging from "../components/Messaging/Messaging";
import Account from "../components/Account/Account";
import PrivateRoute from "../components/Utils/PrivateRoute";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  useLocation,
  useHistory,
  Switch,
} from "react-router-dom";
import UserPage from "../components/UserPage/UserPage";

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute path="/" exact>
            <Home />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Account />
          </Route>
          <PrivateRoute path="/reddit">
            <Login />
          </PrivateRoute>
          <PrivateRoute path="/messaging">
            <Messaging />
          </PrivateRoute>
          <PrivateRoute path="/userPage/:id">
            <UserPage />
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
}
