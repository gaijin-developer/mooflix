import axios from "axios";

export async function loginUser(values: { email: string; password: string }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const response = await axios.post(`${backendUrl}/signin`, values);
  console.log(response);
}
