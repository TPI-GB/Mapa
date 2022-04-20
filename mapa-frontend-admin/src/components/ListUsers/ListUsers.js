import React from "react";
import { List, Pagination } from "antd";
import { Stack, Button } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PersonAddTwoToneIcon from "@mui/icons-material/PersonAddTwoTone";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import petitions from "../Petitions";
import { useState, useEffect } from "react";
import "./ListUsers.scss";
import "antd/dist/antd.css";

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await petitions.GetUsers();
    setTotal(response.lenght);
    setAllUsers(
      response.sort(function (a, b) {
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
      })
    );
    setUsers(response.slice(0, 9));
  };

  const handleChange = (event) => {
    if (event !== 1) {
      setPage(event);
      setUsers(allUsers.slice((event - 1) * 10, (event - 1) * 10 + 11));
    } else {
      setPage(1);
      setUsers(allUsers.slice(0, 9));
    }
  };

  const ButtonEditUser = (id) => {
    if (localStorage.getItem("user login rol") === "Administrador") {
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
    if (localStorage.getItem("user login rol") === "Administrador") {
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
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
      <div className="ListUsers">
      <h2>USUARIOS</h2>
      <Stack
        direction="row"
        ml={5}
        mr={5}
        mb={2}
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
        style={{ background: "#c2dbfa" }}
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
      <Pagination page={page} total={total} onChange={handleChange} />
    </div>        
      </Container>
    </React.Fragment>       
  );
}

function getStatus(user) {
  let userStatus = <b style={{ color: "green" }}>Activo</b>;
  if (!user.active) {
    userStatus = <b style={{ color: "red" }}>Inactivo</b>;
  }
  return userStatus;
}
