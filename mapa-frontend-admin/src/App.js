import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import PanelControl  from "./components/ControlPanel/ControlPanel";
import Login from "./components/Login";
import EditUser from "./components/EditUser";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/Home" exact={true}>
            <Home />
          <Route path="/edit">
            <EditUser />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact={true}>
            <Login />
          </Route>
          <Route path="/ControlPanel" exact={true}>
            <PanelControl />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
