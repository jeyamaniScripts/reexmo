import express from "express";
import bcrypt from "bcryptjs";

import employees from "../models/employees.js";

const router = express.Router();

router.post("/api/employees", async (req, res) => {
  const { name, password, imageUrl, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!name || !password || !imageUrl || !role) {
    return res
      .status(400)
      .json({ message: "name, password, imageUrl, role are mandatory" });
  } else {
    await employees.create({ name, password: hashedPassword, imageUrl, role });
    return res.status(200).json({ message: "new employee created" });
  }
});

router.get("/api/employees", async (req, res) => {
  try {
    const { name, role, limit } = req.query;

    const allowedQueries = ["role", "name", "limit"];
    // example of unknownquery = [cake,hi,limit]
    const unknownQuery = Object.keys(req.query).filter(
      (q) => !allowedQueries.includes(q)
    );
    // console.log(unknownQuery);
    if (unknownQuery.length > 0) {
      return res
        .status(400)
        .json({ message: `unknown query params: ${unknownQuery.join(", ")}` });
    }

    let totalEmployees = await employees.countDocuments();

    let limitNumber = totalEmployees;
    if (limit) {
      limitNumber = Number(limit);
      // console.log(limitNumber);
      if (
        isNaN(limitNumber) ||
        limitNumber < 1 ||
        limitNumber >= totalEmployees
      ) {
        return res
          .status(400)
          .json({ message: `invalid limit value ${limitNumber}` });
      }
    }

    const filter = {};
    if (name) {
      filter.name = name;
    }
    if (role) {
      filter.role = role;
    }

    const employeesObj = await employees
      .find(filter)
      .select("-password")
      .limit(limitNumber);
    res.status(200).json(employeesObj);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.delete("/api/employees/:id", async (req, res) => {
  try {
    // console.log(req.params);
    await employees.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: `employee with id-${req.params.id} deleted` });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/api/employees/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employeeObj = await employees.findById(employeeId);

    if (employeeObj) {
      res.status(200).json(employeeObj);
    } else {
      res
        .status(400)
        .json({ message: `employee with id - ${employeeId} is not found` });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.put("/api/employees/:id", async (req, res) => {
  try {
    const { name, password, role, imageUrl } = req.body;
    const updatedData = {};

    if (name) {
      updatedData.name = name;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    if (role) {
      updatedData.role = role;
    }

    if (imageUrl) {
      updatedData.imageUrl = imageUrl;
    }

    await employees.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });
    res
      .status(200)
      .json({ message: `employee with id-${req.params.id} has been edited ` });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

export default router;

// db-> joe=> 20
// db=> joe=>20, dev=10

// name=> joe, role=> dev => return => 10 joe who is dev

//  name=> joe, role=> dev => limit =2 => 2 joe who is dev
