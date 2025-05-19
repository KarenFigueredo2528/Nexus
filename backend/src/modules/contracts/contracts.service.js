import { mariaDB } from '../../config/database.config.js';

export const getAll = async () => {
    const [rows] = await mariaDB.query(`
        SELECT 
            c.*, 
            calculate_deductions(c.contract_id) AS total_deductions,
            (c.agreed_salary - calculate_deductions(c.contract_id)) AS net_salary
        FROM CONTRACT c
    `);
    return rows;
};

export const getById = async (id) => {
    const [rows] = await mariaDB.query(`
        SELECT 
            c.*, 
            calculate_deductions(c.contract_id) AS total_deductions,
            (c.agreed_salary - calculate_deductions(c.contract_id)) AS net_salary
        FROM CONTRACT c 
        WHERE c.contract_id = ?
    `, [id]);
    return rows[0];
};

export const create = async (contract) => {
    const { employee_id, job_position_id, department_id, contract_type, start_date, end_date, agreed_salary } = contract;
    const [result] = await mariaDB.query(
        `INSERT INTO CONTRACT (employee_id, job_position_id, department_id, contract_type, start_date, end_date, agreed_salary)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [employee_id, job_position_id, department_id, contract_type, start_date, end_date, agreed_salary]
    );

    return await getById(result.insertId);
};

export const update = async (id, contract) => {
    const { job_position_id, contract_type, start_date, end_date, agreed_salary } = contract;
    await mariaDB.query(
        `UPDATE CONTRACT 
        SET job_position_id = ?, contract_type = ?, start_date = ?, end_date = ?, agreed_salary = ? 
        WHERE contract_id = ?`,
        [job_position_id, contract_type, start_date, end_date, agreed_salary, id]
    );

    return await getById(id);
};

export const deleteContract = async (id) => {
    await mariaDB.query('DELETE FROM CONTRACT WHERE contract_id = ?', [id]);
};
