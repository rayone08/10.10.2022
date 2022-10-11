const express = require("express");
const Department = require("../models/department");

const router = express.Router();

//register route
router.post("/department/add", async (req, res) => {
  const newDepartment = new Department({
    empid: req.body.empid,
    jobrole: req.body.jobrole,
    basesalary: req.body.basesalary,
    depetfield: req.body.depetfield,
    empstate: req.body.empstate,
  });
  try {
    await newDepartment.save();
    res.status(200).json(newDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get
router.get("/department/show/:id", (req, res) => {
  const { id } = req.params;
  Department.findOne({ empid: id }).exec((err, Department) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingDepartment: Department,
    });
  });
});

//check whether department details available or not
router.get("/department/details/show/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await Department.find({ empid: id }).count();
    return res.status(200).json(count);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//update Employee Id Only
router.patch("/departmnent/edit/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Department.updateOne(
      { empid: id },
      { $set: { empid: req.body.empid } }
    );
    res.status(200).json("Employee Update in Department Databse");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update all details
//update Bank Details
router.patch("/departmnent/edit/all/:id", async (req, res) => {
  const { id } = req.params;

  try {
    updateDepartment = await Department.updateOne(
      { empid: id },
      {
        $set: {
          jobrole: req.body.jobrole,
          basesalary: req.body.basesalary,
          depetfield: req.body.depetfield,
          empstate: req.body.empstate,
        },
      }
    );

    res.status(200).json(updateDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete
router.delete("/department/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Department.deleteOne({ empid: id });
    res.status(200).json("Deleted!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
