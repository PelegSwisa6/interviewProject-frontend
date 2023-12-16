import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import CustomTypography from "../components/CustomTypography";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Grid,
  Paper,
  useMediaQuery,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Snackbar,
  TextField,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material";
import CustomButton from "../components/CustomButton";

function RequestQuestions() {
  const { user } = useAuthContext();
  const [showAlert, setShowAlert] = useState(false);
  const [getRequest, setGetRequest] = useState();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [alignment, setAlignment] = useState("add");
  const [addQuestion, setAddQestion] = useState(true);
  const [newQuestion, setNewQuestion] = useState("");
  const [answerMum1, setAnswerMum1] = useState("");
  const [answerMum2, setAnswerMum2] = useState("");
  const [answerMum3, setAnswerMum3] = useState("");
  const [answerMum4, setAnswerMum4] = useState("");
  const [fixQuestion, setFixQuestion] = useState("שאלה מספר: ");
  const [explain, setExplain] = useState("ישנה טעות בשאלה ששלחתי, הסבר : ");

  useEffect(() => {
    if (getRequest != null) {
      setShowAlert(true);
      // Hide the alert after 5 seconds
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      // Clear the timeout if the component unmounts or if showAlert becomes false
      return () => clearTimeout(timeoutId);
    }
  }, [getRequest]);

  const handleChange = (event, newAlignment) => {
    if (newAlignment != null) {
      setAddQestion(!addQuestion);
      setAlignment(newAlignment);
    }
  };

  const handleSendRequest = (type) => {
    let subject;
    if (type == "q") {
      subject = "question";
    }
    fetch("https://interviewproject-api.onrender.com/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        subject: subject,
        question: newQuestion,
        oneOpt: answerMum1,
        twoOpt: answerMum2,
        threeOpt: answerMum3,
        fourOpt: answerMum4,
        numOfQuestion: fixQuestion,
        problem: explain,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setGetRequest("קיבלנו את הבקשה שלך, תודה רבה");
      setNewQuestion("");
      setAnswerMum1("");
      setAnswerMum2("");
      setAnswerMum3("");
      setAnswerMum4("");
      setFixQuestion("שאלה מספר: ");
      setExplain("ישנה טעות בשאלה ששלחתי, הסבר : ");
      return response.json();
    });
  };
  return (
    <>
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
            minHeight: 200,
            maxHeight: 700,
            p: 2,
          }}
        >
          <CustomTypography variant="h6" maxWidth="4000">
            ?מצאתם טעות בשאלות שלנו
            <br></br>
            ?רוצים להוסיף שאלה שלכם
            <br></br>
            כאן תוכלו לבקש ולעדכן אותנו
          </CustomTypography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              alignItems=""
            >
              <ToggleButton value="change">תקן שאלה</ToggleButton>
              <ToggleButton value="add">הוסף שאלה</ToggleButton>
            </ToggleButtonGroup>
          </div>
          {addQuestion && (
            <Box
              component="form"
              display="box"
              dir="rtl"
              sx={{
                "& .MuiTextField-root": {
                  m: 1,
                  maxWidth: isSmallScreen ? "100%" : 700,
                  width: "98%",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  placeholder="הכנס שאלה"
                  multiline
                  value={newQuestion}
                  onChange={(event) => setNewQuestion(event.target.value)}
                />
              </div>
              <div>
                <TextField
                  placeholder="הכנס תשובה"
                  multiline
                  variant="filled"
                  value={answerMum1}
                  onChange={(event) => setAnswerMum1(event.target.value)}
                />
                <TextField
                  placeholder="הכנס תשובה"
                  multiline
                  variant="filled"
                  value={answerMum2}
                  onChange={(event) => setAnswerMum2(event.target.value)}
                />
                <TextField
                  placeholder="הכנס תשובה (אופציונלי)"
                  multiline
                  variant="filled"
                  value={answerMum3}
                  onChange={(event) => setAnswerMum3(event.target.value)}
                />
                <TextField
                  placeholder="הכנס תשובה (אופציונלי)"
                  multiline
                  variant="filled"
                  value={answerMum4}
                  onChange={(event) => setAnswerMum4(event.target.value)}
                />
              </div>
              <CustomButton
                onClick={() => handleSendRequest("q")}
                disabled={!newQuestion || !answerMum1 || !answerMum2}
              >
                שלח
              </CustomButton>
            </Box>
          )}
          {!addQuestion && (
            <Box
              component="form"
              display="box"
              dir="rtl"
              sx={{
                "& .MuiTextField-root": {
                  m: 1,
                  maxWidth: isSmallScreen ? "100%" : 700,
                  width: "98%",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  placeholder="מספר שאלה"
                  multiline
                  value={fixQuestion}
                  onChange={(event) => setFixQuestion(event.target.value)}
                />
              </div>
              <div>
                <TextField
                  placeholder="כאן תוכל להסביר לנו על הטעות"
                  multiline
                  rows={6}
                  value={explain}
                  onChange={(event) => setExplain(event.target.value)}
                />
              </div>
              <CustomButton onClick={() => handleSendRequest("a")}>
                שלח{" "}
              </CustomButton>
            </Box>
          )}
        </Paper>
        <Snackbar
          TransitionComponent={Slide}
          open={showAlert}
          autoHideDuration={5000}
        >
          <div>
            <MuiAlert
              severity=""
              color="info"
              sx={{ bgcolor: "background.paper" }}
            >
              <CustomTypography variant="h6" maxWidth="4000">
                {getRequest}
              </CustomTypography>
            </MuiAlert>
          </div>
        </Snackbar>
      </Grid>
    </>
  );
}

export default RequestQuestions;
