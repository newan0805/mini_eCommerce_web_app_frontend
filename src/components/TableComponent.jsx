import React from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Star } from "@mui/icons-material";
const TableComponent = ({ filteredProducts }) => {
  return (
    <TableContainer sx={{ bgcolor: "#fff" }}>
      {" "}
      <Table>
        {" "}
        <TableHead>
          {" "}
          <TableRow>
            {" "}
            <TableCell>SKU</TableCell> <TableCell>IMAGE</TableCell>{" "}
            <TableCell>PRODUCT NAME</TableCell> <TableCell>PRICE</TableCell>{" "}
            <TableCell align="center">ACTIONS</TableCell>{" "}
          </TableRow>{" "}
        </TableHead>{" "}
        <TableBody>
          {" "}
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <TableRow key={product._id}>
                {" "}
                <TableCell>
                  {" "}
                  <Link
                    to={`/products/${product._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {" "}
                    {product.sku}{" "}
                  </Link>{" "}
                </TableCell>{" "}
                <TableCell>
                  {" "}
                  <img
                    src={
                      product.images.find((img) => img.isThumbnail)
                        ? product.images.find((img) => img.isThumbnail).url
                        : product.images[0].url
                    }
                    alt={product.name}
                    style={{
                      width: 50,
                      height: 50,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />{" "}
                </TableCell>{" "}
                <TableCell>{product.name}</TableCell>{" "}
                <TableCell>${product.price}</TableCell>{" "}
                <TableCell align="center">
                  {" "}
                  <IconButton color="primary">
                    {" "}
                    <DeleteIcon />{" "}
                  </IconButton>{" "}
                  <IconButton color="primary">
                    {" "}
                    <EditIcon />{" "}
                  </IconButton>{" "}
                  <IconButton color="primary">
                    {" "}
                    <Star />{" "}
                  </IconButton>{" "}
                </TableCell>{" "}
              </TableRow>
            ))
          ) : (
            <TableRow>
              {" "}
              <TableCell colSpan={5} align="center">
                {" "}
                No products found{" "}
              </TableCell>{" "}
            </TableRow>
          )}{" "}
        </TableBody>{" "}
      </Table>{" "}
    </TableContainer>
  );
};

export default TableComponent;
