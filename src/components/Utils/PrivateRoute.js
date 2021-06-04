import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { prepareHeaders } from '../Utils/utils'

import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ children, ...rest }) => {
  const [isLogged, setIsLogged] = useState(null)
  const [requestDone, setRequestDone] = useState(null)

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/checkIfLogged`,
        prepareHeaders(document.cookie)
      )
      .then((response) => {
        if (response.status === 200) {
          setRequestDone(true)
          setIsLogged(true)
        } else {
          setRequestDone(true)
          setIsLogged(false)
        }
      })
      .catch((error) => {
        setRequestDone(true)
        setIsLogged(false)
      })
  }, [])

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
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    )
  } else {
    return <></>
  }
}

export default PrivateRoute
