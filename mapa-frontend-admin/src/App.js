import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import ListUsers from "./components/ListUsers";
import Reset from "./components/Reset/Reset";
import EditUser from "./components/EditUser";
import ListPlaces from "./components/ListPlaces";
import ChangePassword from "./components/ChangePassword";
import EditPlace from "./components/EditPlace";
import Authenticated from "./components/Authenticated";
import EditCategory from "./components/EditCategory";
import ListCategories from "./components/ListCategories";
import EditFeature from "./components/EditFeature/EditFeature";
import ListFeatures from "./components/ListFeatures";
import ListImages from "./components/ListImages";
import ListComments from "./components/ListComments";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/editcategory/:id" exact={true}>
          <Authenticated component={<EditCategory />} />
        </Route>
        <Route path="/edituser/:id" exact={true}>
          <Authenticated component={<EditUser />} />
        </Route>
        <Route path="/editplace/:id" exact={true}>
          <Authenticated component={<EditPlace />} />
        </Route>
        <Route path="/editfeature/:id" exact={true}>
          <Authenticated component={<EditFeature />} />
        </Route>
        <Switch>
          <Route path="/listusers" exact={true}>
            <Authenticated component={<ListUsers />} />
          </Route>
          <Route path="/login" component={Login}>
            <Login />
          </Route>
          <Route path="/listcategories" exact={true}>
            <Authenticated component={<ListCategories />} />
          </Route>
          <Route path="/listplaces" exact={true}>
            <Authenticated component={<ListPlaces />} />
          </Route>
          <Route path="/listfeatures" exact={true}>
            <Authenticated component={<ListFeatures />} />
          </Route>
          <Route path="/listimages/:id" exact={true}>
            <Authenticated component={<ListImages />} />
          </Route>
          <Route path="/listcomments/:id" exact={true}>
            <Authenticated component={<ListComments />} />
          </Route>
          <Route path="/reset" exact={true}>
            <Reset />
          </Route>
          <Route path="/changepassword/:id" exact={true}>
            <Authenticated component={<ChangePassword />} />
          </Route>
          <Route path="/" exact={true}>
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
