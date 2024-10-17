import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";

export const ProtectedPage = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading === false) {
    if (isAuthenticated === false) {
      toast.warning("Vui lòng đăng nhập");
      navigate("/login");
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100vw",
          height: "100vh",
        }}
      >
        <Loader />
      </Box>
    );
  }

  return children; // Nếu người dùng đã xác thực, hiển thị nội dung
};
