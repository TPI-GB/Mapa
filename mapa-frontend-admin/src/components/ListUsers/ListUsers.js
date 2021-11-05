import React from "react";
import { Button, List } from "antd";
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

  return (
    <div className="ListUsers">
      <Link to={`/edituser/new`}>
        <Button type="primary" style={{ background: "blue" }}>
          Crear Usuario
        </Button>
      </Link>
      <List
        itemLayout="horizontal"
        dataSource={["this data is to show a single column"]}
        renderItem={() => (
          <List.Item>
            <List.Item.Meta title="Nombre"></List.Item.Meta>
            <List.Item.Meta title="Apellido"></List.Item.Meta>
            <List.Item.Meta title="Nick"></List.Item.Meta>
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
            <List.Item.Meta
              title={
                <Link to={`/edituser/${user._id}`}>
                  <Button type="primary" style={{ background: "goldenrod" }}>
                    Editar Usuario
                  </Button>
                </Link>
              }
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    </div>
  );
}
