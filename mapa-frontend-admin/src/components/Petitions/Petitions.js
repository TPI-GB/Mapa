import axios from "axios";
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
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function EditUser(data, id) {
  const fullData = data;
  fullData.id = id;

  try {
    const response = await axios({
      url: `${baseUrl}/edituser/`,
      method: "POST",
      data: fullData,
    });
    return response;
  } catch (error) {
    console.error(error);
    console.log(error);
  }
}

const petitions = {
  RegisterUser,
  GetUsers,
  GetUserById,
  EditUser,
};

export default petitions;
