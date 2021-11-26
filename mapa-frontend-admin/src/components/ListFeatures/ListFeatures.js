import * as React from "react";
import petitions from "../Petitions";
import { useState, useEffect } from "react";
import { Stack, Button } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
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
      <h2>CARACTERÍSTICAS</h2>
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
          <Link to={`/editfeature/new`}>
            <Button variant="contained" style={{ background: "#053742" }}>
              Cargar Característica <AddOutlinedIcon />
            </Button>
          </Link>
        }
      </Stack>
      <List
        style={{ background: "white" }}
        itemLayout="horizontal"
        dataSource={["this data is to show a single column"]}
        renderItem={() => (
          <List.Item >
            <List.Item.Meta title={<h4>Descripición</h4>}></List.Item.Meta>
            <List.Item.Meta title={" "}></List.Item.Meta>
            <List.Item.Meta title={" "}></List.Item.Meta>
          </List.Item>
        )}
      />
      <List      
        style={{ background: "#a2dbfa" }}
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
                    size="small"
                    style={{ background: "#39A2DB" }}
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
      size="small"
      variant="contained"
      style={{ background: "#AC0D0D"}}
      onClick={() => deleteFeature(feature._id)}
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
