const Employee = require("../models/Employee");

exports.addEmployee = async (req, res) => {

  try {

    const employee = await Employee.create(req.body);

    res.status(201).json(employee);

  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};

exports.getEmployees = async (req, res) => {

  const employees = await Employee.find();

  res.json(employees);
};

exports.searchEmployee = async (req, res) => {

  const employees = await Employee.find({
    department: req.query.department
  });

  res.json(employees);
};

exports.deleteEmployee = async (req, res) => {

  await Employee.findByIdAndDelete(req.params.id);

  res.json({
    message: "Employee Deleted"
  });
};