import axios from "axios";

export async function getToken() {
  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  console.log(backendUrl);
  await axios
    .get(`${backendUrl}/sanctum/csrf-cookie`)
    .then((response) => {
      console.log("see details", response.data);
    })
    .catch((e) => {
      console.log(e);
    });
}
