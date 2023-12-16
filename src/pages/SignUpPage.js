import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import CustomButton from "../components/CustomButton";
import CustomTextField from "../components/CustomTextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSignUp } from "../hooks/useSignUp";
import { Snackbar } from "@mui/material";

const defaultTheme = createTheme();

function SignUp() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignUp();
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

    const res = await signup(name, lastName, email, password);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            הרשמה
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  placeholder="שם משפחה"
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  type="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  autoComplete="given-name"
                  name="firstName"
                  id="firstName"
                  placeholder="שם פרטי"
                  type="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  placeholder="כתובת אימייל"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="סיסמה"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Grid>
              <Grid container justifyContent="flex-end"></Grid>
            </Grid>
            <CustomButton type={"submit"} sx={{ mt: 2, mb: 2 }}>
              הרשמה
            </CustomButton>
            <Grid container justifyContent="flex-end">
              <Link href="/signin" variant="body">
                כבר יש לך משתמש ? התחבר כאן
              </Link>
              <Grid item></Grid>
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
export default SignUp;
