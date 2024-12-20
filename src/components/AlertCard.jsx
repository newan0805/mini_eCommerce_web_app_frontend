import React, { useEffect } from "react";
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
  show,
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

  useEffect(() => {
    if (show) {
    //   document.body.style.backdropFilter = "blur(2.5px)";
    //   document.body.style.zIndex = 1;
    } else {
      document.body.style.filter = "none";
    }
  }, [show]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: 400,
        mx: "auto",
        p: 3,
        textAlign: "center",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "white",
        // filter: "blur(5px)",
        zIndex: 1300, // Ensure the alert is above everything else
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
    </Box>
  );
};

export default AlertCard;
