import React, { useEffect, useState } from "react";
import { getEmployees } from "../api";
import { Link } from "react-router-dom";
const EmployeeList = () => {
  const [employess, setEmployees] = useState([]);
  useEffect(() => {
    async function getAllEmployees() {
      const data = await getEmployees();
      setEmployees(data);
    }
    getAllEmployees();
  }, []);
  return (
    <div>
      {employess.length > 0 &&
        employess.map((emp) => {
          const { _id, role, name, imageUrl } = emp;
          return (
            <div style={{ border: "1px solid red", padding: "1em" }} key={_id}>
              <p>{name}</p>
              <p>{role}</p>
              <p>{imageUrl}</p>
              <br />
              <Link to={`/employee/${_id}`}>view</Link>
            </div>
          );
        })}
    </div>
  );
};

export default EmployeeList;
