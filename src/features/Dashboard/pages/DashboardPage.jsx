import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Container from "../../../components/Container";
import { useSession } from "../../../context/SessionContext";

const DashboardGridItem = ({ title, onClick, className }) => (
  <div
    role="button"
    aria-label={title}
    onClick={onClick}
    className={`flex cursor-pointer items-center justify-center px-6 py-8 border rounded-md bg-[#0496C7] text-white hover:bg-[#0496c7e2] font-bold ${className}`}
  >
    {title}
  </div>
);

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
          <DashboardGridItem
            title="User Management"
            onClick={() => {
              navigate("/user-management");
            }}
          />
          <DashboardGridItem
            title="Spoken Patterns"
            onClick={() => navigate("/pattern-day-list")}
          />
          <DashboardGridItem
            title="Translation"
            onClick={() => console.log("Navigate to User Management")}
          />
          <DashboardGridItem
            title="User Self Practice"
            onClick={() => console.log("Navigate to User Management")}
          />
          <DashboardGridItem
            title="Q/A Section"
            onClick={() => console.log("Navigate to User Management")}
          />
          <DashboardGridItem
            title="User Management"
            onClick={() => console.log("Navigate to User Management")}
          />
        </div>
      </Container>
    </section>
  );
};

export default DashboardPage;
