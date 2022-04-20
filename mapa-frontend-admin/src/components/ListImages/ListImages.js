import * as React from "react";
import petitions from "../Petitions";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Grid, Stack, Button } from "@mui/material";
import { List } from "antd";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Swal from "sweetalert2";
import "./ListImages.scss";
import "antd/dist/antd.css";
const baseUrl = process.env.REACT_APP_BASE_URL;

export default function ListImages() {
  const { id } = useParams();

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const place = await petitions.GetPlaceById(id);
    const arrayPlace = [];
    arrayPlace.push(place);
    setPlaces(arrayPlace);
  };

  return (
    <div className="ListImages">
      <h2>IMAGENES</h2>
      <Stack
        direction="row"
        ml={5}
        mr={5}
        mb={4}
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={8}
      ></Stack>
      <List
        style={{ background: "#a2dbfa" }}
        itemLayout="horizontal"
        dataSource={["this data is to show a single column"]}
        renderItem={() => (
          <List.Item>
            <Grid item xs={2}>
              <Button
                variant="contained"
                style={{ background: "#053742" }}
                onClick={() => (window.location = `/editplace/${id}`)}
              >
                <KeyboardBackspaceIcon /> Volver
              </Button>
            </Grid>
          </List.Item>
        )}
      />
      <List
        style={{ background: "#a2dbfa" }}
        itemLayout="horizontal"
        dataSource={places}
        renderItem={(place) => (
          <List.Item>
            <List.Item.Meta title={""}></List.Item.Meta>
            <List.Item.Meta
              title={place.images.map((img) => (
                <p>
                  <img
                    class="slides_container"
                    alt="imagen"
                    src={`${baseUrl}/images/${img}`}
                    width={"70%"}
                    height={"70%"}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      background: "#AC0D0D",
                      marginLeft: "20px",
                    }}
                    onClick={() => deleteImage(id, img)}
                  >
                    BORRAR
                  </Button>
                </p>
              ))}
            ></List.Item.Meta>
            <List.Item.Meta title={""}></List.Item.Meta>
          </List.Item>
        )}
      />
    </div>
  );
}

function deleteImage(id, img) {
  let data = [];
  data.id = id;
  data.img = img;
  return Swal.fire({
    title: "Atencion!",
    text: "¿Desea eliminar esta imagen?",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "blue",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "red",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      petitions.DeleteImageFromPlace(data);
    }
  });
}
