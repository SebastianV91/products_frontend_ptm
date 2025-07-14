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

export default function Products() {

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')

    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [newProduct, setNewProduct] = useState({
      id: '',
      nombre: '',
      descripcion: '',
      precio: '',
      cantidadStock: ''
    })

    const handleChange = (e) => {
      setNewProduct({...newProduct, [e.target.name]: e.target.value});
    }

    const handleConfirmOpen = (id) => {
      setDeleteId(id)
      setConfirmOpen(true)
    }

    const handleConfirmClose = (id) => {
      setDeleteId(null)
      setConfirmOpen(false)
    }

    const handleClickOpen = () => {
      setOpen(true)
    } 

    const handleClose = () => {
      setOpen(false)
    }

    const handleDelete = async (id)  => {
     setSnackbarOpen(true)
      try {
          await axios.delete(`http://localhost:8084/product/${id}`);
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

    const handleAddProduct = async () => {
      try {
        const response = await axios.post('http://localhost:8084/products', {
            ...newProduct,
            price: parseFloat(newProduct.price)
        });
        setProducts([...products, response.data])
        setNewProduct({
          nombre: '',
          descripcion: '',
          precio: '',
          cantidadStock: ''
        });
        handleClose();
      }catch (error){
        console.log('¡Este fue un error agregando el producto!', error)
      }
    }

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

      <Box display="flex" justifyContent="flex-start">
        <Button variant='contained' onClick={handleClickOpen}>AGREGAR NUEVO PRODUCTO</Button>
      </Box>

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
              <TableCell align="left">{product.descripcion}</TableCell>
              <TableCell align="center">{product.precio}</TableCell>
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

      {/* Dialogo Modal para agregar nuevo producto */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>AGREGAR NUEVO PRODUCTO</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="nombre"
            label="NOMBRE DEL PRODUCTO"
            type="text"
            fullWidth
            value={newProduct.nombre}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="descripcion"
            label="DESCRIPCION"
            type="text"
            fullWidth
            value={newProduct.descripcion}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="precio"
            label="PRECIO"
            type="text"
            fullWidth
            value={newProduct.precio}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="cantidadStock"
            label="CANTIDAD EN EL STOCK"
            type="text"
            fullWidth
            value={newProduct.cantidadStock}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary" variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

    </Box>

  )



}
