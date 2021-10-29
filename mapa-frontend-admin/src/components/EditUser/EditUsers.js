import React from "react";
import { List } from "antd";
import getUsers from "../Services";
import { useState, useEffect } from "react";

export default function EditUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await getUsers();
    setUsers(response);
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta title={item.first_name + " " + item.last_name} />
        </List.Item>
      )}
    />
  );
}
