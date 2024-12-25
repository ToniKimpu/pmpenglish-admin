import React from "react";

const DashboardItem = ({ title, onClick, className }) => (
  <div
    role="button"
    aria-label={title}
    onClick={onClick}
    className={`flex cursor-pointer items-center justify-center px-6 py-8 border rounded-md bg-[#0496C7] text-white hover:bg-[#0496c7e2] font-bold ${className}`}
  >
    {title}
  </div>
);

export default DashboardItem;
