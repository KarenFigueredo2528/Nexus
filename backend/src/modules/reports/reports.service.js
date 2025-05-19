import { connectMongoDB } from '../../config/database.config.js';

const db = await connectMongoDB();

export const getPayrollSummary = async () => {
    const payroll = await db.collection('payroll').aggregate([
        {
            $group: {
                _id: "$period",
                total_earnings: { $sum: "$total_earnings" },
                total_deductions: { $sum: "$total_deductions" },
                total_net_salary: { $sum: "$net_salary" }
            }
        },
        { $sort: { _id: 1 } }
    ]).toArray();

    return payroll;
};

export const getAbsencesReport = async () => {
    const absences = await db.collection('absences').aggregate([
        {
            $lookup: {
                from: "employees",
                localField: "employee_id",
                foreignField: "employee_id",
                as: "employee_info"
            }
        },
        { $unwind: "$employee_info" },
        {
            $group: {
                _id: "$employee_info.first_name",
                total_absences: { $sum: "$days_absent" }
            }
        }
    ]).toArray();

    return absences;
};

export const getSalaryByDepartment = async () => {
    const salaries = await db.collection('contracts').aggregate([
        {
            $lookup: {
                from: "departments",
                localField: "department_id",
                foreignField: "department_id",
                as: "department_info"
            }
        },
        { $unwind: "$department_info" },
        {
            $group: {
                _id: "$department_info.name",
                total_salary: { $sum: "$agreed_salary" }
            }
        }
    ]).toArray();

    return salaries;
};

export const getEmployeeDetailReport = async () => {
    const employees = await db.collection('employees').aggregate([
        {
            $lookup: {
                from: "contracts",
                localField: "employee_id",
                foreignField: "employee_id",
                as: "contracts"
            }
        },
        {
            $lookup: {
                from: "absences",
                localField: "employee_id",
                foreignField: "employee_id",
                as: "absences"
            }
        },
        {
            $project: {
                first_name: 1,
                last_name: 1,
                identification: 1,
                email: 1,
                status: 1,
                total_contracts: { $size: "$contracts" },
                total_absences: { $size: "$absences" }
            }
        }
    ]).toArray();

    return employees;
};
