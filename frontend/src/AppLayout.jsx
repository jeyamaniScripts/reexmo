import React from "react";
import { Link, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <h1>Employee Detail</h1>
      <nav>
        <Link to="/"> All Employees</Link>
        <Link to={"/add"}>Add Emoloyee</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default AppLayout;
