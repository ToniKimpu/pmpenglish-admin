import { usePremiumStudents, useStudents } from "../hooks/useUser";
import PremiumStudentRow from "./PremiumStudentRow";
import StudentRow from "./StudentRow";

const StudentTab = ({ isActive, id }) => {
  const { isLoading: isLoadingStudents, data: students } = useStudents();
  const { isLoading: isLoadingPremium, data: premiumStudents } =
    usePremiumStudents();

  if (!isActive) {
    return null;
  }

  let content = null;

  if (id === "allUsers" && isActive) {
    if (isLoadingStudents) {
      return <div>Loading...</div>;
    }
    if (!students?.length) {
      return <div>No data</div>;
    }
    content = students?.map((student) => {
      return <StudentRow key={student.id} student={student} />;
    });
  } else if (id === "premiumUsers") {
    if (isLoadingPremium) {
      return <div>Loading...</div>;
    }
    if (!premiumStudents?.length) {
      return <div>No data</div>;
    }
    content = premiumStudents.map((student) => {
      return <PremiumStudentRow key={student.id} student={student} />;
    });
  }

  return (
    <div role="tabpanel">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Account ID
              </th>
              <th scope="col" className="px-6 py-3">
                User Type
              </th>
              <th scope="col" className="px-6 py-3">
                User Id
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
};
export default StudentTab;
