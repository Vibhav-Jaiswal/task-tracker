import React, { useEffect, useState } from "react";
import { SiTicktick } from "react-icons/si";
import { TiDeleteOutline } from "react-icons/ti";

const App = () => {
  const [date, setDate] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = newTask;
    const updatedTaskList = [...taskList];
    updatedTaskList.push(task);
    setTaskList(updatedTaskList);
    localStorage.setItem("list", JSON.stringify(updatedTaskList));
  };

  const handleDelete = (idx) => {
     const newlist = taskList.filter((item) => item !== taskList[idx]);
     localStorage.setItem('list',newlist);
     setTaskList(newlist);
  };

  useEffect(() => {
    let savedList = JSON.parse(localStorage.getItem("list"));
    if (savedList) setTaskList(savedList);
  }, []);

  return (
    <>
      <h1 className="text-3xl sm:text-5xl text-center text-white font-semibold py-8">
        My Task Tracker
      </h1>
      <div className="sm:w-2/4 p-4 sm:p-8 m-4 sm:mx-auto bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <input
            className="p-2 rounded-lg text-lg"
            type="text"
            placeholder="Enter Your Task"
            required
            onChange={(e) => setNewTask(e.target.value)}
          />
          <input
            className="p-2 rounded-lg text-lg"
            type="date"
            required
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="bg-green-500 py-2 rounded-lg text-lg text-white font-bold hover:opacity-85">
            Add Task
          </button>
        </form>
        <div className="flex border-t-2 border-gray-500 my-8 pt-8">
          <select className="py-2 px-3 sm:px-6 rounded-lg text-lg font-bold hover:opacity-85">
            <option value="All">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        <div>
          {taskList.length > 0 &&
            taskList.map((item, i) => (
              <div
                className="flex justify-between bg-gray-500 p-4 items-center mb-4"
                key={i}
              >
                <span>
                  <p className="text-white text-lg pb-2">{item}</p>
                  <p className="text-white text-sm ">{item.date}</p>
                </span>
                <span className="flex gap-4 items-center">
                  <TiDeleteOutline
                    className="text-red-500 w-8 h-8 hover:opacity-85 cursor-pointer"
                    onClick={() => handleDelete(i)}
                  />
                  <SiTicktick className="text-green-500 w-6 h-6 hover:opacity-85 cursor-pointer" />
                </span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default App;
