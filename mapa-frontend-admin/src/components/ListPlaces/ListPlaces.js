import * as React from "react";
import petitions from "../Petitions";
import { useState, useEffect } from "react";
import { Stack, Button } from "@mui/material";
import { List } from "antd";
import { Link } from "react-router-dom";
import "./Places.scss";
import "antd/dist/antd.css";
import Swal from "sweetalert2";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddLocationAltTwoToneIcon from "@mui/icons-material/AddLocationAltTwoTone";
import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";

export default function Places() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await petitions.GetPlaces();
    setPlaces(response);
  };

  places.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <div className="PlaceList">
      <h2>LUGARES</h2>
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
          <Link to={`/editplace/new`}>
            <Button variant="contained" style={{ background: "#053742" }}>
              Cargar Lugar <AddLocationAltTwoToneIcon />
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
            <List.Item.Meta title={<h5>Nombre</h5>}></List.Item.Meta>
            <List.Item.Meta title={<h5>Dirección</h5>}></List.Item.Meta>
            <List.Item.Meta title={<h5>Latitud</h5>}></List.Item.Meta>
            <List.Item.Meta title={<h5>Longitud</h5>}></List.Item.Meta>
            <List.Item.Meta title={<h5>Categoría</h5>}></List.Item.Meta>
            <List.Item.Meta title={<h5>Caracteristicas</h5>}></List.Item.Meta>
            <List.Item.Meta title={" "}></List.Item.Meta>
            <List.Item.Meta title={" "}></List.Item.Meta>
          </List.Item>
        )}
      />
      <List
        style={{ background: "#a2dbfa" }}
        itemLayout="horizontal"
        dataSource={places}
        renderItem={(place) => (
          <List.Item>
            <List.Item.Meta title={place.name}></List.Item.Meta>
            <List.Item.Meta title={place.address}></List.Item.Meta>
            <List.Item.Meta title={place.lactitude}></List.Item.Meta>
            <List.Item.Meta title={place.longitude}></List.Item.Meta>
            <List.Item.Meta
              title={
                <p>
                  {<LabelImportantTwoToneIcon />}
                  {`${place.category}`}
                </p>
              }
            ></List.Item.Meta>
            {
              <List.Item.Meta
                title={place.features.map((f) => (
                  <p>
                    {<LabelImportantTwoToneIcon />}
                    {`${f}`}
                  </p>
                ))}
              ></List.Item.Meta>
            }

            <List.Item.Meta
              title={
                <Link to={`/editplace/${place._id}`}>
                  <Button
                    variant="contained"
                    size="small"
                    style={{ background: "#39A2DB" }}
                  >
                    <ModeEditOutlineOutlinedIcon /> Editar Lugar
                  </Button>
                </Link>
              }
            ></List.Item.Meta>
            <List.Item.Meta title={buttonDelete(place)}></List.Item.Meta>
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
      size="small"
      variant="contained"
      style={{ background: "#AC0D0D" }}
      onClick={() => deletePlace(place._id)}
    >
      <DeleteForeverOutlinedIcon /> Borrar
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
      petitions.DeletePlace(id);
    }
  });
}
