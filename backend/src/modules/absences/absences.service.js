import { mariaDB } from '../../config/database.config.js';

export const getAll = async () => {
    const [rows] = await mariaDB.query(`
        SELECT 
            a.*, 
            get_absent_days(a.employee_id) AS total_absent_days 
        FROM ABSENCE a
    `);
    return rows;
};

export const getById = async (id) => {
    const [rows] = await mariaDB.query(`
        SELECT 
            a.*, 
            get_absent_days(a.employee_id) AS total_absent_days 
        FROM ABSENCE a 
        WHERE a.absence_id = ?
    `, [id]);
    return rows[0];
};

export const create = async (absence) => {
    const { employee_id, absence_type, start_date, end_date, days_absent } = absence;
    const [result] = await mariaDB.query(
        `INSERT INTO ABSENCE (employee_id, absence_type, start_date, end_date, days_absent)
        VALUES (?, ?, ?, ?, ?)`,
        [employee_id, absence_type, start_date, end_date, days_absent]
    );
    return await getById(result.insertId);
};

export const update = async (id, absence) => {
    const { absence_type, start_date, end_date, days_absent } = absence;
    await mariaDB.query(
        `UPDATE ABSENCE 
        SET absence_type = ?, start_date = ?, end_date = ?, days_absent = ? 
        WHERE absence_id = ?`,
        [absence_type, start_date, end_date, days_absent, id]
    );
    return await getById(id);
};

export const deleteAbsence = async (id) => {
    await mariaDB.query('DELETE FROM ABSENCE WHERE absence_id = ?', [id]);
};
