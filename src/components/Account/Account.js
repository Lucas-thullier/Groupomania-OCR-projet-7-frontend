import React, { useState, useEffect } from "react";
import axios from "axios";
require("./Account.css");

const Account = () => {
  // const userData = useState({ email: null, username: null, password: null });

  function signUp(submitEvent) {
    submitEvent.preventDefault();
    const userData = { email: null, username: null, password: null };
    const form = submitEvent.target;

    userData.email = form.email.value;
    userData.username = form.username.value;
    userData.password = form.password.value;

    const jsonUserData = JSON.stringify(userData);
    console.log(jsonUserData);
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
    <form onSubmit={signUp}>
      <input type="email" id="email" />
      <input type="text" id="username" />
      <input type="password" id="password" />
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Account;
