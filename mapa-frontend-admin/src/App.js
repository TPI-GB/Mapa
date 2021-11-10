import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ListUsers from "./components/ListUsers";
import Header from "./components/Header";
import Reset from "./components/Reset/Reset";
import EditUser from "./components/EditUser";
import Places from "./components/Places";
import ChangePassword from "./components/ChangePassword";
import EditPlace from "./components/EditPlace";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/edituser/:id" exact={true}>
          <EditUser />
        </Route>
        <Route path="/editplace/:id" exact={true}>
          <EditPlace />
        </Route>
        <Switch>
          <Route path="/home" exact={true}>
            <Home />
          </Route>
          <Route path="/listusers" exact={true}>
            <ListUsers />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/places" exact={true}>
            <Places />
          </Route>
          <Route path="/reset" exact={true}>
            <Reset />
          </Route>
          <Route path="/" exact={true}>
            <Login />
          </Route>
          <Route path="/changePassword" exact={true}>
            <ChangePassword />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
