
# Nexus Payroll - Final Project

Web application developed as the final project for the Database 2 course at Universidad El Bosque.

## Project Overview
Nexus is a web-based payroll management system designed to handle employee records, contracts, monthly payments, social security, severance, and final settlements, tailored to Colombian labor regulations. It integrates both relational and non-relational databases for efficient data handling.

## Technologies Used
- **Frontend:** React, JavaScript
- **Backend:** Node.js, Express
- **Relational Database:** MariaDB
- **NoSQL Database:** MongoDB
- **Virtual Machine:** Debian 12

## Repository Structure
- `frontend/`: Web application
- `backend/`: API and business logic
- `database/`: SQL scripts, functions, triggers
- `vm/`: VM configuration and screenshots
- `docs/`: Project documentation and deliverables

## Database Schema Documentation

### Tables

#### EMPLOYEE
Stores personal and employment-related details.
- `employee_id` (Primary Key)
- `first_name`, `last_name`, `identification`, `phone`, `email`, `hire_date`, `status`, `street_address`, `city`, `state`

#### DEPARTMENT
Organizational departments.
- `department_id` (Primary Key)
- `name`, `description`

#### JOB_POSITION
Job roles and base salaries.
- `job_position_id` (Primary Key)
- `name`, `level`, `base_salary`, `department_id` (FK)

#### CONTRACT
Details of employment contracts.
- `contract_id` (Primary Key)
- `employee_id`, `job_position_id`, `department_id` (FKs)
- `contract_type`, `start_date`, `end_date`, `agreed_salary`

#### SOCIAL_SECURITY
Statutory contributions per contract.
- `security_id` (Primary Key)
- `contract_id` (FK)
- `registration_date`, `health_contribution`, `pension_contribution`, `risk_contribution`, `parafiscal_contribution`

#### PAYROLL
Payroll information for each contract.
- `payroll_id` (Primary Key)
- `contract_id` (FK)
- `payment_date`, `period`, `total_earnings`, `total_deductions`, `net_salary`

#### ABSENCE
Employee absence records.
- `absence_id` (Primary Key)
- `employee_id` (FK)
- `absence_type`, `start_date`, `end_date`, `days_absent`

### Stored Functions

- `calculate_deductions(contract_id)`: Total deductions from SOCIAL_SECURITY.
- `calculate_net_salary(earnings, deductions)`: Computes net salary.
- `get_absent_days(employee_id)`: Sum of absence days.
- `calculate_seniority(employee_id)`: Years since hire.
- `is_active_contract(employee_id)`: Checks active contract status.

### Triggers

- `trg_contract_end`: Marks employee as Inactive when contract ends.
- `trg_update_salary`: Syncs salary changes from JOB_POSITION to CONTRACT.
- `trg_salary_validation`: Prevents insertion if agreed_salary < base_salary.
- `trg_social_security_update`: Updates PAYROLL deductions post insert.
- `trg_absence_update`: Sets employee to Inactive if absent > 30 days.

## Timeline and Deliverables
See [insert timeline link]

## Team
- Miguel Angel Sanchez Achury
- Julieth Dayana Serrano Castañeda
- Karen Ximena Buitrago Figueredo

## License
This project is carried out for educational purposes only.
