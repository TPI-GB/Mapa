import React from "react";
import { List } from "antd";
import { Stack, Button } from "@mui/material";
import PersonAddTwoToneIcon from "@mui/icons-material/PersonAddTwoTone";
import { Link } from "react-router-dom";
import petitions from "../Petitions";
import { useState, useEffect } from "react";
import "./ListUsers.scss";
import "antd/dist/antd.css";

export default function ListUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await petitions.GetUsers();
    setUsers(response);
  };
  users.sort(function (a, b) {
    if (a.first_name === b.first_name && a.last_name === b.last_name) {
      if (a.nick > b.nick) {
        return 1;
      } else {
        return -1;
      }
    }
    if (a.first_name === b.first_name) {
      if (a.last_name > b.last_name) {
        return 1;
      } else {
        return -1;
      }
    }
    if (a.first_name > b.first_name) {
      return 1;
    } else {
      return -1;
    }
  });

  const ButtonEditUser = (id) => {
    if (sessionStorage.getItem("user login rol") === "Administrador") {
      return (
        <Button
          variant="contained"
          style={{ background: "goldenrod" }}
          href={`edituser/${id}`}
        >
          Editar Usuario
        </Button>
      );
    } else {
      return;
    }
  };

  const ButtonCreateUser = () => {
    if (sessionStorage.getItem("user login rol") === "Administrador") {
      return (
        <Button
          variant="contained"
          style={{ background: "blue" }}
          href={`/edituser/new`}
        >
          <PersonAddTwoToneIcon /> Crear Usuario
        </Button>
      );
    } else {
      return;
    }
  };

  return (
    <div className="ListUsers">
      <h2>USUARIOS</h2>
      <Stack
        direction="row"
        ml={5}
        mr={5}
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={8}
      >
        {ButtonCreateUser()}
        <Link to={`/home`}>
          <Button variant="contained" style={{ background: "blue" }}>
            Regresar
          </Button>
        </Link>
      </Stack>
      <List
        itemLayout="horizontal"
        dataSource={["this data is to show a single column"]}
        renderItem={() => (
          <List.Item>
            <List.Item.Meta title={<i>Nombre</i>}></List.Item.Meta>
            <List.Item.Meta title={<i>Apellido</i>}></List.Item.Meta>
            <List.Item.Meta title={<i>Nick</i>}></List.Item.Meta>
            <List.Item.Meta title={<i>Rol</i>}></List.Item.Meta>
            <List.Item.Meta title={<i>Estado</i>}></List.Item.Meta>
            <List.Item.Meta title={""}></List.Item.Meta>
          </List.Item>
        )}
      />
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta title={user.first_name}></List.Item.Meta>
            <List.Item.Meta title={user.last_name}></List.Item.Meta>
            <List.Item.Meta title={user.nick}></List.Item.Meta>
            <List.Item.Meta title={user.rol}></List.Item.Meta>
            <List.Item.Meta title={getStatus(user)}></List.Item.Meta>
            <List.Item.Meta title={ButtonEditUser(user._id)}></List.Item.Meta>
          </List.Item>
        )}
      />
    </div>
  );
}

function getStatus(user) {
  let userStatus = <b style={{ color: "green" }}>Activo</b>;
  if (!user.active) {
    userStatus = <b style={{ color: "red" }}>Inactivo</b>;
  }
  return userStatus;
}
