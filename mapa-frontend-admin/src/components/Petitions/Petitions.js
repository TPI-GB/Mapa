import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = process.env.REACT_APP_BASE_URL;

async function GetUsers() {
  try {
    const response = await axios({
      url: `${baseUrl}/users`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("user login token")}`,
      },
    });
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
    const verify = await verifyUser(data);
    if (verify) {
      const response = await axios({
        url: `${baseUrl}/users`,
        method: "POST",
        data: data,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user login token")}`,
        },
      });
      Swal.fire({
        title: "Hecho!",
        text: "El usuario ha sido registrado correctamente",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      return response;
    } else {
      throw new Error();
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "No se pudo registrar el usuario. Asegurese de haber ingresado bien los datos o que el Nick o Email no este ya registrado y dado de alta",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
    console.log(error);
  }
}

async function EditUser(data, id) {
  try {
    const user = await GetUserById(id);
    const verify = await verifyEditUser(data, user);
    if (verify) {
      const response = await axios({
        url: `${baseUrl}/users/${id}`,
        method: "PUT",
        data: data,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user login token")}`,
        },
      });
      Swal.fire({
        title: "Hecho!",
        text: "El usuario ha sido editado correctamente, actualice para ver los cambios",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      return response;
    } else {
      throw new Error();
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "El usuario no ha podido ser editado, asegurese de haber completado bien los campos y que el Nick o Email no este ya registrado y dado de alta",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
}

async function EditUserStatus(data, id) {
  try {
    const user = await GetUserById(id);
    const verify = await verifyUser(user);
    if ((data && verify) || !data) {
      const response = await axios({
        url: `${baseUrl}/users/${id}/status/`,
        method: "PUT",
        data: { active: data },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user login token")}`,
        },
      });
      Swal.fire({
        title: "Hecho!",
        text: "El usuario ha cambiado de estado correctamente, actualice para ver los cambios",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      return response;
    } else {
      throw new Error();
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "No se ha podido cambiar el estado del usuario, verifique si esta intentado de dar de alta un usuario con un Nick o Email ya registrado y dado de alta",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
}

async function verifyUser(data) {
  const { email, nick } = data;
  const users = await GetUsers();
  const usersActive = users.filter((u) => u.active);
  const allNicksActive = usersActive.map((u) => u.nick);
  const allEmailsActive = usersActive.map((u) => u.email);
  return (
    !allNicksActive.includes(nick) &&
    !allEmailsActive.includes(email) &&
    isValidEmail(data.email)
  );
}

async function verifyEditUser(data, user) {
  const { email, nick } = data;
  const users = await GetUsers();
  const usersActive = users.filter((u) => u.active);
  const allNicksActive = usersActive.map((u) => u.nick);
  const allEmailsActive = usersActive.filter((u) => u.email);
  const allNicksActiveFilter = allNicksActive.filter((n) => n !== user.nick);
  const allEmailsActiveFilter = allEmailsActive.filter((e) => e !== user.email);
  return (
    !allNicksActiveFilter.includes(nick) &&
    !allEmailsActiveFilter.includes(email) &&
    isValidEmail(data.email)
  );
}

function isValidEmail(email) {
  const validFormat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validFormat.test(email);
}

async function LoginUser(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/users/login`,
      method: "POST",
      data: data,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("user login token")}`,
      },
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
    const response = await axios({
      url: `${baseUrl}/places`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("user login token")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

async function GetPlaceById(id) {
  try {
    const response = await GetPlaces();
    return response.filter((u) => u._id === id)[0];
  } catch (err) {
    console.error(err);
  }
  return [];
}

async function DeletePlace(id) {
  try {
    const response = await axios({
      url: `${baseUrl}/places/`,
      method: "DELETE",
      data: { id: id },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("user login token")}`,
      },
    });
    Swal.fire({
      title: "Hecho!",
      text: "El lugar se ha borrado correctamente, actualice para visualizar cambios",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error inesperado al borrar el lugar, asegurese que el lugar ya no fue borrado",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
  return [];
}

async function EditPlace(data, id) {
  try {
    const response = await axios({
      url: `${baseUrl}/places/${id}`,
      method: "PUT",
      data: data,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("user login token")}`,
      },
    });
    Swal.fire({
      title: "Hecho!",
      text: "El lugar ha sido editado correctamente",
      icon: "success",
      confirmButtonText: "Ok",
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error al editar el lugar, asegurese de no haber ingresado una direccion ya registrada u otro dato incorrecto",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}

async function CreateCategory(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/categories`,
      method: "POST",
      data: data,
    });
    Swal.fire({
      title: "Hecho!",
      text: "La categoria se creó correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
    return response;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "No se pudo crear la categoria. Asegurese de haber ingresado un nombre ya registrado",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
}

async function GetCategories() {
  try {
    const response = await axios({
      url: `${baseUrl}/categories`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("user login token")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function GetCategoryById(id) {
  try {
    const response = await GetCategories();
    return response.filter((u) => u._id === id)[0];
  } catch (err) {
    console.error(err);
  }
  return [];
}

async function EditCategory(data, id) {
  try {
    const response = await axios({
      url: `${baseUrl}/places/${id}`,
      method: "PUT",
      data: data,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("user login token")}`,
      },
    });
    Swal.fire({
      title: "Hecho!",
      text: "La categoria ha sido editada correctamente",
      icon: "success",
      confirmButtonText: "Ok",
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error al editar la categoria, asegurese de no haber ingresado un nombre ya registrado incorrecto",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}

async function DeleteCategory(id) {
  try {
    const response = await axios({
      url: `${baseUrl}/categories/`,

      method: "DELETE",
      data: { id: id },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("user login token")}`,
      },
    });
    Swal.fire({
      title: "Hecho!",
      text: "La categoría se ha borrado correctamente, actualize para visualizar los cambios",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error inesperado al borrar la categoría, asegurese que no fue borrada con anterioridad",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
  return [];
}

// Features:

async function CreateFeature(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/features`,
      method: "POST",
      data: data,
    });
    Swal.fire({
      title: "Hecho!",
      text: "La característica se creó correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
    return response;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "No se pudo crear la característica. Asegurese de haber ingresado bien los datos",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
}

async function GetFeatures() {
  try {
    const response = await axios({
      url: `${baseUrl}/features`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("user login token")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

async function GetFeatureById(id) {
  try {
    const response = await GetFeatures();
    return response.filter((u) => u._id === id)[0];
  } catch (err) {
    console.error(err);
  }
  return [];
}

async function DeleteFeature(id) {
  try {
    const response = await axios({
      url: `${baseUrl}/features/`,
      method: "DELETE",
      data: { id: id },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("user login token")}`,
      },
    });
    Swal.fire({
      title: "Hecho!",
      text: "La característica se ha borrado correctamente, actualize para visualizar los cambios",
      icon: "success",
      confirmButtonText: "Cerrar",
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error inesperado al borrar la característica, asegurese que no fue borrada con anterioridad",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
}

const petitions = {
  RegisterUser,
  GetUsers,
  GetUserById,
  EditUser,
  EditUserStatus,
  verifyUser,
  LoginUser,
  CreatePlace,
  GetPlaces,
  GetPlaceById,
  DeletePlace,
  EditPlace,
  CreateCategory,
  EditCategory,
  GetCategories,
  CreateFeature,
  GetFeatures,
  GetFeatureById,
  DeleteFeature,
  DeleteCategory,
  GetCategoryById,
};

export default petitions;
