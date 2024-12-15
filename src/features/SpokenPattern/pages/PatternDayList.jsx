import React, { useState } from "react";
import Container from "../../../components/Container";

import toast from "react-hot-toast";

import ButtonSpinner from "../../../components/ButtonSpinner";
import { usePatternDayList } from "../hooks/usePatternDayList";
import { useNavigate } from "react-router-dom";

const DayItem = ({ title, onClick, className }) => (
  <div
    role="button"
    aria-label={title}
    onClick={onClick}
    className={`flex cursor-pointer items-center justify-center px-6 py-8 border rounded-md bg-[#0496C7] text-white hover:bg-[#0496c7e2] font-bold ${className}`}
  >
    {title}
  </div>
);

const PatternDayList = () => {
  const navigate = useNavigate();
  const { days, isLoading, error, addPatternDay } = usePatternDayList();
  const [newOrderNumber, setNewOrderNumber] = useState("");
  const [addingLoading, setAddingLoading] = useState(false); // Adding new loading state

  const handleAddDay = async () => {
    if (!newOrderNumber) {
      toast.error("Please enter a valid order number.");
      return;
    }

    try {
      setAddingLoading(true); // Start loading
      await addPatternDay(parseInt(newOrderNumber, 10));
      setNewOrderNumber(""); // Clear input on success
    } catch (err) {
      toast.error(err.message);
    } finally {
      setAddingLoading(false); // Stop loading
    }
  };

  if (isLoading) return <p>Loading days...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section>
      <Container className={"flex flex-col gap-4 px-6 md:px-0"}>
        <h1 className="text-2xl font-bold mt-6">Pattern Day List</h1>
        <div className="flex justify-end gap-4">
          <input
            type="number"
            id="input-group-1"
            value={newOrderNumber}
            onChange={(e) => setNewOrderNumber(e.target.value)}
            className="bg-gray-50 border min-w-52 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Order number..."
            min="1"
          />
          <button
            className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={handleAddDay}
            disabled={addingLoading} // Disable button while adding
          >
            add New Day
            {addingLoading && <ButtonSpinner />}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
          {days?.map((day) => (
            <DayItem
              key={day.id}
              title={`Day ${day.order_number}`}
              onClick={() => {
                navigate(`/lesson-and-exercise-list/${day.id}`);
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PatternDayList;
