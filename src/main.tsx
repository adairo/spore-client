import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "@/pages/Login/Login";
import SignupPage from "./pages/SignUp/SignUp";
import "./main.css";
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import CarsPage from "@/pages/CarsPage/CarsPage";
import CarsRegisterPage from "./pages/CarsRegisterPage/CarsRegisterPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getSession, removeToken } from "./lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

const Root = () => {
  const session = getSession();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };
  return (
    <div className="full-screen-height grid grid-rows-[auto_1fr]">
      <header className="px-4 py-3 text-white bg-black text-xl font-bold flex items-center justify-between">
        <div>SporeCar</div>
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarFallback className="text-slate-600">
                  {session.user.email.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-sm">
              <DropdownMenuLabel>
                <div>{session.user.email}</div>
                <div className="font-normal">usuario {session.user.role}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleLogout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/login">Iniciar sesión</Link>
        )}
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
        element: <CarsRegisterPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
