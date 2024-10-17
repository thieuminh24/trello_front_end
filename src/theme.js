// import { createTheme } from "@mui/material/styles";

import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
const APP_BAR_HEIGHT = "58px";
const BROAD_BAR_HEIGHT = "56px";
const BROAD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BROAD_BAR_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";
// Create a theme instance.
const theme = extendTheme({
  // Custom thêm (chiều cao)
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    broadBarHeight: BROAD_BAR_HEIGHT,
    broadContentHeight: BROAD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
  },
  // Custom màu sắc
  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: teal,
    //     secondary: deepOrange,
    //   },
    // },
    // dark: {
    //   palette: {
    //     primary: cyan,
    //     secondary: orange,
    //   },
    // },
  },

  // Custom component ()
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#dcdde1",
            borderRadius: "8px",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "white",
          },
        },
      },
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: "none",
          borderWidth: "0.1px",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          fontSize: "0.875rem",
          // ".MuiOutlinedInput-notchedOutline": {
          //   borderColor: theme.palette.primary.light,
          // },
          // "&:hover": {
          //   ".MuiOutlinedInput-notchedOutline": {
          //     borderColor: theme.palette.primary.main,
          //   },
          // },
          "& fieldset": {
            borderWidth: "0.5px !important",
          },
          "&:hover fieldset": {
            borderWidth: "2px !important",
          },
          "&.Mui-focused fieldset": {
            borderWidth: "2px !important",
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          fontSize: "0.875rem",
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          fontSize: "0.875rem",
        },
      },
    },
  },
});

console.log(theme);

export default theme;
