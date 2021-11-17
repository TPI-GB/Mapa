import * as React from "react";
import petitions from "../Petitions";
import { useState, useEffect } from "react";
import { Stack, Button } from "@mui/material";
import { List } from "antd";
import { Link } from "react-router-dom";
import "./ListCategories.scss";
import "antd/dist/antd.css";
import Swal from "sweetalert2";

import AddLocationAltTwoToneIcon from "@mui/icons-material/AddLocationAltTwoTone";

export default function ListCategories() {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await petitions.GetCategories();
    setcategories(response);
  };

  return (
    <div className="categoryList">
      <h2>CATEGORIAS</h2>
      <Stack
        direction="row"
        ml={5}
        mr={5}
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={8}
      >
        <Link to={`/editcategory/new`}>
          <Button variant="contained" style={{ background: "blue" }}>
            Cargar Categoria <AddLocationAltTwoToneIcon />
          </Button>
        </Link>
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
            <List.Item.Meta title={" "}></List.Item.Meta>
            <List.Item.Meta title={" "}></List.Item.Meta>
          </List.Item>
        )}
      />
      <List
        itemLayout="horizontal"
        dataSource={categories}
        renderItem={(category) => (
          <List.Item>
            <List.Item.Meta title={category.name}></List.Item.Meta>
            <List.Item.Meta title={category.category}></List.Item.Meta>
            <List.Item.Meta
              title={
                <Link to={`/editcategory/${category._id}`}>
                  <Button
                    variant="contained"
                    style={{ background: "goldenrod" }}
                  >
                    Editar Categoria
                  </Button>
                </Link>
              }
            ></List.Item.Meta>
            <List.Item.Meta title={buttonDelete(category)}></List.Item.Meta>
          </List.Item>
        )}
      />
    </div>
  );
}

function buttonDelete(category) {
  let button = (
    <Button
      type="delete"
      style={{ background: "red" }}
      onClick={() => deletecategory(category._id)}
    >
      Borrar
    </Button>
  );

  return button;
}

function deletecategory(id) {
  return Swal.fire({
    title: "Atencion!",
    text: "Está a punto de eliminar el lugar de la base de datos",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "blue",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "red",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      petitions.Deletecategory(id);
    }
  });
}
