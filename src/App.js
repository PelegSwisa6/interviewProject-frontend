import "./App.css";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import QuizPage from "./pages/QuizPage";
import FlashCardsPage from "./pages/FlashCardsPage";
import RequestQuestions from "./pages/RequestQuestions";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  const router = createBrowserRouter([
    {
      path: "/signin",
      element: !user ? <SignIn /> : <Navigate to="/" />,
    },
    { path: "/signup", element: !user ? <SignUp /> : <Navigate to="/" /> },
    {
      path: "/",
      element: user ? <MainPage /> : <Navigate to="/signin" />,
    },
    {
      path: "/quiz-practice",
      element: user ? <QuizPage /> : <Navigate to="/signin" />,
    },
    {
      path: "/flashcards",
      element: user ? <FlashCardsPage /> : <Navigate to="/signin" />,
    },
    {
      path: "/add-question",
      element: user ? <RequestQuestions /> : <Navigate to="/signin" />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
