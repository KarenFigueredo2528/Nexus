import { mariaDB } from '../../config/database.config.js';

export const getAll = async () => {
    const [rows] = await mariaDB.query('SELECT * FROM SOCIAL_SECURITY');
    return rows;
};

export const getById = async (id) => {
    const [rows] = await mariaDB.query('SELECT * FROM SOCIAL_SECURITY WHERE security_id = ?', [id]);
    return rows[0];
};

export const create = async (socialSecurity) => {
    const { contract_id, registration_date, health_contribution, pension_contribution, risk_contribution, parafiscal_contribution } = socialSecurity;
    const [result] = await mariaDB.query(
        `INSERT INTO SOCIAL_SECURITY (contract_id, registration_date, health_contribution, pension_contribution, risk_contribution, parafiscal_contribution)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [contract_id, registration_date, health_contribution, pension_contribution, risk_contribution, parafiscal_contribution]
    );

    return await getById(result.insertId);
};
