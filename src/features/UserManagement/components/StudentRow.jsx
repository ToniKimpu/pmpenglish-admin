import React from "react";
import { useAddPremiumStudent } from "../hooks/useUser";
import ButtonSpinner from "../../../components/ButtonSpinner";

const StudentRow = ({ student }) => {
  const { mutate: addPremiumUser, isLoading } = useAddPremiumStudent();
  const added = student.premium_users?.length > 0;
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {student.name}
      </th>
      <td className="px-6 py-4">{student.email}</td>
      <td className="px-6 py-4">{student.account_id}</td>
      <td className="px-6 py-4">{student.user_type}</td>
      <td className="px-6 py-4">{student.id}</td>
      <td className="px-6 py-4">
        <button
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={() => {
            if (!added) addPremiumUser(student.id);
          }}
        >
          {added ? "Added" : "Add Premium"}
          {isLoading && <ButtonSpinner />}
        </button>
      </td>
    </tr>
  );
};

export default StudentRow;
