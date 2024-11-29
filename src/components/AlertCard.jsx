import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { CheckCircle, Error, Warning } from "@mui/icons-material";

const AlertCard = ({
  type = "success", // "success", "error", "warning"
  title = "Are you sure?",
  description = "You will not be able to undo this action if you proceed!",
  onConfirm,
  onCancel,
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle color="success" fontSize="large" />;
      case "error":
        return <Error color="error" fontSize="large" />;
      case "warning":
        return <Warning color="warning" fontSize="large" />;
      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        textAlign: "center",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box>{getIcon()}</Box>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="outlined" onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={onConfirm} color={type}>
          Confirm
        </Button>
      </CardActions>
    </Card>
  );
};

export default AlertCard;
