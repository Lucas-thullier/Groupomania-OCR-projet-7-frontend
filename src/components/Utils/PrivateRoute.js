import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const isLogged = localStorage.getItem("isLogged");
  if (isLogged) {
    return children;
  } else {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }
};

export default PrivateRoute;
