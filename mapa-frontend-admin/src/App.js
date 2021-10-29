import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import EditUser from "./components/EditUser";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/edit">
            <EditUser />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/Header" exact={true}>
            <Header />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
