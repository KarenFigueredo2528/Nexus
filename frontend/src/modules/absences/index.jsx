import React, { useState, useEffect } from 'react';
import {
  Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  CircularProgress, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';

import {
  fetchAbsences,
  createAbsence,
  updateAbsence,
  deleteAbsence
} from './absenceAPI';

import AbsenceForm from './AbsenceForm';

const Absence = ({ employees }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    setLoading(true);
    fetchAbsences()
      .then(res => setItems(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setOpenForm(true);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    deleteAbsence(itemToDelete.absence_id)
      .then(() => {
        setOpenDeleteDialog(false);
        setItemToDelete(null);
        loadItems();
      })
      .catch(console.error);
  };

  const handleFormClose = (savedItem) => {
    setOpenForm(false);
    setEditingItem(null);
    if (savedItem) {
      if (editingItem) {
        updateAbsence(editingItem.absence_id, savedItem)
          .then(loadItems)
          .catch(console.error);
      } else {
        createAbsence(savedItem)
          .then(loadItems)
          .catch(console.error);
      }
    }
  };

  const getEmployeeName = (id) => {
    const emp = employees.find(e => e.employee_id === id);
    return emp ? `${emp.first_name} ${emp.last_name}` : `ID ${id}`;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Absences</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenForm(true)} sx={{ mb: 2 }}>
        Add Absence
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Absence ID</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.absence_id}>
                  <TableCell>{item.absence_id}</TableCell>
                  <TableCell>{getEmployeeName(item.employee_id)}</TableCell>
                  <TableCell>{item.absence_type}</TableCell>
                  <TableCell>{new Date(item.start_date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(item.end_date).toLocaleDateString()}</TableCell>
                  <TableCell>{item.days_absent}</TableCell>
                  <TableCell>{item.total_absent_days}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => handleDeleteClick(item)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <AbsenceForm
        open={openForm}
        onClose={handleFormClose}
        absence={editingItem}
        employees={employees}
      />

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Absence</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this absence record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Absence;