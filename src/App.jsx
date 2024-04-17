import React, { useState } from "react";

const App = () => {
  const [date, setDate] = useState(null);
  const [toggleButtonColor, setTtoggleButtonColor] = useState(false);
  return (
    <>
      <h1 className="text-5xl text-center text-white font-semibold py-8">
        My Task Tracker
      </h1>
      <div className="sm:h-96 sm:w-2/5 p-8 mx-2 sm:mx-auto bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
        <form className="flex flex-col gap-4 ">
          <input
            className="p-2 rounded-lg text-lg"
            type="text"
            placeholder="Enter Your Task"
            required
          />
          <input className="p-2 rounded-lg text-lg" type="date" required />
          <button className="bg-green-500 py-2 rounded-lg text-lg text-white font-bold hover:opacity-85">
            Add Task
          </button>
        </form>
        <div className="flex border-t-2 border-gray-500 my-8 pt-8">
          <button
            className={`${
              toggleButtonColor ? "bg-gray-500" : "bg-green-500"
            } py-2 px-2 sm:px-5 rounded-l-lg text-lg text-white font-bold hover:opacity-85`}
            onClick={() => setTtoggleButtonColor(false)}
          >
            Incomplete
          </button>
          <button
            className={`${
              toggleButtonColor ? "bg-green-500 " : "bg-gray-500"
            } py-2 px-2 sm:px-5 rounded-r-lg text-lg text-white font-bold hover:opacity-85`}
            onClick={() => setTtoggleButtonColor(true)}
          >
            Completed
          </button>
        </div>
        <div>
          <p>Task 1</p>
        </div>
      </div>
    </>
  );
};

export default App;
