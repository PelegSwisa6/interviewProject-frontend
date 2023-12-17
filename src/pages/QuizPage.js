import React from "react";
import { useState, useEffect } from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import CustomButton from "../components/CustomButton";
import CustomTypography from "../components/CustomTypography";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Grid,
  Typography,
  Stack,
  Paper,
  useMediaQuery,
  Checkbox,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material";

function QuizPage() {
  const [javascriptChecked, setJavascriptChecked] = useState(false);
  const [pythonChecked, setPythonChecked] = useState(false);
  const [javaChecked, setJavaChecked] = useState(false);
  const [sqlChecked, setSqlChecked] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const { user } = useAuthContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [bankQuestions, setBankQuestions] = useState(20);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [isTrue, setIsTrue] = useState();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (isTrue != null) {
      setShowAlert(true);
      // Hide the alert after 5 seconds
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      // Clear the timeout if the component unmounts or if showAlert becomes false
      return () => clearTimeout(timeoutId);
    }
  }, [isTrue]);

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleCheckboxChange = (language) => {
    setQuizQuestions("");
    if (language === "javascript") {
      setJavascriptChecked(!javascriptChecked);
    } else if (language === "python") {
      setPythonChecked(!pythonChecked);
    } else if (language === "java") {
      setJavaChecked(!javaChecked);
    } else if (language === "sql") {
      setSqlChecked(!sqlChecked);
    }
  };

  const handleStart = async () => {
    if (quizQuestions.length == 0) {
      try {
        const selectedTopics = [];
        if (javascriptChecked) {
          selectedTopics.push("JavaScript");
        }
        if (pythonChecked) {
          selectedTopics.push("Python");
        }
        if (javaChecked) {
          selectedTopics.push("Java");
        }
        if (sqlChecked) {
          selectedTopics.push("SQL");
        }
        const params = new URLSearchParams({
          topics: selectedTopics.join(","),
        });

        const response = await fetch(
          `https://interviewproject-api.onrender.com/api/get-Quizs-topic?${params.toString()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.ok) {
          const fetchedQuestions = await response.json();

          setQuizQuestions(fetchedQuestions);
          setShowScore(false);
          setScore(0);
          setCurrentQuestion(0);
        } else {
          console.error("Error fetching quiz questions:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching quiz questions:", error.message);
      }
    } else {
    }
  };

  const handleAnswerOptionClick = (isCorrect) => {
    let updatedQuizQuestions = quizQuestions;
    setButtonDisabled(true);
    const quizId = quizQuestions[currentQuestion]._id;
    const userId = user.id;
    const lengthOfBankQuestion = bankQuestions;
    fetch("https://interviewproject-api.onrender.com/api/update-user-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        idUser: userId,
        questionId: quizId,
        answer: isCorrect,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.updateAnswer.numOfAnswers >= 8) {
          updatedQuizQuestions = quizQuestions.filter(
            (question) => question._id !== data.updateAnswer.questionId
          );
        }
      })
      .catch((error) => {
        console.error("Error updating user answer:", error.message);
      })
      .finally(() => {
        if (isCorrect) {
          setIsTrue("  תשובה נכונה :)");
          setScore(score + 1);
        } else {
          setIsTrue("  תשובה לא נכונה :(");
        }
        setTimeout(() => {
          setShowAlert(false);
          setIsTrue();
        }, 1500);
        setTimeout(() => {
          let nextQuestion;
          if (updatedQuizQuestions.length > 10) {
            nextQuestion = getRandomInt(0, 9);
          } else if (updatedQuizQuestions.length > 2) {
            nextQuestion = getRandomInt(0, updatedQuizQuestions.length - 2);
          } else {
            nextQuestion = 0;
          }
          if (updatedQuizQuestions.length != 0 && bankQuestions > 0) {
            setBankQuestions(lengthOfBankQuestion - 1);
            setQuizQuestions(updatedQuizQuestions);
            setCurrentQuestion(nextQuestion);
          } else {
            setShowScore(true);
            setBankQuestions(20);
          }
        }, 1700);
        setTimeout(() => {
          setButtonDisabled(false);
        }, 1700);
      });
  };

  const handleRestart = (act) => {
    if (act == 1) {
      setShowScore(null);
      setScore(0);
    } else {
      setQuizQuestions([]);
      setShowScore(null);
      setScore(0);
    }
  };

  return (
    <div dir="rtl" style={{ bgcolor: "text.disabled", minHeight: "100vh" }}>
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
        {quizQuestions.length == 0 && (
          <Paper
            elevation={3}
            sx={{
              maxWidth: isSmallScreen ? "90%" : 700,
              width: "100%",
              minHeight: 500,
              p: 2,
              maxHeight: isSmallScreen ? 400 : 400,
            }}
          >
            <Typography
              mt={7}
              mb={3}
              textAlign={"center"}
              fontSize={{ xs: 24, md: 32 }}
              fontFamily={"sans-serif"}
              variant="h6"
              sx={{
                textAlign: "center",
                maxWidth: 4000,
                p: 1,
                fontSize: 25,
                fontFamily: "revert",
              }}
            >
              איזה שפות נתרגל?
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Checkbox
                checked={javascriptChecked}
                onChange={() => handleCheckboxChange("javascript")}
                color="primary"
              />
              <CustomTypography variant="h4" maxWidth="4000">
                JavaScript
              </CustomTypography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Checkbox
                checked={pythonChecked}
                onChange={() => handleCheckboxChange("python")}
                color="primary"
              />
              <CustomTypography variant="h4" maxWidth="4000">
                Python
              </CustomTypography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Checkbox
                checked={javaChecked}
                onChange={() => handleCheckboxChange("java")}
                color="primary"
              />
              <CustomTypography variant="h4" maxWidth="4000">
                Java
              </CustomTypography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Checkbox
                checked={sqlChecked}
                onChange={() => handleCheckboxChange("sql")}
                color="primary"
              />
              <CustomTypography variant="h4" maxWidth="4000">
                Sql
              </CustomTypography>
            </Stack>
            <CustomButton onClick={handleStart} sx={{ mt: 3, mb: 2 }}>
              התחל לענות על השאלות
            </CustomButton>
          </Paper>
        )}

        {quizQuestions.length > 0 && !showScore && (
          <>
            <Paper
              elevation={3}
              sx={{
                maxWidth: isSmallScreen ? "90%" : 700,
                width: "100%",
                minHeight: 500,
                p: 2,
                maxHeight: isSmallScreen ? 400 : 400,
              }}
            >
              <div>
                <div>
                  <CustomTypography variant="h6" maxWidth="4000">
                    שאלה {currentQuestion + 1}
                  </CustomTypography>
                </div>
                <CustomTypography variant="h4" maxWidth="4000">
                  {quizQuestions[currentQuestion].question}
                </CustomTypography>
              </div>

              <Stack spacing={2} mt={4}>
                {quizQuestions[currentQuestion].options.map((option) => (
                  <CustomButton
                    disabled={isButtonDisabled}
                    key={option._id}
                    onClick={() => handleAnswerOptionClick(option.isCorrect)}
                    variant="outlined"
                    sx={{ width: "100%" }}
                  >
                    {option.option}
                  </CustomButton>
                ))}
              </Stack>
            </Paper>
          </>
        )}

        {showScore && (
          <Paper elevation={3} sx={{ p: 2, mt: 7 }}>
            <CustomTypography variant="h6" maxWidth="4000">
              ענית על {score} תשובות נכונות מתוך {bankQuestions}
            </CustomTypography>
            <CustomButton
              onClick={() => handleRestart(1)}
              variant="outlined"
              sx={{ width: "100%", mt: 4 }}
            >
              המשך
            </CustomButton>
            <CustomButton
              onClick={() => handleRestart(2)}
              variant="outlined"
              sx={{ width: "100%", mt: 4 }}
            >
              שנה נושאים
            </CustomButton>
          </Paper>
        )}

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
                {isTrue}
              </CustomTypography>
            </MuiAlert>
          </div>
        </Snackbar>
      </Grid>
    </div>
  );
}

export default QuizPage;
