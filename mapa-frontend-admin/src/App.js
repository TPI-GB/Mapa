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
import Authenticated from "./components/Authenticated";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/edituser/:id" exact={true}>
          <Authenticated component={<EditUser />} />
        </Route>
        <Route path="/editplace/:id" exact={true}>
          <Authenticated component={<EditPlace />} />
        </Route>
        <Switch>
          <Route path="/home" exact={true} component={Home}>
            <Authenticated component={<Home />} />
          </Route>
          <Route path="/listusers" exact={true}>
            <Authenticated component={<ListUsers />} />
          </Route>
          <Route path="/login" component={Login}>
            <Login />
          </Route>
          <Route path="/places" exact={true}>
            <Authenticated component={<Places />} />
          </Route>
          <Route path="/reset" exact={true}>
            <Authenticated component={<Reset />} />
          </Route>
          <Route path="/" exact={true}>
            <Login />
          </Route>
          <Route path="/changePassword" exact={true}>
            <Authenticated component={<ChangePassword />} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
