import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Toaster } from "react-hot-toast";
import SideMenu from "./Components/SideMenu";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
     
      <Outlet />
    </>
  );
}

export default App;
