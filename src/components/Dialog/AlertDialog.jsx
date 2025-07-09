import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import React from "react";

export default function AlertDialog({ open, handleClose, children }) {
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#2a6496",
          borderRadius: "12px",
          padding: "16px",
          color: "white",
          width: "1000px",
        },
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        <Typography variant="h5">{children}</Typography>
      </DialogTitle>

      <DialogContent></DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
