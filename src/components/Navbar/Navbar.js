import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Navbar.css";
import logo from "../../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faReddit } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../SearchBar/SearchBar";
import { prepareHeaders, clearAuthCookie } from "../Utils/utils";
const userElement = <FontAwesomeIcon icon={faUserAlt} />;
const redditElement = <FontAwesomeIcon icon={faReddit} />;
const envelopeElement = <FontAwesomeIcon icon={faEnvelope} />;
const signOutElement = <FontAwesomeIcon icon={faSignOutAlt} />;

const Navbar = () => {
  const searchFor = "users";
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const disconnect = () => {
    clearAuthCookie();
    localStorage.clear();
  };

  return (
    <nav className="mainNavbar">
      <Link to="/">
        <img src={logo} alt="logo groupomania" height="45px" width="100px" />
      </Link>
      <SearchBar searchFor={searchFor} />

      <ul>
        <li>
          <Link to="/messaging"> {envelopeElement} </Link>
        </li>
        <li>
          <Link to="/reddit"> {redditElement} </Link>
        </li>
        <li>
          <Link to={`/userPage/${userId}`}>{userElement}</Link>
        </li>
        <li className="signout" onClick={() => disconnect()}>
          <Link to="/login">{signOutElement}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
