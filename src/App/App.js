import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "../components/Login/Login/Login";
import Navbar from "../components/Navbar/Navbar";
import Messaging from "../components/Chat/Messaging/Messaging";
import Account from "../components/Signup/Account/Account";
import PrivateRoute from "../components/Utils/PrivateRoute";
import { BrowserRouter as Router, Route, Link, Redirect, useLocation, useHistory, Switch } from "react-router-dom";
import UserPage from "../components/Userpage/UserPage/UserPage";
import Reddit from "../components/Reddit/Reddit/Reddit";
import FeedPost from "../components/FeedPost/FeedPost/FeedPost";
require("dotenv").config();

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute path="/" exact>
            <FeedPost />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Account />
          </Route>
          <PrivateRoute path="/reddit">
            <Reddit />
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
