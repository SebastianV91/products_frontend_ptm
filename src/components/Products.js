import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Paper, Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Products() {

    function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

    const [products, setProducts] = useState(null)

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
              <TableCell align="right">{product.cantidadStock}</TableCell>
            </TableRow>
            )): (<div>Loading... </div>)}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>

  )



}
