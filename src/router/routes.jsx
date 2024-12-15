import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import DashboardPage from "../features/Dashboard/pages/DashboardPage";
import UserManagement from "../features/UserManagement/pages/UserManagement";
import Providers from "../Providers";
import PatternDayList from "../features/LessonAndExercise/pages/PatternDayList";
import LessonAndExerciseList from "../features/LessonAndExercise/pages/LessonAndExerciseList";
import LessonDetailPage from "../features/LessonAndExercise/pages/LessonDetailPage";
import SpokenPatternList from "../features/SpokenPattern/SpokenPatternList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/user-management",
        element: <UserManagement />,
      },
      {
        path: "/pattern-day-list",
        element: <PatternDayList />,
      },
      {
        path: "/lesson-and-exercise-list/:day-id",
        element: <LessonAndExerciseList />,
      },
      {
        path: "/lesson-detail/:lesson-id",
        element: <LessonDetailPage />,
      },
      {
        path: "/spoken-pattern-list",
        element: <SpokenPatternList />,
      },
    ],
  },
]);
export default router;
