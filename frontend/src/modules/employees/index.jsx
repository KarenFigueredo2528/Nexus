import React, { useEffect, useState } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { fetchEmployees, deleteEmployee } from './employeesAPI';
import EmployeeForm from './EmployeeForm'; // Aquí importaremos el formulario

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    setLoading(true);
    fetchEmployees()
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setOpenForm(true);
  };

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    deleteEmployee(employeeToDelete.employee_id)
      .then(() => {
        setOpenDeleteDialog(false);
        setEmployeeToDelete(null);
        loadEmployees();
      })
      .catch(err => console.error(err));
  };

  const handleFormClose = (saved) => {
    setOpenForm(false);
    setEditingEmployee(null);
    if (saved) loadEmployees();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Employee Management</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenForm(true)} sx={{ mb: 2 }}>
        Add Employee
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Identification</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Hire Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell> {/* Nueva columna */}
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map(emp => (
                <TableRow key={emp.employee_id}>
                  <TableCell>{emp.first_name}</TableCell>
                  <TableCell>{emp.last_name}</TableCell>
                  <TableCell>{emp.identification}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.phone}</TableCell>
                  <TableCell>{new Date(emp.hire_date).toLocaleDateString()}</TableCell>
                  <TableCell>{emp.status}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" onClick={() => handleEdit(emp)} sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" size="small" onClick={() => handleDeleteClick(emp)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Formulario para crear/editar */}
      {openForm && (
        <EmployeeForm
          open={openForm}
          onClose={handleFormClose}
          employee={editingEmployee}
        />
      )}

      {/* Dialogo Confirmar eliminación */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete employee {employeeToDelete?.first_name} {employeeToDelete?.last_name}?
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

export default Employees;