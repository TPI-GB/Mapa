import * as React from "react";
import petitions from "../Petitions";
import { useState, useEffect } from "react";
import { Stack, Button } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { List } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import Swal from "sweetalert2";
import "./ListFeatures.scss";

export default function Features() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await petitions.GetFeatures();
    setFeatures(response);
  };

  return (
    <div className="ListFeatures">
      <h2>CARACTERISTICAS</h2>
      <Stack
        direction="row"
        ml={5}
        mr={5}
        mb={5}
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={8}
      >
        {
          <Link to={`/editfeature/new`}>
            <Button variant="contained" style={{ background: "blue" }}>
              <AddCircleTwoToneIcon /> Cargar Nueva Característica
            </Button>
          </Link>
        }
        <Link to={`/home`}>
          <Button variant="contained" style={{ background: "blue" }}>
          <KeyboardBackspaceIcon /> Regresar 
          </Button>
        </Link>
      </Stack>
      <List
        itemLayout="horizontal"
        dataSource={["this data is to show a single column"]}
        renderItem={() => (
          <List.Item>
            <List.Item.Meta title={<h3>Descripición</h3>}></List.Item.Meta>
            <List.Item.Meta title={" "}></List.Item.Meta>
            <List.Item.Meta title={" "}></List.Item.Meta>
          </List.Item>
        )}
      />
      <List
        itemLayout="horizontal"
        dataSource={features}
        renderItem={(feature) => (
          <List.Item>
            <List.Item.Meta title={feature.name}></List.Item.Meta>
            <List.Item.Meta
              title={
                <Link to={`/editfeature/${feature._id}`}>
                  <Button
                    variant="contained"
                    style={{ background: "goldenrod" }}
                  >
                    <ModeEditOutlineOutlinedIcon /> Editar Característica
                  </Button>
                </Link>
              }
            ></List.Item.Meta>
            <List.Item.Meta title={buttonDelete(feature)}></List.Item.Meta>
          </List.Item>
        )}
      />
    </div>
  );
}

function buttonDelete(feature) {
  let button = (
    <Button
      type="delete"
      style={{ background: "red" }}
      onClick={() => deleteFeature(feature._id)}
      color="inherit"
    >
      <DeleteForeverOutlinedIcon /> Borrar
    </Button>
  );

  return button;
}

function deleteFeature(id) {
  return Swal.fire({
    title: "Atencion!",
    text: "Está a punto de eliminar esta característica de la base de datos",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "blue",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "red",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      petitions.DeleteFeature(id);
    }
  });
}
