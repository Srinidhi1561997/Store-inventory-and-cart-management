import { Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { setLoginStatus } from "../services/login/loginSlice";
import { setHomeScreen } from "../services/headerActions/headerActionsSlice";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  modalOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(5px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    maxWidth: 400,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    outline: "none",
    textAlign: "center",
  },
  cancelButton: {
    color: "#1976d2",
    cursor: "pointer",
  },
  yesButton: {
    color: "#d32f2f",
    cursor: "pointer",
  },
  buttonGroup: {
    marginTop: 16,
    display: "flex",
    justifyContent: "space-evenly",
  },
});

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}
const SignOutModal: React.FC<ModalProps> = ({ open, handleClose }) => {
   const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLoginStatus(false));
    dispatch(setHomeScreen(false));
    localStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={classes.modalOverlay}
    >
      <Box className={classes.modalBox}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to Exit?
        </Typography>

        <div className={classes.buttonGroup}>
          <Button variant="text" onClick={handleClose}>
            <Typography variant="body2" className={classes.cancelButton}>
              Cancel
            </Typography>
          </Button>
          <Button variant="text" onClick={handleLogout}>
            <Typography variant="body2" className={classes.yesButton}>
              Yes
            </Typography>
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default SignOutModal;
