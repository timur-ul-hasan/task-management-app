import { RouteObject } from "react-router";
import LandingPage from "src/content/LandingPage";
import Status404 from "src/content/Status404";
import Login from "src/content/auth/Login";
import Signup from "src/content/auth/Signup";
import ForgotPassword from "src/content/auth/ForgotPassword";

const authRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "*",
    element: <Status404 />,
  },
];

export default authRoutes;
