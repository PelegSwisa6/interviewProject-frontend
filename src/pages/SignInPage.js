import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CustomButton from "../components/CustomButton";
import CssBaseline from "@mui/material/CssBaseline";
import CustomTextField from "../components/CustomTextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const defaultTheme = createTheme();

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (error) {
      setShowAlert(true);

      // Hide the alert after 5 seconds
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      // Clear the timeout if the component unmounts or if showAlert becomes false
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(email, password);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" onSubmit={handleSubmit}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            התחברות
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <CustomTextField
              id="email"
              placeholder="כתובת אימייל"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <CustomTextField
              name="password"
              placeholder="סיסמה"
              id="password"
              autoComplete="current-password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <CustomButton type={"submit"} sx={{ mt: 3, mb: 2 }}>
              התחבר
            </CustomButton>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/signup" variant="body">
                  {"עדיין אין לך משתמש ? הירשם כאן"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Snackbar open={showAlert} autoHideDuration={5000}>
            <div>
              <MuiAlert severity="error" sx={{ bgcolor: "background.paper" }}>
                <Typography variant="h3" style={{ fontSize: "17px" }}>
                  {error}
                </Typography>
              </MuiAlert>
            </div>
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default SignIn;
