import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import PanelControl  from "./components/ControlPanel/ControlPanel";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/Home" exact={true}>
            <Home />
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
