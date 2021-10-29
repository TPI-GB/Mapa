import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

export default async function getUsers() {
  try {
    const response = await axios({ url: `${baseUrl}/users`, method: "GET" });
    return response.data.usuarios;
  } catch (error) {
    console.error(error);
  }
  return [];
}
