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

const TableComponent = ({ filteredProducts, onDelete }) => {
  return (
    <TableContainer sx={{ bgcolor: "#fff" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "#001EB9" }}>
              SKU
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#001EB9" }}>
              IMAGE
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#001EB9" }}>
              PRODUCT NAME
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#001EB9" }}>
              PRICE
            </TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell sx={{ color: "#969191" }}>
                  <Link
                    to={`/products/${product._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    #{product.sku}
                  </Link>
                </TableCell>
                <TableCell>
                  <img
                    src={
                      product.images?.find((img) => img.isThumbnail)?.path
                        ? `http://localhost:5000${
                            product.images.find((img) => img.isThumbnail).path
                          }`
                        : `http://localhost:5000${
                            product.images?.[0]?.path || ""
                          }`
                    }
                    alt={product.name}
                    style={{
                      width: 50,
                      height: 50,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell align="center">
                  <IconButton color="error" onClick={() => onDelete(product)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <Star />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
