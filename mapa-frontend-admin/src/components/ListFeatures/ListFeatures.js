import * as React from "react";
import petitions from "../Petitions";
import { useState, useEffect } from "react";
import { Stack, Button } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { List, Pagination } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import Swal from "sweetalert2";
import "./ListFeatures.scss";

export default function Features() {
  const [features, setFeatures] = useState([]);
  const [allFeatures, setAllFeatures] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await petitions.GetFeatures();
    setTotal(response.lenght);
    setAllFeatures(
      response.sort(function (a, b) {
        if (a.name && b.name) {
          return 1;
        } else {
          return -1;
        }
      })
    );
    setFeatures(response.slice(0, 9));
  };

  const handleChange = (event) => {
    if (event !== 1) {
      setPage(event);
      setFeatures(allFeatures.slice((event - 1) * 10, (event - 1) * 10 + 11));
    } else {
      setPage(1);
      setFeatures(allFeatures.slice(0, 9));
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
      <div className="ListFeatures">
      <h2>CARACTERÍSTICAS</h2>
      <Stack
        direction="row"
        ml={5}
        mr={5}
        mb={2}
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
          <List.Item>
            <List.Item.Meta title={<h4>Descripición</h4>}></List.Item.Meta>
            <List.Item.Meta title={" "}></List.Item.Meta>
            <List.Item.Meta title={" "}></List.Item.Meta>
          </List.Item>
        )}
      />
      <List
        style={{ background: "#c2dbfa" }}
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
      <Pagination page={page} total={total} onChange={handleChange} />
    </div>        
      </Container>
    </React.Fragment>    
  );
}

function buttonDelete(feature) {
  let button = (
    <Button
      type="delete"
      size="small"
      variant="contained"
      style={{ background: "#AC0D0D" }}
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
