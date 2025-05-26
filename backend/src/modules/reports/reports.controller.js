import * as reportService from './reports.service.js';

export const getGeneralPayrollReport = async (req, res, next) => {
    try {
        const report = await reportService.getPayrollSummary();
        res.status(200).json(report);
    } catch (error) {
        next(error);
    }
};

export const getAbsencesReport = async (req, res, next) => {
    try {
        const report = await reportService.getAbsencesReport();
        res.status(200).json(report);
    } catch (error) {
        next(error);
    }
};

export const getSalaryByDepartmentReport = async (req, res, next) => {
    try {
        const report = await reportService.getSalaryByDepartment();
        res.status(200).json(report);
    } catch (error) {
        next(error);
    }
};

export const getEmployeeDetailReport = async (req, res, next) => {
    try {
        const report = await reportService.getEmployeeDetailReport();
        res.status(200).json(report);
    } catch (error) {
        next(error);
    }
};
