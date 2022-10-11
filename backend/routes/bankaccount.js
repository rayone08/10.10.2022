const express = require("express");
const BankAccount = require("../models/bankaccount");

const router = express.Router();

router.post("/employeebank/add", async (req, res) => {
  const newBankAccount = new BankAccount({
    accNum: req.body.accNum,
    empid: req.body.empid,
    bankName: req.body.bankName,
    branch: req.body.branch,
  });

  try {
    await newBankAccount.save();
    res.status(200).json(newBankAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//update employee key in bank databse
//update
router.patch("/employeebank/edit/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await BankAccount.updateOne(
      { empid: id },
      { $set: { empid: req.body.empid } }
    );
    res.status(200).json("Employee Update in BankAccount Databse");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//update Bank Details
router.patch("/employeebank/edit/all/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBankAccount = await BankAccount.updateOne(
      { empid: id },
      {
        $set: {
          accNum: req.body.accNum,
          bankName: req.body.bankName,
          branch: req.body.branch,
        },
      }
    );

    res.status(200).json(updatedBankAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//view Bank details in View Part
router.get("/bank/:id", (req, res) => {
  const { id } = req.params;
  BankAccount.findOne({ empid: id }).exec((err, BankAccount) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingBankAccount: BankAccount,
    });
  });
});

//delete
router.delete("/employeebank/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await BankAccount.deleteOne({ empid: id });
    res.status(200).json("Deleted!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
