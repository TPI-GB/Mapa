import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import PanelControl from "./components/ControlPanel";
import Login from "./components/Login";
import ListUsers from "./components/ListUsers";
import Header from "./components/Header";
import Reset from "./components/Reset/Reset";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/home" exact={true}>
            <Home />
          </Route>
          <Route path="/listusers">
            <ListUsers />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact={true}>
            <Login />
          </Route>
          <Route path="/controlpanel" exact={true}>
            <PanelControl />
          </Route>
          <Route path="/reset" exact={true}>
            <Reset />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
