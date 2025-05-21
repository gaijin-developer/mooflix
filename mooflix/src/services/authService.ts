import axAPI from "../lib/axios";

export async function loginUser(values: { email: string; password: string }) {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const response = await axAPI.post(`${backendUrl}/auth/login`, values);

    const token = response.data.access_token;
    sessionStorage.setItem("access_token", token);

    return true;
  } catch {
    return false;
  }
}

export async function registerUser(formData: any) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  try {
    await axAPI.post(`${backendUrl}/register`, formData);
    return true;
  } catch {
    return false;
  }
}
