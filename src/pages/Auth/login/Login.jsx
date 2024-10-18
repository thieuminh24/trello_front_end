// import React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_ROOT } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { loadUser } from "../../../redux/action/user";
import "react-toastify/dist/ReactToastify.css";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post(
        `${API_ROOT}/v1/user/login`,
        data, // Gửi thông tin đăng nhập
        { withCredentials: true } // Thêm tùy chọn này để gửi cookie
      );
      localStorage.setItem("userId", response?.data?.userId);
      toast.success(response?.data?.message, {
        theme: "colored",
      });
      dispatch(loadUser());
      navigate("/workSpace");
      // window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchVerify = async () => {
    try {
      await axios.get(`${API_ROOT}/v1/user/protected`, {
        withCredentials: true,
      });
      setIsLogin(true);
    } catch (error) {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    fetchVerify();
  }, []);

  if (isLogin) {
    return navigate("/workSpace");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{
            m: 1,
            // bgcolor: "secondary.main",
            height: "100px",
            width: "250px",
            objectFit: "cover",
          }}
          src="https://1000logos.net/wp-content/uploads/2021/05/Trello-logo.png"
        />
        {/* <LockOutlinedIcon /> */}

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Remember me"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register" variant="body2">
                Dont have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
