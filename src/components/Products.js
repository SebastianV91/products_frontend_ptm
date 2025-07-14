import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    Snackbar,
    Alert,
    Card} 
    from '@mui/material'
import { Paper, Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import axiosInstance from '../axiosConfig';

export default function Products() {

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')

    const [products, setProducts] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)

    const handleConfirmOpen = (id) => {
      setDeleteId(id)
      setConfirmOpen(true)
    }

    const handleConfirmClose = (id) => {
      setDeleteId(null)
      setConfirmOpen(false)
    }

    const handleDelete = async (id)  => {
     setSnackbarOpen(true)
      try {
          await axiosInstance.delete(`http://localhost:8084/product/${id}`);
          setProducts(products.filter(product => product.id !== id));

          setSnackbarMessage("¡El Producto fue eliminado exitosamente!")
          setSnackbarSeverity("success")

          handleConfirmClose()
      } catch (error) {
          console.log('Ocurrio un error al eliminar el producto: ', error);
          setSnackbarMessage("Un error ocurrio al intentar eliminar el producto.")
          setSnackbarSeverity("warning")
      }
    };

    useEffect(() => {
        axios.get('http://localhost:8084/products').then(response => {
            setProducts(response.data)
            console.log(response.data)
        })
    }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="20%"
      padding="2rem"
      border="ActiveBorder"
      fullWidth
    >
    <TableContainer component={Paper} style={{width:'70%'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">NOMBRE</TableCell>
            <TableCell align="right">DESCRIPCION</TableCell>
            <TableCell align="right">PRECIO</TableCell>
            <TableCell align="right">CANTIDAD EN STOCK</TableCell>
            <TableCell align="right">ACCIONES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {products !== null? products.map((product, index) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{product.id}</TableCell>
              <TableCell align="right">{product.nombre}</TableCell>
              <TableCell align="right">{product.descripcion}</TableCell>
              <TableCell align="right">{product.precio}</TableCell>
              <TableCell align="center">{product.cantidadStock}</TableCell>
              <TableCell align='center'>
                  <IconButton color='secondary' onClick={() => handleConfirmOpen(product.id)}>
                      <DeleteIcon/>
                  </IconButton>
                  <IconButton color='secondary'>
                      <EditIcon/>
                  </IconButton>
              </TableCell>
            </TableRow>
            )): (<div>Loading... </div>)}
        </TableBody>
      </Table>
    </TableContainer>

     {/* Dialogo de confirmación para eliminacion */}
      <Dialog open={confirmOpen}
        style={{ width: '600px', maxWidth: '600px' }} // Custom width 
        onClose={handleConfirmClose}>
        <DialogTitle>Confirmar Eliminacion</DialogTitle>
        <DialogContent>
          ¿Estas seguro que quieres eliminar este producto?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleDelete(deleteId);
            }}
            color="secondary"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

    </Box>

  )



}
