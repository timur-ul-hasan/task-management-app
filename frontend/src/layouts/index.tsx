import {
  AppBar,
  Avatar,
  Box,
  Container,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router";
import Logo from "src/components/Logo";
import useAuth from "src/hooks/useAuth";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";

export default function Layout() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <AppBar
        position="static"
        sx={{
          p: 2,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Logo />
          <Avatar onClick={handleMenu} sx={{ cursor: "pointer" }}>
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar>{user?.name?.charAt(0).toUpperCase()}</Avatar>
                <Box>
                  <Typography variant="h5">{user?.name}</Typography>
                  <Typography variant="body1">{user?.username}</Typography>
                  <Typography variant="body2">{user?.email}</Typography>
                </Box>
              </Box>
              <Divider />
              <MenuItem disabled>Profile</MenuItem>
              <MenuItem onClick={() => {
                logout();
                navigate("/login");
              }}>Logout</MenuItem>
            </Stack>
          </Menu>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Container>
  );
}
