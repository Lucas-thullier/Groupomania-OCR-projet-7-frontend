import React from "react";
import "./App.css";
import Home from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import Messaging from "../components/Messaging/Messaging";
import Account from "../components/Account/Account";
import { Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/messaging" component={Messaging} />
          <Route path="/reddit" component={Messaging} />
          <Route path="/myAccount" component={Account} />
        </Switch>
      </>
    );
  }
}

export default App;
