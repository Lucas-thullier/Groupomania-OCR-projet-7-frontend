import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faReddit } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const userElement = <FontAwesomeIcon icon={faUserAlt} />;
const redditElement = <FontAwesomeIcon icon={faReddit} />;
const envelopeElement = <FontAwesomeIcon icon={faEnvelope} />;
const searchElement = <FontAwesomeIcon icon={faSearch} />;

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/">
          <img src={logo} alt="logo groupomania" height="45px" width="100px" />
        </Link>
        <form method="GET">
          <input type="text" />
          <button> {searchElement} </button>
        </form>

        <ul>
          <li>
            <Link to="/messaging"> {envelopeElement} </Link>
          </li>
          <li>
            <Link to="/reddit"> {redditElement} </Link>
          </li>
          <li>
            <Link to="/myAccount"> {userElement} </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
