import axAPI from "../lib/axios";
import type { RegisterFormData } from "../types/registerform";

export async function loginUser(values: {
  email: string;
  password: string;
}): Promise<boolean> {
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

export async function registerUser(
  formData: RegisterFormData
): Promise<boolean> {
  try {
    await axAPI.post(`/register`, formData);
    return true;
  } catch {
    return false;
  }
}

export async function getPasswordRecoveryCode(formData: {
  email: string;
}): Promise<boolean> {
  try {
    localStorage.setItem("recoveryEmail", JSON.stringify(formData.email));
    await axAPI.post(`/forgot-password`, formData);
    return true;
  } catch {
    return false;
  }
}

export async function submitPasswordRecoveryCode(formData: { code: string }) {
  try {
    const recEmail = localStorage.getItem("recoveryEmail");
    if (recEmail) {
      const email = JSON.parse(recEmail);
      const response = await axAPI.post(`/submit-recovery-code`, {
        ...formData,
        email,
      });
      const newPassToken = response.data.reset_token;

      localStorage.setItem("resetToken", newPassToken);
      return true;
    }
  } catch {
    return false;
  }
}

export async function submitNewPassword(formData: {
  password: string;
  repassword: string;
}): Promise<boolean> {
  try {
    const recEmail = localStorage.getItem("recoveryEmail");
    let resetToken = localStorage.getItem("resetToken");

    if (recEmail && resetToken) {
      const email = JSON.parse(recEmail);
      resetToken = JSON.parse(resetToken);

      await axAPI.post(`/new-password`, {
        password: formData.password,
        email,
        resetToken,
      });

      localStorage.removeItem("recoveryEmail");
      localStorage.removeItem("resetToken");

      return true;
    }
    return false;
  } catch {
    return false;
  }
}
