import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import DashboardPage from "../features/Dashboard/pages/DashboardPage";
import UserManagement from "../features/UserManagement/pages/UserManagement";
import Providers from "../Providers";
import PatternDayList from "../features/SpokenPattern/pages/PatternDayList";

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
    ],
  },
]);
export default router;
