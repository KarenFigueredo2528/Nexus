import * as departmentService from './departments.service.js';

export const getAllDepartments = async (req, res, next) => {
    try {
        const departments = await departmentService.getAll();
        res.status(200).json(departments);
    } catch (error) {
        next(error);
    }
};

export const getDepartmentById = async (req, res, next) => {
    try {
        const department = await departmentService.getById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json(department);
    } catch (error) {
        next(error);
    }
};

export const createDepartment = async (req, res, next) => {
    try {
        const newDepartment = await departmentService.create(req.body);
        res.status(201).json(newDepartment);
    } catch (error) {
        next(error);
    }
};

export const updateDepartment = async (req, res, next) => {
    try {
        const updatedDepartment = await departmentService.update(req.params.id, req.body);
        res.status(200).json(updatedDepartment);
    } catch (error) {
        next(error);
    }
};

export const deleteDepartment = async (req, res, next) => {
    try {
        await departmentService.deleteDepartment(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
