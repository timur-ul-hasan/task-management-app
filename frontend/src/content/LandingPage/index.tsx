import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";

const LandingPage: React.FC = () => {
  return (
    <Container sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: (theme)=> theme.colors.gradients.black2,
          color: "white",
          py: 8,
          textAlign: "center",
          borderRadius: 1,
          boxShadow: '3px 0 5px 0px',
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to Task Manager
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Simplify your life, manage your tasks, and achieve your goals.
        </Typography>
        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          size="large"
          sx={{ mx: 1 }}
          color="secondary"
        >
          Login
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{ mx: 1, color: "white" }}
          component={RouterLink}
          to="/signup"
          color="primary"
        >
          Sign Up
        </Button>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Why Choose Task Manager?
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 6 }}>
          Task Manager is a user-friendly platform designed to help you stay
          organized and on top of your priorities.
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Organized Workflow",
              description:
                "Keep all your tasks in one place, categorize them, and set priorities effortlessly.",
            },
            {
              title: "Real-time Collaboration",
              description:
                "Work with your team seamlessly with real-time updates and notifications.",
            },
            {
              title: "Customizable Reminders",
              description:
                "Never miss a deadline with reminders tailored to your needs.",
            },
          ].map((feature, index) => (
            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
              key={index}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 2, color: "primary.main" }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          py: 6,
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Ready to take control of your tasks?
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ mx: 1 }}
          component={RouterLink}
          to="/signup"
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
