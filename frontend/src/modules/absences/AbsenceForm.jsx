import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid
} from '@mui/material';

const AbsenceForm = ({ open, onClose, absence, employees }) => {
  const [formData, setFormData] = useState({
    employee_id: '',
    absence_type: '',
    start_date: '',
    end_date: '',
    days_absent: '',
    total_absent_days: '',
  });

  useEffect(() => {
    if (absence) {
      setFormData({
        employee_id: absence.employee_id,
        absence_type: absence.absence_type,
        start_date: absence.start_date?.split('T')[0] || '',
        end_date: absence.end_date?.split('T')[0] || '',
        days_absent: absence.days_absent,
        total_absent_days: absence.total_absent_days,
      });
    } else {
      setFormData({
        employee_id: '',
        absence_type: '',
        start_date: '',
        end_date: '',
        days_absent: '',
        total_absent_days: '',
      });
    }
  }, [absence]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Se podrían hacer validaciones aquí
    onClose(formData);
  };

  return (
    <Dialog open={open} onClose={() => onClose(null)} maxWidth="sm" fullWidth>
      <DialogTitle>{absence ? 'Edit Absence' : 'New Absence'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              select
              label="Employee"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              fullWidth
              required
              SelectProps={{ native: true }}
            >
              <option value="" disabled>Select employee</option>
              {employees.map(e => (
                <option key={e.employee_id} value={e.employee_id}>
                  {`${e.first_name} ${e.last_name}`}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Absence Type"
              name="absence_type"
              value={formData.absence_type}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={6}>
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

          <Grid item xs={6}>
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

          <Grid item xs={6}>
            <TextField
              label="Days Absent"
              name="days_absent"
              type="number"
              value={formData.days_absent}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Total Absent Days"
              name="total_absent_days"
              type="number"
              value={formData.total_absent_days}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {absence ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AbsenceForm;