import Box from "@mui/material/Box";
import AppsIcon from "@mui/icons-material/Apps";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as TrelloLogo } from "../../assets/mdi--trello.svg";
import Typography from "@mui/material/Typography";
import Workspace from "./Menus/Workspace";
import Recents from "./Menus/Recent";
import Started from "./Menus/Started";
import Templates from "./Menus/Templates";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profiles from "./Menus/Profiles";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import { useCallback, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { searchBoard } from "../../apis";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";

function AppBar() {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const fetchResults = async (query) => {
    try {
      const response = await searchBoard(query, userId);
      setResults(response);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  const debouncedFetchResults = useCallback(debounce(fetchResults, 500), []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedFetchResults(value);
  };

  console.log(results);

  return (
    <Box
      px={2}
      sx={{
        width: "100%",
        height: (theme) => theme.trello.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2c4e50" : "#1565c0",
      }}
    >
      {/* ------------Logo trello + MenuList---------------- */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AppsIcon sx={{ color: "white" }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <SvgIcon
            component={TrelloLogo}
            inheritViewBox
            sx={{ color: "white" }}
          />
          <Typography
            variant="span"
            color="initial"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Trello
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Workspace />
          <Recents />
          <Started />
          <Templates />
          <Button sx={{ color: "white" }} startIcon={<LibraryAddIcon />}>
            Create
          </Button>
        </Box>
      </Box>
      {/* ------------Mode option----------------- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          id="outlined-search"
          label="Search..."
          type="text"
          size="small"
          value={searchValue}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),

            endAdornment: (
              <CloseIcon
                fontSize="small"
                sx={{
                  color: searchValue ? "white" : "transparent",
                  cursor: "pointer",
                }}
                onClick={() => setSearchValue("")}
              />
            ),
          }}
          sx={{
            minWidth: "120px",
            maxWidth: "170px",
            "& label": { color: "white" },
            "& input": { color: "white" },
            "& label.Mui-focused": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
          }}
        />
        {/* <ModeSelect / */}
        {results && searchValue ? (
          <Box
            sx={{
              position: "absolute",
              width: "200px",

              backgroundColor: "white",
              top: "52px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              zIndex: "20",
            }}
          >
            {results?.map((item) => (
              <Box
                key={item._id}
                sx={{
                  padding: "12px",
                  "&:hover": { backgroundColor: "#eee", cursor: "pointer" },
                }}
                onClick={() => navigate(`/board/${item._id}`)}
              >
                <Typography
                  variant="h1"
                  color="initial"
                  sx={{ fontSize: "15px", fontWeight: "500" }}
                >
                  {item.title}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <></>
        )}
        {/* <Tooltip title="Notification">
          <Badge badgeContent={4} color="error" sx={{ cursor: "pointer" }}>
            <NotificationsNoneIcon sx={{ color: "white" }} />
          </Badge>
        </Tooltip> */}
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: "pointer", color: "white" }} />
        </Tooltip>
        <Profiles></Profiles>
      </Box>
    </Box>
  );
}

export default AppBar;
