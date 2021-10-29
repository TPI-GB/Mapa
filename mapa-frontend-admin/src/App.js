import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import PanelControl from "./components/ControlPanel";
import Login from "./components/Login";
import EditUser from "./components/EditUser";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/home" exact={true}>
            <Home />
          </Route>
          <Route path="/edit">
            <EditUser />
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
