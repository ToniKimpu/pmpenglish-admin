import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import Container from "../../../components/Container";
import StudentTab from "../components/StudentTab";

const TABS = [
  {
    id: "allUsers",
    label: "All Users",
  },
  {
    id: "premiumUsers",
    label: "Premium Users",
  },
];

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  return (
    <section>
      <Container className="mt-8">
        <h1 id="user-management-title" className="text-2xl font-bold mt-6">
          User Management
        </h1>
        <div className="mb-4">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center"
            role="tablist"
          >
            {TABS.map((tab) => (
              <li key={tab.id} className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === tab.id
                      ? "text-gray-800 border-gray-800 dark:text-white dark:border-white"
                      : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }`}
                  type="button"
                  role="tab"
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative w-64">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <HiOutlineSearch />
            </div>
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              // onChange={handleSearch}
            />
          </div>
          {TABS.map((tab) => (
            <StudentTab
              key={tab.id}
              isActive={activeTab === tab.id}
              id={tab.id}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default UserManagement;
