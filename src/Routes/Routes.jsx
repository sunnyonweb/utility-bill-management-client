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

// 🔑 Note: Removed unused imports (Loader)

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // 🔑 Keep errorElement here to catch layout/data loading errors
    errorElement: <Error />,
    children: [
      {
        // Home Page (Public) - Use only `index: true` or `path: ""`
        index: true,
        element: <Home />,
      },
      {
        // All Bills Page (Public)
        path: "bills",
        element: <Bills />,
      },
      {
        // Bill Details Page (PRIVATE ROUTE)
        // 🔑 Renamed parameter to match the BillCard link: /bill/:id -> /bills/:billId
        path: "bill/:id", // Assuming your BillCard links to /bill/:id, not /bills/:billsId
        element: (
          <PrivateRoute>
            <BillsDetails />
          </PrivateRoute>
        ),
      },
      {
        // My Pay Bills Page (PRIVATE ROUTE)
        path: "my-pay-bills",
        element: (
          <PrivateRoute>
            <MyPayBills />
          </PrivateRoute>
        ),
      },
      // 🔑 No need to define Login/Register here if they are root-level routes
    ],
  },
  // --- AUTHENTICATION ROUTES (Top-Level) ---
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // 🔑 404 NOT FOUND ROUTE: React Router handles this automatically, but defining it
  // outside the RootLayout is cleaner for a full-page error element.
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
