import { mariaDB } from '../../config/database.config.js';

export const getAll = async () => {
    const [rows] = await mariaDB.query('SELECT * FROM DEPARTMENT');
    return rows;
};

export const getById = async (id) => {
    const [rows] = await mariaDB.query('SELECT * FROM DEPARTMENT WHERE department_id = ?', [id]);
    return rows[0];
};

export const create = async (department) => {
    const { name, description } = department;
    const [result] = await mariaDB.query(
        `INSERT INTO DEPARTMENT (name, description) VALUES (?, ?)`,
        [name, description]
    );

    const [newDepartment] = await mariaDB.query('SELECT * FROM DEPARTMENT WHERE department_id = ?', [result.insertId]);
    return newDepartment[0];
};

export const update = async (id, department) => {
    const { name, description } = department;
    await mariaDB.query(
        `UPDATE DEPARTMENT SET name = ?, description = ? WHERE department_id = ?`,
        [name, description, id]
    );

    const [updatedDepartment] = await mariaDB.query('SELECT * FROM DEPARTMENT WHERE department_id = ?', [id]);
    return updatedDepartment[0];
};

export const deleteDepartment = async (id) => {
    await mariaDB.query('DELETE FROM DEPARTMENT WHERE department_id = ?', [id]);
};
