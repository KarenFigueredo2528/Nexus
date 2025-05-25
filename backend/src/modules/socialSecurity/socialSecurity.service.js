import { mariaDB } from "../../config/database.config.js";

export const getAll = async () => {
  const [rows] = await mariaDB.query("SELECT * FROM SOCIAL_SECURITY");
  return rows;
};

export const getById = async (id) => {
  const [rows] = await mariaDB.query(
    "SELECT * FROM SOCIAL_SECURITY WHERE security_id = ?",
    [id]
  );
  return rows[0];
};

export const create = async (socialSecurity) => {
  const {
    contract_id,
    registration_date,
    health_contribution,
    pension_contribution,
    risk_contribution,
    parafiscal_contribution,
  } = socialSecurity;
  console.log("Creating social security record with data:", socialSecurity);

  const [result] = await mariaDB.query(
    `INSERT INTO SOCIAL_SECURITY (contract_id, registration_date, health_contribution, pension_contribution, risk_contribution, parafiscal_contribution)
        VALUES (?, ?, ?, ?, ?, ?)`,
    [
      contract_id,
      registration_date,
      health_contribution,
      pension_contribution,
      risk_contribution,
      parafiscal_contribution,
    ]
  );

  return await getById(result.insertId);
};

export const deleteRecord = async (id) => {
  await mariaDB.query("DELETE FROM SOCIAL_SECURITY WHERE security_id = ?", [
    id,
  ]);
};

export const update = async (id, updatedData) => {
  const {
    contract_id,
    registration_date,
    health_contribution,
    pension_contribution,
    risk_contribution,
    parafiscal_contribution,
  } = updatedData;

  await mariaDB.query(
    `UPDATE SOCIAL_SECURITY
     SET contract_id = ?, registration_date = ?, health_contribution = ?,
         pension_contribution = ?, risk_contribution = ?, parafiscal_contribution = ?
     WHERE security_id = ?`,
    [
      contract_id,
      registration_date,
      health_contribution,
      pension_contribution,
      risk_contribution,
      parafiscal_contribution,
      id,
    ]
  );

  const [rows] = await mariaDB.query(
    "SELECT * FROM SOCIAL_SECURITY WHERE security_id = ?",
    [id]
  );

  return rows[0];
};
