import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;

async function CreateComment(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/comment`,
      method: "POST",
      data: data,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

async function AddCommentToPlace(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/comment`,
      method: "PUT",
      data: data,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function EditRating(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/places/rating`,
      method: "PUT",
      data: data,
    });
    return response;
  } catch (err) {
    console.log(err);
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
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

const petitions = {
  CreateComment,
  GetPlaces,
  AddCommentToPlace,
  EditRating,
};

export default petitions;
