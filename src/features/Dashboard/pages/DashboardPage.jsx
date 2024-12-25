import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Container from "../../../components/Container";
import { useSession } from "../../../context/SessionContext";
import DashboardItem from "../components/DashboardItem";

const DashboardPage = () => {
  const session = useSession();
  const navigate = useNavigate();
  if (!session.session) return <Navigate to="/login" replace />;
  return (
    <section aria-labelledby="dashboard-title">
      <Container className={"px-6 md:px-0"}>
        <h1 id="dashboard-title" className="text-2xl font-bold mt-6">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 mt-6">
          <DashboardItem
            title="User Management"
            onClick={() => {
              navigate("/user-management");
            }}
          />
          <DashboardItem
            title="Lesson and Exercise List"
            onClick={() => navigate("/pattern-day-list")}
          />
          <DashboardItem
            title="Translation"
            onClick={() => navigate("/translation-levels")}
          />
          <DashboardItem
            title="User Self Practice"
            onClick={() => console.log("Navigate to User Management")}
          />
          <DashboardItem
            title="Q/A Section"
            onClick={() => console.log("Navigate to User Management")}
          />
          <DashboardItem
            title="Spoken Patterns"
            onClick={() => navigate("/spoken-pattern-list")}
          />
        </div>
      </Container>
    </section>
  );
};

export default DashboardPage;
