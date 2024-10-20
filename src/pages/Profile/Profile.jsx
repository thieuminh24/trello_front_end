// import "./styles.css";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import SettingsCard from "../../components/SettingsCard/SettingsCard";
import { useSelector } from "react-redux";
import PopupSettingCard from "../../components/SettingsCard/PopupEditInfo";

// STYLE & THEME
const theme = createTheme();

// APP
export default function Profile() {
  const { user, loading } = useSelector((state) => state.user);

  const [openPopUpInfo, setOpenPopUpInfo] = useState(false);

  const handleOpenPopUpEidtInfo = () => {
    setOpenPopUpInfo(true);
  };

  // const changeField = (event) => {
  //   setUser({ ...user, [event.target.name]: event.target.value });
  // };
  // GENDER SELECT STATES
  const genderSelect = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        {openPopUpInfo && (
          <PopupSettingCard
            user={user}
            genderSelect={genderSelect}
            setOpenPopUpInfo={setOpenPopUpInfo}
          />
        )}

        {/* BACKGROUND */}
        <Grid container direction="column" sx={{ overflowX: "hidden" }}>
          <Grid item xs={12} md={6}>
            <img
              alt="avatar"
              style={{
                width: "100vw",
                height: "35vh",
                objectFit: "cover",
                objectPosition: "50% 50%",
                position: "relative",
              }}
              src="https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_1280.png"
            />
          </Grid>

          {/* COMPONENTS */}
          <Grid
            container
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            sx={{
              position: "absolute",
              top: "20vh",
              px: { xs: 0, md: 7 },
            }}
          >
            {/* PROFILE CARD */}
            <Grid item md={3}>
              <ProfileCard user={user} name={fullName}></ProfileCard>
            </Grid>

            {/* SETTINGS CARD */}
            <Grid item md={9}>
              <SettingsCard
                handleOpenPopUpEidtInfo={handleOpenPopUpEidtInfo}
                user={user}
              ></SettingsCard>
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </ThemeProvider>
  );
}
