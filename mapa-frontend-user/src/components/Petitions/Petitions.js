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

const petitions = {
  CreateComment,
};

export default petitions;
