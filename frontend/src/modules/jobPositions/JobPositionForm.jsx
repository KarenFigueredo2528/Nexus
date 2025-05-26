import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { createJobPosition, updateJobPosition } from './jobPositionsAPI';

const JobPositionForm = ({ open, onClose, jobPosition }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    base_salary: '',
  });

  useEffect(() => {
    if (jobPosition) {
      setFormData(jobPosition);
    } else {
      setFormData({ title: '', description: '', base_salary: '' });
    }
  }, [jobPosition]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const payload = { ...formData, base_salary: parseFloat(formData.base_salary) };
    const action = jobPosition ? updateJobPosition(jobPosition.job_position_id, payload) : createJobPosition(payload);
    
    action
      .then(() => onClose(true))
      .catch(err => {
        console.error(err);
        onClose(false);
      });
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} fullWidth>
      <DialogTitle>{jobPosition ? 'Edit Job Position' : 'Add Job Position'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Base Salary"
          name="base_salary"
          type="number"
          value={formData.base_salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {jobPosition ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobPositionForm;