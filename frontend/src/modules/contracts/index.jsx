import React, { useState, useEffect } from 'react';
import {
  Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  CircularProgress, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';

import {
  fetchContracts,
  createContract,
  updateContract,
  deleteContract
} from './contractsAPI';

import ContractForm from './ContractForm';

const Contracts = ({ employees = [], jobPositions = [], departments = []}) => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [contractToDelete, setContractToDelete] = useState(null);

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = () => {
    setLoading(true);
    fetchContracts()
      .then(res => setContracts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleEdit = (contract) => {
    setEditingContract(contract);
    setOpenForm(true);
  };

  const handleDeleteClick = (contract) => {
    setContractToDelete(contract);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    deleteContract(contractToDelete.contract_id) // asumo que tu contrato tiene un id único, ajusta si es otro campo
      .then(() => {
        setOpenDeleteDialog(false);
        setContractToDelete(null);
        loadContracts();
      })
      .catch(console.error);
  };

  const handleFormClose = (savedContract) => {
    setOpenForm(false);
    setEditingContract(null);
    if (savedContract) {
      if (savedContract.contract_id) {
        updateContract(savedContract.contract_id, savedContract)
          .then(loadContracts)
          .catch(console.error);
      } else {
        createContract(savedContract)
          .then(loadContracts)
          .catch(console.error);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Contract Management</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenForm(true)} sx={{ mb: 2 }}>
        Add Contract
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>Job Position</TableCell>
                <TableCell>Agreed Salary</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Total Deductions</TableCell>
                <TableCell>Net Salary</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Contract Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { contracts.map(contract => (
                <TableRow key={contract.contract_id}>
                  <TableCell>{employees.find(e => e.employee_id === contract.employee_id)?.first_name} {employees.find(e => e.employee_id === contract.employee_id)?.last_name}</TableCell>
                  <TableCell>{jobPositions.find(j => j.job_position_id === contract.job_position_id)?.title}</TableCell>
                  <TableCell>{contract.agreed_salary}</TableCell>
                  <TableCell>{departments.find(d => d.department_id === contract.department_id)?.name}</TableCell>
                  <TableCell>{contract.total_deductions}</TableCell>
                  <TableCell>{contract.net_salary}</TableCell>
                  <TableCell>{new Date(contract.start_date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(contract.end_date).toLocaleDateString()}</TableCell>
                  <TableCell>{contract.contract_type}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleEdit(contract)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => handleDeleteClick(contract)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <ContractForm
        open={openForm}
        onClose={handleFormClose}
        contract={editingContract}
        employees={employees}
        jobPositions={jobPositions}
        departments={departments}
      />

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Contract</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this contract?
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

export default Contracts;