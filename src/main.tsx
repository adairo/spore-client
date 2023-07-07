import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "@/pages/Login/Login";
import SignupPage from "./pages/SignUp/SignUp";
import "./main.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import CarsPage from "@/pages/CarsPage/CarsPage";
import CarsRegisterPage from "./pages/CarsRegisterPage/CarsRegisterPage";

const Root = () => {
  return (
    <div className=" grid grid-rows-[auto_1fr]">
      <header className="px-4 py-3 text-white bg-black text-xl font-bold">
        SporeCar
      </header>
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "sign-up",
        element: <SignupPage />,
      },
      {
        path: "cars",
        element: <CarsPage />,
      },
      {
        path: "cars/register",
        element: <CarsRegisterPage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
