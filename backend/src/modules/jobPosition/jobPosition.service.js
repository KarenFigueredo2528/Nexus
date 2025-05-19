import { mariaDB } from '../../config/database.config.js';

export const getAll = async () => {
    const [rows] = await mariaDB.query('SELECT * FROM JOB_POSITION');
    return rows;
};

export const getById = async (id) => {
    const [rows] = await mariaDB.query('SELECT * FROM JOB_POSITION WHERE job_position_id = ?', [id]);
    return rows[0];
};

export const create = async (jobPosition) => {
    const { name, level, base_salary } = jobPosition;

    if (base_salary < 0) throw new Error("Base salary must be positive");

    const [result] = await mariaDB.query(
        `INSERT INTO JOB_POSITION (name, level, base_salary) VALUES (?, ?, ?)`,
        [name, level, base_salary]
    );

    return await getById(result.insertId);
};

export const update = async (id, jobPosition) => {
    const { name, level, base_salary } = jobPosition;

    if (base_salary < 0) throw new Error("Base salary must be positive");

    await mariaDB.query(
        `UPDATE JOB_POSITION SET name = ?, level = ?, base_salary = ? WHERE job_position_id = ?`,
        [name, level, base_salary, id]
    );

    return await getById(id);
};

export const deleteJobPosition = async (id) => {
    await mariaDB.query('DELETE FROM JOB_POSITION WHERE job_position_id = ?', [id]);
};
