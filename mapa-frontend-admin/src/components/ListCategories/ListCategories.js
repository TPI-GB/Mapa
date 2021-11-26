import * as React from "react";
import petitions from "../Petitions";
import { useState, useEffect } from "react";
import { Stack, Button } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { List } from "antd";
import { Link } from "react-router-dom";
import "./ListCategories.scss";
import "antd/dist/antd.css";
import Swal from "sweetalert2";

export default function ListCategories() {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await petitions.GetCategories();
    setcategories(response);
  };

  categories.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <div className="ListCategories">
      <h2>CATEGORÍAS</h2>
      <Stack
        direction="row"
        ml={5}
        mr={5}        
        mb={4}
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={8}
      >
        {
          <Link to={`/editcategory/new`}>
            <Button variant="contained" style={{ background: "#053742" }}>
              Cargar Categoría <AddOutlinedIcon />
            </Button>
          </Link>
        }
      </Stack>
      <List
        style={{ background: "white" }}
        itemLayout="horizontal"
        dataSource={["this data is to show a single column"]}
        renderItem={() => (
          <List.Item>
            <List.Item.Meta title={<h4>Nombre</h4>}></List.Item.Meta>
            <List.Item.Meta title={" "}></List.Item.Meta>
            <List.Item.Meta title={" "}></List.Item.Meta>
          </List.Item>
        )}
      />
      <List     
        style={{ background: "#a2dbfa" }}
        itemLayout="horizontal"
        dataSource={categories}
        renderItem={(category) => (
          <List.Item>
            <List.Item.Meta title={category.name}></List.Item.Meta>
            <List.Item.Meta
              title={
                <Link to={`/editcategory/${category._id}`}>
                  <Button
                    variant="contained"
                    size="small"
                    style={{ background: "#39A2DB" }}
                  >
                    <ModeEditOutlineOutlinedIcon /> Editar Categoría
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
      size="small"
      variant="contained"
      style={{ background: "#AC0D0D" }}
      onClick={() => deleteCategory(category._id)}
    >
      <DeleteForeverOutlinedIcon /> Borrar
    </Button>
  );

  return button;
}

function deleteCategory(id) {
  return Swal.fire({
    title: "Atencion!",
    text: "Está a punto de eliminar la categoría de la base de datos",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "blue",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "red",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      petitions.DeleteCategory(id);
    }
  });
}
