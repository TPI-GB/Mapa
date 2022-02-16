import { useHistory } from "react-router";
import jwt_decode from "jwt-decode";
import Header from "../Header";
import React from "react";
import Login from "../Login";

export default function Authenticated(props) {
  const component = props.component;
  const history = useHistory();
  const token = localStorage.getItem("user login nick");
  const tokenTime = localStorage.getItem("user token expires");
  const isExpires = () => {
    try {
      jwt_decode(token);
      const { exp } = jwt_decode(tokenTime);
      if (exp < (new Date().getTime() + 1) / 1000) {
        return false;
      }
    } catch (err) {
      return false;
    }
    return true;
  };
  if (token && !isExpires()) {
    return (
      <div>
        <Header />
        <div>{component}</div>
      </div>
    );
  } else {
    history.push("/");
    return <Login />;
  }
}
