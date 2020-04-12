import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import { Login } from "./Login";
import { Register } from "./Register";
import { User } from "./User";
import { Collab } from "./Collab";
import { OtherUser } from "./OtherUser";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/user" component={User} />
        <Route exact path="/collab" component={Collab} />
        <Route exact path="/otherUser/:id" component={OtherUser} />
      </Switch>
    </Router>
  );
}

export default App;
