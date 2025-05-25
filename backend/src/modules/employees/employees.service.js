import { mariaDB } from "../../config/database.config.js";

export const getAll = async () => {
  const [rows] = await mariaDB.query(`
        SELECT * FROM EMPLOYEE
    `);
  return rows;
};

export const getById = async (id) => {
  const [rows] = await mariaDB.query(
    `
        SELECT 
            e.*, 
            calculate_seniority(e.employee_id) AS seniority,
            IF(is_active_contract(e.employee_id), 'Active', 'Inactive') AS active_contract,
            get_absent_days(e.employee_id) AS total_absences
        FROM EMPLOYEE e 
        WHERE e.employee_id = ?
    `,
    [id]
  );

  return rows[0];
};

export const create = async (employee) => {
  const {
    first_name,
    last_name,
    identification,
    phone,
    email,
    hire_date,
    street_address,
    city,
    state,
  } = employee;
  const [result] = await mariaDB.query(
    `INSERT INTO EMPLOYEE (first_name, last_name, identification, phone, email, hire_date, street_address, city, state) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      first_name,
      last_name,
      identification,
      phone,
      email,
      hire_date,
      street_address,
      city,
      state,
    ]
  );

  const [newEmployee] = await mariaDB.query(
    `
  SELECT * FROM EMPLOYEE WHERE employee_id = ?
`,
    [result.insertId]
  );

  return newEmployee[0];
};

export const update = async (id, employee) => {
  const {
    first_name,
    last_name,
    identification,
    phone,
    email,
    street_address,
    city,
    state,
  } = employee;
  await mariaDB.query(
    `UPDATE EMPLOYEE 
        SET first_name = ?, last_name = ?, identification = ?, phone = ?, email = ?, street_address = ?, city = ?, state = ? 
        WHERE employee_id = ?`,
    [
      first_name,
      last_name,
      identification,
      phone,
      email,
      street_address,
      city,
      state,
      id,
    ]
  );

  const [updatedEmployee] = await mariaDB.query(
    `
        SELECT 
            e.*, 
            calculate_seniority(e.employee_id) AS seniority,
            IF(is_active_contract(e.employee_id), 'Active', 'Inactive') AS active_contract,
            get_absent_days(e.employee_id) AS total_absences
        FROM EMPLOYEE e 
        WHERE e.employee_id = ?
    `,
    [id]
  );

  return updatedEmployee[0];
};

export const deleteEmployee = async (id) => {
  await mariaDB.query(
    'UPDATE EMPLOYEE SET status = "Inactive" WHERE employee_id = ?',
    [id]
  );
};

export const getEmployeeAbsences = async (id) => {
  const [rows] = await mariaDB.query(
    `
        SELECT 
            get_absent_days(?) AS total_absences
    `,
    [id]
  );
  return rows[0];
};

export const getEmployeeSeniority = async (id) => {
  const [rows] = await mariaDB.query(
    `
        SELECT 
            calculate_seniority(?) AS seniority
    `,
    [id]
  );
  return rows[0];
};
