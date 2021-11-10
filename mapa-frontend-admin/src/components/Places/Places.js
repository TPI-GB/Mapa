import * as React from "react";
import petitions from "../Petitions";
import { useState, useEffect } from "react";
import { Stack, Button } from "@mui/material";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { List } from "antd";
import { Link } from "react-router-dom";
import "./Places.scss";
import "antd/dist/antd.css";
import Swal from "sweetalert2";

import AddLocationAltTwoToneIcon from "@mui/icons-material/AddLocationAltTwoTone";

export default function Places() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await petitions.GetPlaces();
    setPlaces(response);
  };

  return (
    <div className="PlaceList">
      <h2>LUGARES</h2>
      <Stack
        direction="row"
        ml={5}
        mr={5}
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={8}
      >
        <Link to={`/editplace/new`}>
          <Button variant="contained" style={{ background: "blue" }}>
            Cargar Lugar <AddLocationAltTwoToneIcon />
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
            <List.Item.Meta title={<i>Dirección</i>}></List.Item.Meta>
            <List.Item.Meta title={<i>Latitud</i>}></List.Item.Meta>
            <List.Item.Meta title={<i>Longitud</i>}></List.Item.Meta>
            <List.Item.Meta title={<i>Categoria</i>}></List.Item.Meta>
            <List.Item.Meta title={""}></List.Item.Meta>
          </List.Item>
        )}
      />
      <List
        itemLayout="horizontal"
        dataSource={places}
        renderItem={(place) => (
          <List.Item>
            <List.Item.Meta title={place.name}></List.Item.Meta>
            <List.Item.Meta title={place.address}></List.Item.Meta>
            <List.Item.Meta title={place.latitude}></List.Item.Meta>
            <List.Item.Meta title={place.longitude}></List.Item.Meta>
            <List.Item.Meta title={place.category}></List.Item.Meta>
            <List.Item.Meta
              title={
                <Link to={`/editplace/${place._id}`}>
                  <Button variant="contained" style={{ background: "goldenrod" }}>
                    Editar Lugar
                  </Button>
                </Link>
              }
            ></List.Item.Meta>
            <List.Item.Meta
              title={
                  buttonDelete(place)
              }
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    </div>
  );
}

function buttonDelete(place) {
  let button = (
    <Button
      type="delete"
      style={{ background: "red" }}
      onClick={() => deletePlace(place._id)}
    >
      Borrar
    </Button>
  ); 
  
  return button;
}

function deletePlace(id) {
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
      const data = false;
      petitions.DeletePlace(data, id);
    }
  });
}
