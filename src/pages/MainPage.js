import React from "react";
import { useLogOut } from "../hooks/useLogOut";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { Box, Typography, Container, Paper } from "@mui/material";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";
import CustomTypography from "../components/CustomTypography";

function MainPage() {
  const { logout } = useLogOut();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await logout();
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Box
        sx={{
          direction: "rtl",
          bgcolor: "text.disabled",
          backgroundSize: "cover",
          height: "93vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            maxWidth: "90%",
            width: "100%",
            minHeight: "80%",
            p: 2,
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
      </Box>
    </div>
  );
}
export default MainPage;
