import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import  { RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import router from "./Routes/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
