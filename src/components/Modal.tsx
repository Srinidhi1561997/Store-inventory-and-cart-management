import { Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { setLoginStatus } from "../services/login/loginSlice";
import { setHomeScreen } from "../services/headerActions/headerActionsSlice";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface ModalProps {
  open: boolean;
  handleClose: () => void;
}
const SignOutModal: React.FC<ModalProps> = ({ open, handleClose }) => {
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
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(5px)",
      }}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to Exit?
        </Typography>
        <>
          <Button variant="text" onClick={handleClose}>
            <Typography
              variant="body2"
              sx={{ color: "#1976d2", cursor: "pointer" }}
            >
              Cancel
            </Typography>
          </Button>
          <Button variant="text" onClick={handleLogout}>
            <Typography
              variant="body2"
              sx={{ color: "#d32f2f", cursor: "pointer" }}
            >
              Yes
            </Typography>
          </Button>
        </>
      </Box>
    </Modal>
  );
};

export default SignOutModal;
