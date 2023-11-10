import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

function MainLayout() {
  return (
    <div className="">
      <Header />
      <Navbar />
      <main className="align-element pt-20">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
