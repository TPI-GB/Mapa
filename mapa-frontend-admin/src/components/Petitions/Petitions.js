import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

async function getUsers() {
  try {
    const response = await axios({ url: `${baseUrl}/users`, method: "GET" });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

async function registerUser(data) {
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

const petitions = {
  registerUser,
  getUsers,
};

export default petitions;
