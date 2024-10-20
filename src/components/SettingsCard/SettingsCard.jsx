// IMPORTS
import { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

import TextField from "@mui/material/TextField";
import { LuPhoneCall } from "react-icons/lu";
import { Grid, Box, Typography } from "@mui/material";
import { IoPersonOutline } from "react-icons/io5";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { BsGenderAmbiguous } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { MdWorkOutline } from "react-icons/md";

// APP
export default function SettingsCard({ user, handleOpenPopUpEidtInfo }) {
  // TAB STATES
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <Grid
            container
            spacing={8}
            sx={{ position: "relative", top: "56px" }}
          >
            <Grid
              item
              lg={4}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IoPersonOutline size={25} />
              <Typography
                variant="h6"
                color="initial"
                sx={{ fontWeight: "500" }}
              >
                Full Name
              </Typography>
              <Typography
                variant="body1"
                color="initial"
              >{`${user?.firstName} ${user?.lastName}`}</Typography>
            </Grid>

            <Grid
              item
              lg={4}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BsGenderAmbiguous size={25} />
              <Typography
                variant="h6"
                color="initial"
                sx={{ fontWeight: "500" }}
              >
                Gender
              </Typography>
              <Typography variant="body1" color="initial">
                {user?.gender ? `${user?.gender}` : "Trống"}
              </Typography>
            </Grid>

            <Grid
              item
              lg={4}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MdOutlineAlternateEmail size={25} />
              <Typography
                variant="h6"
                color="initial"
                sx={{ fontWeight: "500" }}
              >
                Email Address
              </Typography>
              <Typography
                variant="body1"
                color="initial"
              >{`${user?.email}`}</Typography>
            </Grid>

            <Grid
              item
              lg={4}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LuPhoneCall size={25} />
              <Typography
                variant="h6"
                color="initial"
                sx={{ fontWeight: "500" }}
              >
                Phone Number
              </Typography>
              <Typography variant="body1" color="initial">
                {user?.phone ? `${user?.phone}` : "Trống"}
              </Typography>
            </Grid>

            <Grid
              item
              lg={4}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MdWorkOutline size={25} />
              <Typography
                variant="h6"
                color="initial"
                sx={{ fontWeight: "500" }}
              >
                Job Title
              </Typography>
              <Typography variant="body1" color="initial">
                {user?.jobTitle ? `${user?.jobTitle}` : "Trống"}
              </Typography>
            </Grid>
          </Grid>
          <Button
            sx={{
              p: "1rem 2rem",
              my: 2,
              height: "3rem",
              position: "absolute",
              right: "52px",
              bottom: "-77px",
            }}
            component="button"
            size="large"
            variant="contained"
            color="secondary"
            onClick={handleOpenPopUpEidtInfo}
          >
            Edit
          </Button>
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
          >
            Save
          </Button>
        </Box>
      )}
    </Card>
  );
}
