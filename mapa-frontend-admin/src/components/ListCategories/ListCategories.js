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
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import "./ListCategories.scss";
import "antd/dist/antd.css";
import Swal from "sweetalert2";

export default function ListCategories() {
  const iconList = Object.keys(Icons)
    .filter((key) => key !== "fas" && key !== "prefix")
    .map((icon) => Icons[icon]);

  library.add(...iconList);

  const [categories, setcategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await petitions.GetCategories();
    setTotal(response.length);
    setAllCategories(
      response.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      })
    );
    setcategories(response.slice(0, 9));
  };

  const handleChange = (event) => {
    if (event !== 1) {
      setPage(event);
      setcategories(
        allCategories.slice((event - 1) * 10, (event - 1) * 10 + 11)
      );
    } else {
      setPage(1);
      setcategories(allCategories.slice(0, 9));
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
      <div className="ListCategories">
      <h2>CATEGORÍAS</h2>
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
            <List.Item.Meta title={<h4>Icono</h4>}></List.Item.Meta>
            <List.Item.Meta title={" "}></List.Item.Meta>
            <List.Item.Meta title={" "}></List.Item.Meta>
          </List.Item>
        )}
      />
      <List
        style={{ background: "#c2dbfa" }}
        itemLayout="horizontal"
        dataSource={categories}
        renderItem={(category) => (
          <List.Item>
            <List.Item.Meta title={category.name}></List.Item.Meta>
            <List.Item.Meta
              title={<FontAwesomeIcon icon={category.icon} />}
            ></List.Item.Meta>
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
      <Pagination page={page} total={total} onChange={handleChange} />
    </div>
      </Container>
    </React.Fragment>    
  );
}

function buttonDelete(category) {
  let button = (
    <Button
      type="delete"
      size="small"
      variant="contained"
      style={{ background: "#AC0D0D" }}
      onClick={() => DeleteCategory(category._id)}
    >
      <DeleteForeverOutlinedIcon /> Borrar
    </Button>
  );

  return button;
}

function DeleteCategory(id) {
  return Swal.fire({
    title: "Atencion!",
    text: "Está a punto de eliminar la categoría de la base de datos, esto no implica que un lugar con esta categoria se modifique",
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
