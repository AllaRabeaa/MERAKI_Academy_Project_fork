import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Booking from "../pages/Booking";
import Main from "../Layout/Main/index";
import Home from "../pages/Home/index";
import About from "../pages/About/index";
import Help from "../Layout/Help";
import NotFound from "../pages/NotFound";
import Register, { getRegister } from "../pages/Register";
import Category, { allCategory } from "../pages/categories";
import GetAllService from "../pages/AllService";
import ServiceProvider from "../pages/ServiceProvider";
import AdminPanel from "../pages/Admin/adminPanel";
import Rate from "../pages/Rate/index";
import CategoryList from "../pages/categoryList"
// import { allCategory } from "../Service/api/categories";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "help",
        element: <Help />,
      },
    ],
  },
  {
    path: "/category",
    element: <Category />,
    loader: allCategory,
  },
  {
    path: "/register",
    element: <Register />,
    // loader:getRegister
  },
  {
    path: "/allserviceprovider",
    element: <GetAllService />,
    
  },
  {
    path: "/createprovider",
    element: <ServiceProvider />,
  },
  {
    path: "/:id",
    element: <CategoryList />,
  },
  {
    path: "/rate",
    element: <Rate />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/booking",
    element: <Booking />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
