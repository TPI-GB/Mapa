import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

async function CreateComment() {
  try {
    const response = await axios({
      url: `${baseUrl}/comment`,
      method: "POST",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
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
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

const petitions = {
  CreateComment,
  GetPlaces
};

export default petitions;
