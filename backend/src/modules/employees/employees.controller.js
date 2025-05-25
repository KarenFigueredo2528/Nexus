import * as employeeService from "./employees.service.js";

export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await employeeService.getAll();
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeService.getById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req, res, next) => {
  try {
    const newEmployee = await employeeService.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const updatedEmployee = await employeeService.update(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    await employeeService.deleteEmployee(req.params.id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};
