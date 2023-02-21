import routes from "../constants/routes";

const getEntries = async () => {
  try {
    let result = await fetch(routes.serverURL)
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return result;
  } catch (e) {
    console.log("an error has occured", e);
  }
};

export default {
  getEntries,
};
