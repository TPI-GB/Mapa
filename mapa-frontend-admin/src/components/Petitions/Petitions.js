import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = process.env.REACT_APP_BASE_URL;

async function GetUsers() {
  try {
    const response = await axios({ url: `${baseUrl}/users`, method: "GET" });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

async function GetUserById(id) {
  try {
    const response = await GetUsers();
    return response.filter((u) => u._id === id)[0];
  } catch (err) {
    console.error(err);
  }
  return [];
}

async function RegisterUser(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/users`,
      method: "POST",
      data: data,
    });
    Swal.fire({
      title: "Hecho!",
      text: "El usuario ha sido registrado correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
    return response;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "No se pudo registrar el usuario. Asegurese de haber ingresado bien los datos o que el Nick no este ya registrado",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
}

async function EditUser(data, id) {
  try {
    const response = await axios({
      url: `${baseUrl}/users/${id}`,
      method: "PUT",
      data: data,
    });
    Swal.fire({
      title: "Hecho!",
      text: "El usuario ha sido editado correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
    return response;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "El usuario no ha podido ser editado, asegurese de haber compleato bien los campos y que el Nick no este ya registrado",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
}

async function EditUserStatus(data, id) {
  try {
    const response = await axios({
      url: `${baseUrl}/users/${id}/status/`,
      method: "PUT",
      data: { active: data },
    });
    Swal.fire({
      title: "Hecho!",
      text: "El usuario ha cambiado de estado correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
    return response;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "No se ha podido cambiar el estado del usuario, verifique si esta intentado de dar de alta un usuario con un Nick ya registrado",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
}

async function LoginUser(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/users/login`,
      method: "POST",
      data: data,
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Los datos son incorrectos o el usuario no esta dado de alta",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
  return [];
}

//Places

async function CreatePlace(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/places`,
      method: "POST",
      data: data,
    });
    Swal.fire({
      title: "Hecho!",
      text: "El lugar se creó correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
    return response;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "No se pudo crear el lugar. Asegurese de haber ingresado bien los datos",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
}

async function GetPlaces() {
  try {
    const response = await axios({ url: `${baseUrl}/places`, method: "GET" });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

const petitions = {
  RegisterUser,
  GetUsers,
  GetUserById,
  EditUser,
  EditUserStatus,
  LoginUser,
  CreatePlace,
  GetPlaces,
};

export default petitions;
