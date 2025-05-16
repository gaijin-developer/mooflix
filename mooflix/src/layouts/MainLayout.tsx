import { Outlet } from "react-router";
import Header from "../components/common/header/Header";

function MainLayout() {
  return (
    <main className="bg-[var(--background-primary)] text-[var(--text-primary)] min-h-screen">
      <Header />
      <Outlet />
    </main>
  );
}

export default MainLayout;
