import { Box, Typography, Button, Container } from "@mui/material";

function NotFoundPage() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "background.paper",
        py: { xs: 8, lg: 16 },
        px: { xs: 4, lg: 6 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            mb: 4,
            fontWeight: "bold",
            fontSize: { xs: "7rem", lg: "9rem" },
            color: "primary.main",
          }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          component="p"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: "text.primary",
          }}
        >
          Something's missing.
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "text.secondary", fontWeight: "light" }}
        >
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="#"
          sx={{
            textTransform: "none",
            my: 4,
            py: 1.5,
            px: 4,
            fontSize: "1rem",
          }}
        >
          Back to Homepage
        </Button>
      </Container>
    </Box>
  );
}

export default NotFoundPage;
