import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import EditUser from "./components/EditUser";

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
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
