import React from "react";
import { useLogOut } from "../hooks/useLogOut";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import {
  Grid,
  Typography,
  Container,
  useMediaQuery,
  Paper,
} from "@mui/material";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";
import CustomTypography from "../components/CustomTypography";
import { useTheme } from "@mui/material";

function MainPage() {
  const { logout } = useLogOut();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await logout();
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Grid
        container
        justifyContent="center"
        sx={{
          bgcolor: "text.disabled",
          minHeight: "100vh",
          padding: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            maxWidth: isSmallScreen ? "90%" : 700,
            width: "100%",
            minHeight: isSmallScreen ? "90%" : "100%",
            p: 2,
            maxHeight: 700,
          }}
        >
          <Container maxWidth="sm" textAlign="center">
            <CustomTypography variant="h6" maxWidth="4000">
              ברוכים הבאים לאפליקציית המתכנתים שלנו
            </CustomTypography>

            <Typography
              variant="subtitle2"
              color="textSecondary"
              mb={4}
              fontSize={20}
              textAlign={"center"}
              fontFamily={"inherit"}
            >
              כאן תוכלו ללמוד דברים חדשים, לתרגל אותם ולהתכונן לראיונות עבודה.
              האפליקציה שלנו תתאים את עצמה עבורכם לפי העדפות וההישגים שלכם.
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              mt={2}
              textAlign={"center"}
              fontFamily={"inherit"}
              fontSize={25}
            >
              המון בהצלחה
            </Typography>
            <CustomButton
              component={Link}
              to="/flashcards"
              sx={{ mt: 3, mb: 2 }}
            >
              התחל ללמוד
            </CustomButton>
          </Container>
        </Paper>
      </Grid>
    </div>
  );
}
export default MainPage;
