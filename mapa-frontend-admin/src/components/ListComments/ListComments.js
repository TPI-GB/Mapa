import * as React from "react";
import petitions from "../Petitions";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Grid, Stack, Button } from "@mui/material";
import { List } from "antd";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Swal from "sweetalert2";
import "./ListComments.scss";
import "antd/dist/antd.css";

export default function ListComments() {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [place, setPlace] = useState({});

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const place = await petitions.GetPlaceById(id);
    setPlace(place);
    setComments(place.comments);
  };

  return (
    <div className="ListComments">
      <h2>COMENTARIOS</h2>
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
        dataSource={["this data is to show a single column"]}
        renderItem={() => (
          <List.Item>
            <List.Item.Meta title={<h4>Nombre</h4>}></List.Item.Meta>
            <List.Item.Meta title={<h4>Comentario</h4>}></List.Item.Meta>
            <List.Item.Meta title={""}></List.Item.Meta>
          </List.Item>
        )}
      />
      <List
        style={{ background: "#a2dbfa" }}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(c) => (
          <List.Item>
            <List.Item.Meta title={<b>{c.name}</b>}></List.Item.Meta>
            <List.Item.Meta title={c.text}></List.Item.Meta>
            <List.Item.Meta
              title={
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    background: "#AC0D0D",
                  }}
                  onClick={() => deleteComment({ id: c.id, place: place })}
                >
                  BORRAR
                </Button>
              }
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    </div>
  );
}

function deleteComment(data) {
  return Swal.fire({
    title: "Atencion!",
    text: "¿Desea eliminar este comentario?",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "blue",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "red",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      petitions.DeleteComment(data);
    }
  });
}
