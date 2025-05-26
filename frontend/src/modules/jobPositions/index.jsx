import React, { useEffect, useState } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { fetchJobPositions, deleteJobPosition } from './jobPositionsAPI';
import JobPositionForm from './JobPositionForm';

const JobPositions = () => {
  const [jobPositions, setJobPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    loadJobPositions();
  }, []);

  const loadJobPositions = () => {
    setLoading(true);
    fetchJobPositions()
      .then(res => setJobPositions(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleEdit = (jp) => {
    setEditing(jp);
    setOpenForm(true);
  };

  const handleDelete = () => {
    deleteJobPosition(toDelete.job_position_id)
      .then(() => {
        setConfirmDelete(false);
        setToDelete(null);
        loadJobPositions();
      })
      .catch(err => console.error(err));
  };

  const handleFormClose = (saved) => {
    setOpenForm(false);
    setEditing(null);
    if (saved) loadJobPositions();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Job Positions</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenForm(true)} sx={{ mb: 2 }}>
        Add Job Position
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Base Salary</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobPositions.map((jp) => (
                <TableRow key={jp.job_position_id}>
                  <TableCell>{jp.title}</TableCell>
                  <TableCell>{jp.description}</TableCell>
                  <TableCell>${typeof jp.base_salary === 'number'
                    ? jp.base_salary.toFixed(2)
                    : parseFloat(jp.base_salary)?.toFixed?.(2) || 'N/A'}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" onClick={() => handleEdit(jp)} sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" size="small" onClick={() => {
                      setToDelete(jp);
                      setConfirmDelete(true);
                    }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <JobPositionForm
        open={openForm}
        onClose={handleFormClose}
        jobPosition={editing}
      />

      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the job position "{toDelete?.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobPositions;