import { Children } from "react";
import AppLayout from "../AppLayout";
import AddEmployee from "../pages/AddEmployee";
import EmployeeDetails from "../pages/EmployeeDetails";
import EditEmployee from "../pages/EditEmployee";
import DeleteEmployee from "../pages/DeleteEmployee";
import EmployeeList from "../pages/EmployeeList";
import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <EmployeeList />,
      },
      {
        path: "/add",
        element: <AddEmployee />,
      },
      {
        path: "/employee/:id",
        element: <EmployeeDetails />,
      },
      {
        path: "edit/:id",
        element: <EditEmployee />,
      },
      {
        path: "/delete/:id",
        element: <DeleteEmployee />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
