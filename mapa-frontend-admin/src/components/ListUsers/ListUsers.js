import React from "react";
import { List } from "antd";
import { Stack, Button } from "@mui/material";
import PersonAddTwoToneIcon from "@mui/icons-material/PersonAddTwoTone";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
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
          href={`edituser/${id}`}
          size="small"
          style={{ background: "#39A2DB" }}          
        >
          <ModeEditOutlineOutlinedIcon /> Editar Usuario
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
          style={{ background: "#053742" }}
          href={`/edituser/new`}
        >
          Crear Usuario <PersonAddTwoToneIcon />
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
        mb={4}
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={8}
      >
        {ButtonCreateUser()}        
      </Stack>
      <List
        style={{ background: "white" }}
        itemLayout="horizontal"
        dataSource={["this data is to show a single column"]}
        renderItem={() => (
          <List.Item>
            <List.Item.Meta title={<h5>Nombre</h5>}></List.Item.Meta>
            <List.Item.Meta title={<h5>Apellido</h5>}></List.Item.Meta>
            <List.Item.Meta title={<h5>Nick</h5>}></List.Item.Meta>
            <List.Item.Meta title={<h5>Rol</h5>}></List.Item.Meta>
            <List.Item.Meta title={<h5>Estado</h5>}></List.Item.Meta>
            <List.Item.Meta title={""}></List.Item.Meta>
          </List.Item>
        )}
      />
      <List
        style={{ background: "#a2dbfa" }}
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
