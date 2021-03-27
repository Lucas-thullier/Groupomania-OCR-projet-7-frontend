import React, { useState } from "react";
import axios from "axios";
import utils from "../Utils/utils";

import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const [isLogged, setIsLogged] = useState(null);
  const [requestDone, setRequestDone] = useState(null);
  axios
    .get("http://localhost:3001/checkIfLogged", utils.prepareHeaders(document.cookie))
    .then((response) => {
      if (response.status === 200) {
        setRequestDone(true);
        setIsLogged(true);
      } else {
        setRequestDone(true);
        setIsLogged(false);
      }
    })
    .catch((error) => {
      isLogged = false;
      console.log(error);
    });

  if (requestDone && isLogged != null) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isLogged ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  } else {
    return <></>;
  }
};

export default PrivateRoute;
