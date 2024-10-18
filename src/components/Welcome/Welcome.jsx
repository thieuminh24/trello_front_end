import React from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(8, 0),
  textAlign: "center",
}));

const FeatureSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MyApp
          </Typography>
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to MyApp
          </Typography>
          <Typography variant="h5" paragraph>
            Build your dream project with ease using our platform.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Get Started
          </Button>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <FeatureSection>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={4}>
            {/* Feature 1 */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Feature One
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </Paper>
            </Grid>

            {/* Feature 2 */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Feature Two
                </Typography>
                <Typography>
                  Curabitur ac felis arcu sadips ipsums fugiats nemis.
                </Typography>
              </Paper>
            </Grid>

            {/* Feature 3 */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Feature Three
                </Typography>
                <Typography>
                  Pellentesque tincidunt vehicula purus, nec varius erat.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </FeatureSection>
    </>
  );
};

export default Welcome;
