import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
// cấu hình react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmProvider } from "material-ui-confirm";

import { Provider } from "react-redux";
import Store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <Provider store={Store}>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider
        defaultOptions={{
          confirmationText: "Confirm",
          cancellationText: "Cancel",
          dialogProps: { maxWidth: "xs" },
        }}
      >
        <CssBaseline />
        <App />
        <ToastContainer />
      </ConfirmProvider>
    </CssVarsProvider>
  </Provider>

  // </React.StrictMode>
);
