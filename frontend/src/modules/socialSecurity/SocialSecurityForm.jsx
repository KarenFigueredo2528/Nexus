import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid
} from '@mui/material';

const SocialSecurityForm = ({ open, onClose, socialSecurity, contracts = [] }) => {
  const [formData, setFormData] = useState({
    contract_id: '',
    registration_date: '',
    health_contribution: '',
    pension_contribution: '',
    risk_contribution: '',
    parafiscal_contribution: '',
  });

  useEffect(() => {
    if (socialSecurity) {
      setFormData({
        contract_id: socialSecurity.contract_id,
        registration_date: socialSecurity.registration_date?.split('T')[0] || '',
        health_contribution: socialSecurity.health_contribution,
        pension_contribution: socialSecurity.pension_contribution,
        risk_contribution: socialSecurity.risk_contribution,
        parafiscal_contribution: socialSecurity.parafiscal_contribution,
      });
    } else {
      setFormData({
        contract_id: '',
        registration_date: '',
        health_contribution: '',
        pension_contribution: '',
        risk_contribution: '',
        parafiscal_contribution: '',
      });
    }
  }, [socialSecurity]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Aquí podrían ir validaciones básicas de campos requeridos y numéricos
    onClose(formData);
  };

  return (
    <Dialog open={open} onClose={() => onClose(null)} maxWidth="sm" fullWidth>
      <DialogTitle>{socialSecurity ? 'Edit Social Security' : 'New Social Security'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              select
              label="Contract"
              name="contract_id"
              value={formData.contract_id}
              onChange={handleChange}
              fullWidth
              required
              SelectProps={{ native: true }}
            >
              <option value="" disabled>Select contract</option>
              {contracts.map(c => (
                <option key={c.contract_id} value={c.contract_id}>
                  {`ID ${c.contract_id} - Employee ID ${c.employee_id}`}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Registration Date"
              name="registration_date"
              type="date"
              value={formData.registration_date}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {[
            { label: 'Health Contribution', name: 'health_contribution' },
            { label: 'Pension Contribution', name: 'pension_contribution' },
            { label: 'Risk Contribution', name: 'risk_contribution' },
            { label: 'Parafiscal Contribution', name: 'parafiscal_contribution' }
          ].map(({ label, name }) => (
            <Grid item xs={12} key={name}>
              <TextField
                label={label}
                name={name}
                type="number"
                value={formData[name]}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ min: 0 }}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {socialSecurity ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SocialSecurityForm;