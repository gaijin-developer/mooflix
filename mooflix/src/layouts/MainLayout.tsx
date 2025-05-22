import { Outlet } from "react-router";
import Header from "../components/common/header/Header";
import { useEffect } from "react";
import Footer from "../components/common/footer/Footer";

function MainLayout() {
  useEffect(() => {
    const spinner = document.getElementById("spinnerWrapper");
    spinner?.remove();
  }, []);
  return (
    <div className="bg-[var(--background-primary)] flex flex-col justify-between text-[var(--text-primary)] min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
