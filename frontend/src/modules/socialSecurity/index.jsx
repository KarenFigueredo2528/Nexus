import React, { useState, useEffect } from 'react';
import {
  Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  CircularProgress, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import SocialSecurityForm from './SocialSecurityForm';
import {
  fetchSocialSecurity,
  createSocialSecurity,
  updateSocialSecurity,
  deleteSocialSecurity
} from './socialSecurityAPI';


const SocialSecurity = ({ contracts }) => {
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
    fetchSocialSecurity()
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
    deleteSocialSecurity(itemToDelete.security_id)
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
      if (savedItem.security_id) {
        updateSocialSecurity(savedItem.security_id, savedItem)
          .then(loadItems)
          .catch(console.error);
      } else {
        createSocialSecurity(savedItem)
          .then(loadItems)
          .catch(console.error);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Social Security Management</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenForm(true)} sx={{ mb: 2 }}>
        Add Social Security Record
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Security ID</TableCell>
                <TableCell>Contract ID</TableCell>
                <TableCell>Registration Date</TableCell>
                <TableCell>Health Contribution</TableCell>
                <TableCell>Pension Contribution</TableCell>
                <TableCell>Risk Contribution</TableCell>
                <TableCell>Parafiscal Contribution</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.security_id}>
                  <TableCell>{item.security_id}</TableCell>
                  <TableCell>{item.contract_id}</TableCell>
                  <TableCell>{new Date(item.registration_date).toLocaleDateString()}</TableCell>
                  <TableCell>{item.health_contribution}</TableCell>
                  <TableCell>{item.pension_contribution}</TableCell>
                  <TableCell>{item.risk_contribution}</TableCell>
                  <TableCell>{item.parafiscal_contribution}</TableCell>
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

      <SocialSecurityForm
        open={openForm}
        onClose={handleFormClose}
        socialSecurity={editingItem}
        contracts={contracts}
      />

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Social Security Record</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this social security record?
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

export default SocialSecurity;