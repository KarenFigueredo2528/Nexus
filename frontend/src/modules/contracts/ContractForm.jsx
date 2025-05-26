import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Grid
} from '@mui/material';

const contractTypes = ['Indefinido', 'Temporal'];

const ContractForm = ({ open, onClose, contract, employees, jobPositions, departments }) => {
  const [formData, setFormData] = useState({
    employee_id: '',
    job_position_id: '',
    agreed_salary: '',
    department_id: '',
    total_deductions: '',
    start_date: '',
    end_date: '',
    net_salary: '',
    contract_type: '',
  });

  useEffect(() => {
    if (contract) {
      setFormData(contract);
    } else {
      setFormData({
        employee_id: '',
        job_position_id: '',
        agreed_salary: '',
        department_id: '',
        total_deductions: '',
        start_date: '',
        end_date: '',
        net_salary: '',
        contract_type: '',
      });
    }
  }, [contract]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Validaciones básicas podrían añadirse aquí
    onClose(formData);
  };

  return (
    <Dialog open={open} onClose={() => onClose(null)} maxWidth="sm" fullWidth>
      <DialogTitle>{contract ? 'Edit Contract' : 'New Contract'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Employee"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              fullWidth
              required
            >
              {employees.map(emp => (
                <MenuItem key={emp.employee_id} value={emp.employee_id}>
                  {emp.first_name} {emp.last_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Job Position"
              name="job_position_id"
              value={formData.job_position_id}
              onChange={handleChange}
              fullWidth
              required
            >
              {jobPositions.map(jp => (
                <MenuItem key={jp.job_position_id} value={jp.job_position_id}>
                  {jp.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Agreed Salary"
              name="agreed_salary"
              type="number"
              value={formData.agreed_salary}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Department"
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              fullWidth
              required
            >
              {departments.map(dep => (
                <MenuItem key={dep.department_id} value={dep.department_id}>
                  {dep.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Deductions"
              name="total_deductions"
              type="number"
              value={formData.total_deductions}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Net Salary"
              name="net_salary"
              type="number"
              value={formData.net_salary}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              name="start_date"
              type="date"
              value={formData.start_date}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              name="end_date"
              type="date"
              value={formData.end_date}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Contract Type"
              name="contract_type"
              value={formData.contract_type}
              onChange={handleChange}
              fullWidth
              required
            >
              {contractTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {contract ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContractForm;