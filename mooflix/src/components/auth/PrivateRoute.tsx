import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const token = sessionStorage.getItem("access_token");
  return token ? children : <Navigate to="/" replace />;
}
