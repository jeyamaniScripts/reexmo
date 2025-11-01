import express from "express";
import bcrypt from "bcryptjs";
import employees from "../models/employees.js";

const router = express.Router();
router.post("/api/employees", async (req, res) => {
  const { name, password, imageUrl, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!name || !password || !imageUrl || !role) {
    return res.status(400).json({ message: "All fields are required" });
  } else {
    await employees.create({
      name,
      password: hashedPassword,
      imageUrl,
      role,
    });
    res.status(200).json({ message: "new employee created" });
  }
});
router.get("/api/employees", async (req, res) => {
  try {
    const { name, role, limit } = req.query;
    const unknownQuery = [];
    if (unknownQuery.length > 0) {
      return res
        .status(400)
        .json({ message: `unknown query params:${unknownQuery.join(",")}` });
    }
    let totalEmployees = await employees.countDocuments();
    let limitNumber = totalEmployees;

    if (limit) {
      limitNumber = Number(limit);
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
  } catch (errorr) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.delete("/api/employees/:id", async (req, res) => {
  try {
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
      res.status(500).json({ message: " something went wrong" });
    }
  } catch (error) {}
});

export default router;

// import express from "express";
// import bcrypt from "bcrypt";
// import employees from "../modals/employees.js";

// const router = express.Router();
// router.post("/api/employees",async (req,res)=>{
//     const {name,password,imageUrl,role} = req.body;
//     const hashedPassword = await bcrypt.hash(password,10);

//     if(!name || !password ||!imageUrl || !role){
//         return res.status(400).json({message:"name,password,imageUrl,role are mandatory"});
//     }else{
//         await employees.create({name,password:hashedPassword,imageUrl,role});
//         res.status(200).json({message:"New Employee Created"});
//     }
// });

// router.get("/api/employees", async (req,res) =>{
//     try{
//        const {name,role,limit} = req.query;
//        const allowedQueries = ["role","name","limit"];
//     //    example of unknownquery=[cake,hi,limit]
//     const unknownQuery=Object.keys(req.query).filter(
//         (q)=>!allowedQueries.includes(q))
//         // console.log(unknownQuery);
//     if(unknownQuery.length>0){
//         return res.status(400).json({message:unknown query params:${unknownQuery.join(",")}})
//     }

//     let totalEmployees = await employees.countDocuments();

//     let limitNumber = totalEmployees;
//     if(limit){
//         limitNumber = Number(limit);
//         // console.log(limitNumber)
//         if(isNaN(limitNumber)|| limitNumber<1 || limitNumber >= totalEmployees){
//             return res.status(400).json({message:invalid limit value ${limitNumber}})
//         }
//     }
//     const filter = {};
//     if(name){
//         filter.name = name;
//     }
//     if(role){
//         filter.role = role;
//     }

//     const employeesObj = await employees.find(filter).select("-password").limit(limitNumber);
//     res.status(200).json(employeesObj);
//     } catch (error){
//         res.status(500).json({message:"something went wrong"});
//     }
// })
// export default router;
