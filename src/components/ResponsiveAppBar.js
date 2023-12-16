import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { useLogOut } from "../hooks/useLogOut";

const pages = [
  { name: "תרגול קוויז", link: "/quiz-practice" },
  { name: "קלפי למידה", link: "/flashcards" },
  { name: "הוסף/תקן שאלה", link: "/add-question" },
];

const settings = [{ name: "התנתק", act: "logout" }];

function ResponsiveAppBar() {
  const { logout } = useLogOut();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleLogOut = async (e) => {
    e.preventDefault();

    const res = await logout();
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" dir="rtl">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              textAlign: "center",
              maxWidth: 4000,
              p: 1,
              fontSize: 25,
              fontFamily: "revert",
            }}
          >
            ג'וניורס
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    variant="h6"
                    noWrap
                    component={Link}
                    to={page.link}
                    key={page.name}
                    sx={{
                      fontFamily: "serif",
                      fontWeight: 50,
                      color: "black",
                      textDecoration: "none",
                      display: "block",
                      textAlign: "center",
                      maxWidth: 4000,
                      p: 1,
                      fontSize: 25,
                      fontFamily: "revert",
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              textAlign: "center",
              maxWidth: 4000,
              p: 1,
              fontSize: 25,
              fontFamily: "revert",
            }}
          >
            ג'וניורס
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to={page.link}
                key={page.name}
                sx={{
                  mr: 2,
                  letterSpacing: ".01rem",
                  color: "white",
                  textDecoration: "none",
                  display: "block",
                  my: 2,
                  textAlign: "center",
                  maxWidth: 4000,

                  fontSize: 22,
                  fontFamily: "revert",
                }}
              >
                {page.name}
              </Typography>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {settings.map((setting) => (
              <Typography
                variant="h6"
                key={setting.name}
                onClick={setting.act === "logout" ? handleLogOut : null}
                to={setting.act === "settings" ? "/settings" : "#"}
                sx={{
                  mr: 2,
                  letterSpacing: ".01rem",
                  color: "white",
                  textDecoration: "none",
                  display: "block",
                  my: 2,
                  textAlign: "center",
                  maxWidth: 4000,

                  fontSize: 22,
                  fontFamily: "revert",
                }}
              >
                {setting.name}
              </Typography>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
