import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { fetchPayrolls, deletePayroll } from './payrollAPI';
import PayrollForm from './PayrollForm';

const Payroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editingPayroll, setEditingPayroll] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [payrollToDelete, setPayrollToDelete] = useState(null);

  useEffect(() => {
    loadPayrolls();
  }, []);

  const loadPayrolls = () => {
    setLoading(true);
    fetchPayrolls()
      .then(res => setPayrolls(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleEdit = (payroll) => {
    setEditingPayroll(payroll);
    setOpenForm(true);
  };

  const handleDeleteClick = (payroll) => {
    setPayrollToDelete(payroll);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    deletePayroll(payrollToDelete.payroll_id)
      .then(() => {
        setOpenDeleteDialog(false);
        setPayrollToDelete(null);
        loadPayrolls();
      })
      .catch(err => console.error(err));
  };

  const handleFormClose = (saved) => {
    setOpenForm(false);
    setEditingPayroll(null);
    if (saved) loadPayrolls();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payroll Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenForm(true)} sx={{ mb: 2 }}>
        Add Payroll
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Contract ID</TableCell>
                <TableCell>Payment Date</TableCell>
                <TableCell>Period</TableCell>
                <TableCell>Total Earnings</TableCell>
                <TableCell>Total Deductions</TableCell>
                <TableCell>Net Salary</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {payrolls.map((p) => (
                <TableRow key={p.payroll_id}>
                  <TableCell>{p.contract_id}</TableCell>
                  <TableCell>{new Date(p.payment_date).toLocaleDateString()}</TableCell>
                  <TableCell>{p.period}</TableCell>
                  <TableCell>{p.total_earnings}</TableCell>
                  <TableCell>{p.total_deductions}</TableCell>
                  <TableCell>{p.net_salary}</TableCell>
                  <TableCell>{p.status}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" onClick={() => handleEdit(p)} sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" size="small" onClick={() => handleDeleteClick(p)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      
      {openForm && (
        <PayrollForm
          open={openForm}
          onClose={handleFormClose}
          payroll={editingPayroll}
        />
      )}

      {/* Dialogo Confirmar eliminación */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete payroll record for contract ID {payrollToDelete?.contract_id}?
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

export default Payroll;