import { Box, Typography, Button, Grid, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import { FcInvite } from "react-icons/fc";

export default function Notification({
  messaageNotifiction,
  handleAcceptInvite,
}) {
  return (
    <Box
      id="toast-interactive"
      sx={{
        position: "absolute",
        right: "12px",
        bottom: "30px",
        width: "100%",
        maxWidth: 360,
        p: 2,
        bgcolor: "white",
        color: "gray.500",
        borderRadius: 2,
        boxShadow: 1,
        display: "flex",
        alignItems: "center",
        dark: {
          bgcolor: "gray.800",
          color: "gray.400",
        },
      }}
      role="alert"
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          bgcolor: "blue.100",
          borderRadius: "50%",
          color: "blue.500",
          dark: {
            color: "blue.300",
            bgcolor: "blue.900",
          },
        }}
      >
        <FcInvite />
      </Box>

      <Box sx={{ ml: 2 }}>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            fontWeight: "bold",
            color: "gray.900",
            dark: { color: "white" },
          }}
        >
          Notification
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {messaageNotifiction}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              onClick={handleAcceptInvite}
              variant="contained"
              size="small"
              fullWidth
              sx={{
                bgcolor: "blue.600",
                "&:hover": { bgcolor: "blue.700" },
                dark: {
                  bgcolor: "blue.500",
                  "&:hover": { bgcolor: "blue.600" },
                },
              }}
            >
              Accept
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                color: "gray.900",
                bgcolor: "white",
                borderColor: "gray.300",
                "&:hover": { bgcolor: "gray.100" },
                dark: {
                  bgcolor: "gray.600",
                  color: "white",
                  borderColor: "gray.600",
                  "&:hover": { bgcolor: "gray.700", borderColor: "gray.700" },
                },
              }}
            >
              Decline
            </Button>
          </Grid>
        </Grid>
      </Box>

      <IconButton
        sx={{
          ml: "auto",
          color: "gray.400",
          "&:hover": { color: "gray.900", bgcolor: "gray.100" },
          dark: {
            color: "gray.500",
            "&:hover": { color: "white", bgcolor: "gray.700" },
          },
        }}
        aria-label="Close"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
