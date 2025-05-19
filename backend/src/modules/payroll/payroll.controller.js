import * as payrollService from './payroll.service.js';

export const getAllPayroll = async (req, res, next) => {
    try {
        const records = await payrollService.getAll();
        res.status(200).json(records);
    } catch (error) {
        next(error);
    }
};

export const getPayrollById = async (req, res, next) => {
    try {
        const record = await payrollService.getById(req.params.id);
        if (!record) {
            return res.status(404).json({ message: "Payroll record not found" });
        }
        res.status(200).json(record);
    } catch (error) {
        next(error);
    }
};

export const createPayroll = async (req, res, next) => {
    try {
        const newPayroll = await payrollService.create(req.body);
        res.status(201).json(newPayroll);
    } catch (error) {
        next(error);
    }
};

export const updatePayroll = async (req, res, next) => {
    try {
        const updatedPayroll = await payrollService.update(req.params.id, req.body);
        res.status(200).json(updatedPayroll);
    } catch (error) {
        next(error);
    }
};

export const deletePayroll = async (req, res, next) => {
    try {
        await payrollService.deletePayroll(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
