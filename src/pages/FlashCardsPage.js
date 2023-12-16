import React, { useState } from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import {
  Typography,
  Box,
  Paper,
  Grid,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  Checkbox,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material";
import CustomButton from "../components/CustomButton";
import CustomTypography from "../components/CustomTypography";
import { useAuthContext } from "../hooks/useAuthContext";
function FlashCardsPage() {
  const [start, setStart] = useState(false);
  const [chooseTopics, setChooseTopic] = useState(false);
  const [javascriptChecked, setJavascriptChecked] = useState(false);
  const [javaChecked, setJavaChecked] = useState(false);
  const [sqlChecked, setSqlChecked] = useState(false);
  const [pythonChecked, setPythonChecked] = useState();
  const [isFlipped, setIsFlipped] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { user } = useAuthContext();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const explanationObject = [
    {
      headline: "זיכרון פעיל:",
      text: "כרטיסיות הלמידה מעריכים את המוח בזיכרון פעיל, שיטה מוכחת לחיזוק זיכרון. כאשר אתה מנסה לענות על שאלה, אתה מחזק את החיבורים במוח שלך.",
    },
    {
      headline: "למידה יעילה:",
      text: "כרטיסיות הלמידה הם אמצעי יעיל לבדיקה ולשיפור הזיכרון פורמטים בגודל קטן שעוזרים להתרכז במה שחשוב באמת.",
    },
    {
      headline: "חזרה על פי צורך:",
      text: "חזרה על החומר הוא חלק חשוב בתהליך הלמידה. כרטיסיות הלמידה מיועדים לסקירה מהירה וחוזרת, עוזרים להעביר את המידע מזיכרון קצר לזיכרון ארוך טווח.",
    },
  ];

  const handleChoseTopics = () => {
    setChooseTopic(true);
  };

  const handleStart = async () => {
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
      `http://localhost:8000/api/get-Quizs-topic?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.ok) {
      const fetchedQuestions = await response.json();
      setQuestions(fetchedQuestions);
    } else {
      console.error("Error fetching quiz questions:", response.statusText);
    }
    setStart(true);
    setIsFlipped(false);
  };

  const handleRestart = () => {
    setQuestions();
    setStart(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCheckboxChange = (language) => {
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

  const nextCard = () => {
    setIsFlipped(false);
    if (currentQuestion == questions.length - 1) {
      setCurrentQuestion(0);
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const prevCard = () => {
    setIsFlipped(false);
    if (currentQuestion == 0) {
      setCurrentQuestion(questions.length - 1);
      return;
    }
    setCurrentQuestion(currentQuestion - 1);
  };

  return (
    <div dir="rtl">
      <ResponsiveAppBar />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          bgcolor: "text.disabled",
          minHeight: "100vh",
          padding: 2,
        }}
      >
        {!start && !chooseTopics && (
          <Paper
            elevation={3}
            sx={{
              maxWidth: isSmallScreen ? "90%" : 700,
              width: "100%",
              minHeight: 500,
              p: 2,
            }}
          >
            <div>
              <CustomTypography variant="h6" maxWidth="4000">
                כרטיסיות למידה
              </CustomTypography>
              <CustomTypography variant="h4" maxWidth="4000">
                הדרך האולטימטיבית ללמוד
              </CustomTypography>

              <Box mt={2}>
                {explanationObject.map((section, index) => (
                  <Paper
                    key={index}
                    elevation={3}
                    style={{ padding: "0.5rem", marginBottom: "0.5rem" }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "revert",
                      }}
                      gutterBottom
                    >
                      {section.headline}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {section.text}
                    </Typography>
                  </Paper>
                ))}
                <CustomButton onClick={handleChoseTopics}>
                  בחר נושאים לתרגול
                </CustomButton>
              </Box>
            </div>
          </Paper>
        )}

        {chooseTopics && !start && (
          <Paper
            elevation={3}
            sx={{
              maxWidth: 700,
              width: "90%",
              p: 2,
              mt: 2,
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
            <CustomButton
              onClick={handleStart}
              sx={{ marginTop: 5 }}
              disabled={
                !pythonChecked &&
                !javascriptChecked &&
                !javaChecked &&
                !sqlChecked
              }
            >
              התחל לתרגל
            </CustomButton>
          </Paper>
        )}

        {start && (
          <Card
            sx={{
              textAlign: "center",
              maxWidth: isSmallScreen ? "90%" : 400,
              width: "100%",
              minHeight: 500,
              p: 2,
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              transition: "transform 0.6s",
            }}
          >
            <CardContent
              sx={{
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {isFlipped ? (
                // Answer side
                <CustomTypography
                  variant="h6"
                  maxWidth={isSmallScreen ? "90%" : 4000}
                >
                  <h4>תשובה:</h4>
                  {
                    questions[currentQuestion].options.find(
                      (option) => option.isCorrect
                    )?.option
                  }
                </CustomTypography>
              ) : (
                // Question side
                <CustomTypography
                  variant="h6"
                  maxWidth={isSmallScreen ? "90%" : 4000}
                >
                  <h4>שאלה:</h4>
                  {questions[currentQuestion].question}
                </CustomTypography>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <ArrowForwardIcon
                  onClick={nextCard}
                  sx={{ width: 50, marginTop: 3, color: "blue" }}
                ></ArrowForwardIcon>
                <ArrowBackIcon
                  onClick={prevCard}
                  sx={{ width: 50, marginTop: 2, color: "blue" }}
                >
                  לשאלה הקודמת
                </ArrowBackIcon>
              </div>
              <CustomButton onClick={handleFlip} sx={{ marginTop: 5 }}>
                הפוך קלף
              </CustomButton>
              <CustomButton onClick={handleRestart} sx={{ marginTop: 5 }}>
                שנה נושאים
              </CustomButton>
            </CardContent>
          </Card>
        )}
      </Grid>
    </div>
  );
}

export default FlashCardsPage;
