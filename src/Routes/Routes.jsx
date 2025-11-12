import { createBrowserRouter } from "react-router-dom"; // 🔑 Import from react-router-dom
import RootLayout from "../Layout/RootLayout";
import Error from "../Pages/Error";
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
        index: true,
        element: <Home />,
      },
      {
        path: "bills",
        element: <Bills />,
      },
      {
        path: "bill/:id",
        element: (
          <PrivateRoute>
            <BillsDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "my-pay-bills",
        element: (
          <PrivateRoute>
            <MyPayBills />
          </PrivateRoute>
        ),
      },
    ],
  },

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
