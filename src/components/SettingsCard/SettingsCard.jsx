// IMPORTS
import React, { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";

import { Grid, Box, IconButton, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomInput from "./CustomInput";
import { TextFields, Visibility, VisibilityOff } from "@mui/icons-material";

// APP
export default function SettingsCard(props) {
  // TAB STATES
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // GENDER SELECT STATES
  const genderSelect = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  // FORM STATES
  const [user, setUser] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
    gender: props.gender,
    email: props.email,
    phone: props.phone,
  });

  const changeField = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // BUTTON STATES
  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: true,
  });

  // EDIT -> UPDATE
  const changeButton = (event) => {
    event.preventDefault();
    user.showPassword = false;
    edit.disabled = !edit.disabled;
    edit.isEdit = !edit.isEdit;
    update({ ...edit });
    console.log("user: ", user);
  };

  // TOGGLE PASSWORD VISIBILITY
  const handlePassword = () => {
    user.showPassword = !user.showPassword;
    setUser({ ...user });
  };

  // RETURN
  return (
    <Card variant="outlined" sx={{ height: "100%", width: "100%" }}>
      {/* TABS */}
      <br />

      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value="1" label="Profile and visibility" />
        <Tab value="2" label="Security" />
      </Tabs>
      <Divider />

      {/* MAIN CONTENT CONTAINER */}
      {value === "1" ? (
        <>
          <form>
            <CardContent
              sx={{
                p: 3,
                maxHeight: { md: "40vh" },
                textAlign: { xs: "center", md: "start" },
              }}
            >
              {/* FIELDS */}
              <FormControl fullWidth>
                <Grid
                  container
                  direction={{ xs: "column", md: "row" }}
                  columnSpacing={5}
                  rowSpacing={3}
                >
                  {/* ROW 1: FIRST NAME */}
                  <Grid component="form" item xs={6}>
                    <CustomInput
                      id="firstName"
                      name="firstName"
                      value={user.firstName}
                      onChange={changeField}
                      title="First Name"
                      dis={edit.disabled}
                      req={edit.required}
                    />
                  </Grid>

                  {/* ROW 1: LAST NAME */}
                  <Grid component="form" item xs={6}>
                    <CustomInput
                      id="lastName"
                      name="lastName"
                      value={user.lastName}
                      onChange={changeField}
                      title="Last Name"
                      dis={edit.disabled}
                      req={edit.required}
                    />
                  </Grid>

                  {/* ROW 2: GENDER */}
                  <Grid item xs={6}>
                    <CustomInput
                      select
                      id="gender"
                      name="gender"
                      value={user.gender}
                      onChange={changeField}
                      title="Gender"
                      dis={edit.disabled}
                      req={edit.required}
                      content={genderSelect.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    />
                  </Grid>

                  {/* ROW 3: PHONE */}
                  <Grid item xs={6}>
                    <CustomInput
                      id="phone"
                      name="phone"
                      value={user.phone}
                      onChange={changeField}
                      title="Phone Number"
                      dis={edit.disabled}
                      req={edit.required}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">84+</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  {/* ROW 3: EMAIL */}
                  <Grid item xs={6}>
                    <CustomInput
                      type="email"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={changeField}
                      title="Email Address"
                      dis={edit.disabled}
                      req={edit.required}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <CustomInput
                      // id="firstName"
                      name="JobTitle"
                      // value={user.firstName}
                      onChange={changeField}
                      title="Job Title"
                      dis={edit.disabled}
                      req={edit.required}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <CustomInput
                      // id="firstName"
                      name="Department"
                      // value={user.firstName}
                      onChange={changeField}
                      title="Department"
                      dis={edit.disabled}
                      req={edit.required}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <CustomInput
                      // id="firstName"
                      name="Organization"
                      // value={user.firstName}
                      onChange={changeField}
                      title="Organization"
                      dis={edit.disabled}
                      req={edit.required}
                    />
                  </Grid>

                  {/* ROW 4: PASSWORD */}

                  {/* BUTTON */}
                </Grid>
              </FormControl>
            </CardContent>
          </form>
          <Grid
            container
            justifyContent={{ xs: "center", md: "flex-end" }}
            item
            xs={6}
          >
            <Button
              sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
              component="button"
              size="large"
              variant="contained"
              color="secondary"
              onClick={changeButton}
            >
              {edit.isEdit === false ? "UPDATE" : "EDIT"}
            </Button>
          </Grid>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            paddingX: "200px",
            paddingY: "30px",
          }}
        >
          <Typography variant="h5" color="initial" sx={{ fontWeight: "600" }}>
            Change your password
          </Typography>
          <Box sx={{ width: "100%" }}>
            <label htmlFor="">Current Password</label>
            <TextField
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <label htmlFor="">New Password</label>
            <TextField
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Box>
          <Button
            sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
            component="button"
            size="large"
            variant="contained"
            color="secondary"
            onClick={changeButton}
          >
            Save
          </Button>
        </Box>
      )}
    </Card>
  );
}
