import CustomInput from "./CustomInput";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import { CiEdit } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { updateUserApi } from "../../apis";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/action/user";
const PopupEditInfo = ({ user, genderSelect, setOpenPopUpInfo }) => {
  const userId = localStorage.getItem("userId");
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [gender, setGender] = useState(user?.gender);
  const [phone, setPhone] = useState(user?.phone);
  const [email, setEmail] = useState(user?.email);
  const [jobTitle, setJobTitle] = useState(user?.jobTitle);
  const [department, setDepartment] = useState(user?.department);
  const [organization, setOrganization] = useState(user?.organization);
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataSend = {
      userId,
      firstName,
      lastName,
      gender,
      phone,
      email,
      jobTitle,
      department,
      organization,
    };
    try {
      await updateUserApi(dataSend);
      toast.success("Cập nhật thành công", {
        theme: "colored",
      });
      dispatch(loadUser());
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        theme: "colored",
      });
    }
  };
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 11,
        backgroundColor: "rgba(238, 238, 238, 0.7)",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {" "}
      <Container
        maxWidth="lg"
        sx={{
          borderRadius: "12px",
          backgroundColor: "white",
          paddingBottom: "20px",
          paddingTop: "12px",
          position: "relative",
        }}
      >
        <IconButton
          sx={{ position: "absolute", right: "12px" }}
          onClick={() => setOpenPopUpInfo(false)}
        >
          <IoMdClose></IoMdClose>
        </IconButton>
        <form onSubmit={handleSubmit}>
          <CardContent
            sx={{
              p: 3,
              textAlign: { xs: "center", md: "start" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              sx={{ marginBottom: "12px" }}
            >
              <CiEdit size={25} />
              <Typography
                variant="h6"
                color="initial"
                sx={{ fontWeight: "600" }}
              >
                Edit Infomation
              </Typography>
            </Box>
            {/* FIELDS */}
            <FormControl fullWidth>
              <Grid
                container
                direction={{ xs: "column", md: "row" }}
                columnSpacing={5}
                rowSpacing={3}
              >
                {/* ROW 1: FIRST NAME */}
                <Grid item xs={6}>
                  <CustomInput
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    title="First Name"
                  />
                </Grid>

                {/* ROW 1: LAST NAME */}
                <Grid item xs={6}>
                  <CustomInput
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    title="Last Name"
                  />
                </Grid>

                {/* ROW 2: GENDER */}
                <Grid item xs={6}>
                  <CustomInput
                    select
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    title="Gender"
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    title="Phone Number"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    title="Email Address"
                  />
                </Grid>

                <Grid item xs={6}>
                  <CustomInput
                    // id="firstName"
                    name="JobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    title="Job Title"
                  />
                </Grid>

                <Grid item xs={6}>
                  <CustomInput
                    // id="firstName"
                    name="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    title="Department"
                  />
                </Grid>

                <Grid item xs={6}>
                  <CustomInput
                    // id="firstName"
                    name="Organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    title="Organization"
                  />
                </Grid>

                {/* ROW 4: PASSWORD */}

                {/* BUTTON */}
              </Grid>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ width: "10%", p: 1, my: 2 }}
            >
              Update
            </Button>
          </CardContent>
        </form>
      </Container>
    </Box>
  );
};

export default PopupEditInfo;
