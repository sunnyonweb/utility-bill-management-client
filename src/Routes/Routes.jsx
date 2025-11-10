import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Error from "../Pages/Error";
import Loader from "../Component/Loader";
import Home from "../Pages/Home";
import Bills from "../Pages/Bills";
import MyPayBills from "../Pages/MyPayBills";
import PrivateRoute from "./PrivateRoute";
import BillsDetails from "../Pages/BillsDetails";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        // Home Page (Public)
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        // All Bills Page (Public)
        path: "/bills",
        element: <Bills />,
      },
      {
        // Bill Details Page (PRIVATE ROUTE)
        path: "/bills/:billsId",
        element: (
          <PrivateRoute>
            <BillsDetails />
          </PrivateRoute>
        ),
      },
      {
        // My Pay Bills Page
        path: "/my-pay-bills",
        element: (
          <PrivateRoute>
            <MyPayBills />
          </PrivateRoute>
        ),
      },
    ],
  },
  // AUTHENTICATION ROUTES
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);
export default router;
