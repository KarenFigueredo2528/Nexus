import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from '@mui/material';
import { createPayroll, updatePayroll } from './payrollAPI';

const statusOptions = ['Pending', 'Paid', 'Cancelled'];

const PayrollForm = ({ open, onClose, payroll }) => {
  const [formData, setFormData] = useState({
    contract_id: '',
    payment_date: '',
    period: '',
    total_earnings: '',
    total_deductions: '',
    net_salary: '',
    status: '',
  });

  useEffect(() => {
    if (payroll) {
      setFormData({
        contract_id: payroll.contract_id || '',
        payment_date: payroll.payment_date ? payroll.payment_date.split('T')[0] : '',
        period: payroll.period || '',
        total_earnings: payroll.total_earnings || '',
        total_deductions: payroll.total_deductions || '',
        net_salary: payroll.net_salary || '',
        status: payroll.status || '',
      });
    } else {
      setFormData({
        contract_id: '',
        payment_date: '',
        period: '',
        total_earnings: '',
        total_deductions: '',
        net_salary: '',
        status: '',
      });
    }
  }, [payroll]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Para números permitir sólo números y puntos
    if (
      ['total_earnings', 'total_deductions', 'net_salary'].includes(name) &&
      value !== '' &&
      !/^\d*\.?\d*$/.test(value)
    ) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (payroll) {
        await updatePayroll(payroll.payroll_id, formData);
      } else {
        await createPayroll(formData);
      }
      onClose(true);
    } catch (error) {
      console.error('Error saving payroll:', error);
      onClose(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
      <DialogTitle>{payroll ? 'Edit Payroll' : 'Add Payroll'}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Contract ID"
            name="contract_id"
            value={formData.contract_id}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Payment Date"
            name="payment_date"
            type="date"
            value={formData.payment_date}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Period"
            name="period"
            value={formData.period}
            onChange={handleChange}
            fullWidth
            required
            placeholder="e.g. 2023-05"
          />
          <TextField
            label="Total Earnings"
            name="total_earnings"
            value={formData.total_earnings}
            onChange={handleChange}
            fullWidth
            required
            inputMode="decimal"
          />
          <TextField
            label="Total Deductions"
            name="total_deductions"
            value={formData.total_deductions}
            onChange={handleChange}
            fullWidth
            required
            inputMode="decimal"
          />
          <TextField
            label="Net Salary"
            name="net_salary"
            value={formData.net_salary}
            onChange={handleChange}
            fullWidth
            required
            inputMode="decimal"
          />
          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
            required
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {payroll ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PayrollForm;