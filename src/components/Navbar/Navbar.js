import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faReddit } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";

const userElement = <FontAwesomeIcon icon={faUserAlt} />;
const redditElement = <FontAwesomeIcon icon={faReddit} />;
const envelopeElement = <FontAwesomeIcon icon={faEnvelope} />;

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo groupomania" height="45px" width="100px" />
      </Link>
      <SearchBar />

      <ul>
        <li>
          <Link to="/messaging"> {envelopeElement} </Link>
        </li>
        <li>
          <Link to="/reddit"> {redditElement} </Link>
        </li>
        <li>
          <Link to="/signup"> {userElement} </Link>
        </li>
        <li>
          <Link to="/login"> Log in </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
