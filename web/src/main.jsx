import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Auth } from "./routes/auth";
import ForgotPassword from "./routes/forgotPasswordPage";
import Register from "./routes/RegisterPage";
import "./index.css";
import Login from "./routes/auth";
import main from "./routes/mainpae";
import UserProfile from "./routes/UserProfile";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Main />
    )
  },
  {
    path: "/login",
    element: (
      <Login />
    )
  },
  {
    path: "/register",
    element: (
      <Register />
    )
  },
  {
    path: "/forgot-password",
    element:(
      <ForgotPassword />
    )
  },
  {
    path: "/profile",
    element: (
      <UserProfile />
    )
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
