import React from "react";
import { useRemovePremiumStudent } from "../hooks/useUser";
import toast from "react-hot-toast";
import ButtonSpinner from "../../../components/ButtonSpinner";

const PremiumStudentRow = ({
  student: { name, email, account_id, user_type, id },
}) => {
  const { mutate: removePremiumUser, isLoading } = useRemovePremiumStudent();

  const handleRemovePremiumUser = async () => {
    removePremiumUser(id, {
      onSuccess: () => toast.success("Premium user removed successfully!"),
      onError: (error) => toast.error(error.message),
    });
  };
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {name}
      </th>
      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4">{account_id}</td>
      <td className="px-6 py-4">{user_type}</td>
      <td className="px-6 py-4">{id}</td>
      <td className="px-6 py-4">
        <button
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={() => handleRemovePremiumUser(id)}
        >
          Remove Premium
          {isLoading && <ButtonSpinner />}
        </button>
      </td>
    </tr>
  );
};

export default PremiumStudentRow;
