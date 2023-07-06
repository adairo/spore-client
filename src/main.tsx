import React from "react";
import ReactDOM from "react-dom/client";
import LoginForm from "@/components/Login/Login";
import "./main.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import SignupForm from "./components/SignUp/SignUp";

const Root = () => {
  return (
    <div className="full-screen-height grid grid-rows-[auto_1fr]">
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
        element: <LoginForm />,
      },
      {
        path: "sign-up",
        element: <SignupForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
