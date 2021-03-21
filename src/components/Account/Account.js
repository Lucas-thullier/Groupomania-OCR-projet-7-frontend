import React, { useState, useEffect } from "react";
import axios from "axios";
require("./Account.css");

const Account = () => {
  function signUp(submitEvent) {
    submitEvent.preventDefault();
    const userData = { email: null, username: null, password: null };
    const form = submitEvent.target;

    userData.email = form.email.value;
    userData.username = form.username.value;
    userData.password = form.password.value;

    const jsonUserData = JSON.stringify(userData);

    axios
      .post("http://localhost:3001/user/signup", jsonUserData, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="signupDiv">
      <h1 className="formTitle">S'inscrire</h1>
      <form className="signupForm" onSubmit={signUp}>
        <label htmlFor="username">Prénom</label>
        <input type="text" id="username" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" />

        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" />

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Account;
