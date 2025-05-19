import { mariaDB } from '../../config/database.config.js';

export const getAll = async () => {
    const [rows] = await mariaDB.query(`
        SELECT 
            p.*, 
            calculate_deductions(p.contract_id) AS total_deductions, 
            calculate_net_salary(p.total_earnings, calculate_deductions(p.contract_id)) AS net_salary
        FROM PAYROLL p
    `);
    return rows;
};

export const getById = async (id) => {
    const [rows] = await mariaDB.query(`
        SELECT 
            p.*, 
            calculate_deductions(p.contract_id) AS total_deductions, 
            calculate_net_salary(p.total_earnings, calculate_deductions(p.contract_id)) AS net_salary
        FROM PAYROLL p
        WHERE p.payroll_id = ?
    `, [id]);
    return rows[0];
};

export const create = async (payroll) => {
    const { contract_id, payment_date, period, total_earnings } = payroll;
    await mariaDB.query(
        `INSERT INTO PAYROLL (contract_id, payment_date, period, total_earnings, total_deductions, net_salary)
        VALUES (?, ?, ?, ?, calculate_deductions(?), calculate_net_salary(?, calculate_deductions(?)))`,
        [contract_id, payment_date, period, total_earnings, contract_id, total_earnings, contract_id]
    );

    const [newPayroll] = await mariaDB.query('SELECT * FROM PAYROLL WHERE payroll_id = LAST_INSERT_ID()');
    return newPayroll[0];
};

export const update = async (id, payroll) => {
    const { payment_date, period, total_earnings } = payroll;
    await mariaDB.query(
        `UPDATE PAYROLL 
        SET payment_date = ?, period = ?, total_earnings = ?, 
            total_deductions = calculate_deductions(contract_id), 
            net_salary = calculate_net_salary(?, calculate_deductions(contract_id))
        WHERE payroll_id = ?`,
        [payment_date, period, total_earnings, total_earnings, id]
    );

    return await getById(id);
};

export const deletePayroll = async (id) => {
    await mariaDB.query('DELETE FROM PAYROLL WHERE payroll_id = ?', [id]);
};
