import React, { useState, useEffect } from "react";
import { SiTicktick } from "react-icons/si";
import { TiDeleteOutline } from "react-icons/ti";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const App = () => {
  const [toggleButtonColor, setTtoggleButtonColor] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [screen, setScreen] = useState({
    incomplete: true,
    completed: false,
  });
  const [idx, setIdx] = useState(1);

  // Function to handle tab switch
  const handleTabSwitch = (isCompletedTab) => {
    if (isCompletedTab) {
      setScreen({ incomplete: false, completed: true });
      setTtoggleButtonColor(true)
    } else {
      setScreen({ incomplete: true, completed: false });
      setTtoggleButtonColor(false);
      window.location.reload();
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      id: `task-${idx}`,
      task: newTask,
      taskAddDate: new Date().toLocaleDateString(),
    };
    setIdx(idx + 1);
    const updatedTaskList = [...taskList, task];
    setTaskList(updatedTaskList);
    localStorage.setItem("list", JSON.stringify(updatedTaskList));
    setNewTask("");
  };

  // Function to handle task deletion
  const handleDelete = (idx) => {
    const newlist = taskList.filter((item) => item !== taskList[idx]);
    localStorage.setItem("list", JSON.stringify(newlist));
    setTaskList(newlist);
  };

  // Function to handle task completion
  const handleCompleted = (idx) => {
    const newCompletedTask = {
      ...taskList[idx],
      taskCompletedDate: new Date().toLocaleDateString(),
    };
    const newCompletedList = [...completedList, newCompletedTask];
    localStorage.setItem("completedList", JSON.stringify(newCompletedList));
    handleDelete(idx);
    setCompletedList(newCompletedList);
  };

  // Function to handle completed task deletion
  const handleCompletedDelete = (idx) => {
    const newCompletedList = completedList.filter(
      (item) => item !== completedList[idx]
    );
    localStorage.setItem("completedList", JSON.stringify(newCompletedList));
    setCompletedList(newCompletedList);
  };

  // Function to handle task reordering
  const handleDragEnd = (e) => {
    if (!e.destination) return;
    const updatedTasksList = [...taskList];
    const [selectedTask] = updatedTasksList.splice(e.source.index, 1);
    updatedTasksList.splice(e.destination.index, 0, selectedTask);

    setTaskList(updatedTasksList);
    localStorage.setItem("list", JSON.stringify(updatedTasksList));
  };

  // Initialize task list from localStorage on component mount
  useEffect(() => {
    const savedTaskList = JSON.parse(localStorage.getItem("list")) || [];
    const savedCompletedList =
      JSON.parse(localStorage.getItem("completedList")) || [];
    setTaskList(savedTaskList);
    setCompletedList(savedCompletedList);
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
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="bg-green-500 py-2 rounded-lg text-lg text-white font-bold hover:opacity-85">
            Add Task
          </button>
        </form>
        <div className="flex border-t-2 border-gray-500 my-8 pt-8">
          <button
            className={`${
              toggleButtonColor ? "bg-gray-500" : "bg-green-500"
            } py-2 px-2 sm:px-5 rounded-l-lg text-lg text-white font-bold hover:opacity-85`}
            onClick={() => handleTabSwitch(false)}
          >
            Incomplete
          </button>
          <button
            className={`${
              toggleButtonColor ? "bg-green-500 " : "bg-gray-500"
            } py-2 px-2 sm:px-5 rounded-r-lg text-lg text-white font-bold hover:opacity-85`}
            onClick={() => handleTabSwitch(true)}
          >
            Completed
          </button>
        </div>
        <div>
          {screen.incomplete && (
            <DragDropContext onDragEnd={handleDragEnd}>
              {taskList.length > 0 && (
                <Droppable droppableId="task-list">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {taskList.map((item, i) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={i}
                        >
                          {(provided) => (
                            <div
                              className="flex justify-between bg-gray-500 p-4 items-center mb-4 rounded-lg shadow-inner"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <span>
                                <p className="text-white text-lg pb-2">
                                  {item.task}
                                </p>
                                <p className="text-white text-sm ">
                                  {item.taskAddDate}
                                </p>
                              </span>
                              <span className="flex flex-col sm:flex-row gap-4 items-center">
                                <TiDeleteOutline
                                  className="text-red-500 w-8 h-8 hover:opacity-85 cursor-pointer"
                                  onClick={() => handleDelete(i)}
                                />
                                <SiTicktick
                                  className="text-green-500 w-6 h-6 hover:opacity-85 cursor-pointer"
                                  onClick={() => handleCompleted(i)}
                                />
                              </span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </DragDropContext>
          )}
          {completedList.length > 0 &&
            screen.completed &&
            completedList.map((item, i) => (
              <div
                className="flex justify-between bg-gray-500 p-4 items-center mb-4 rounded-lg shadow-inner"
                key={i}
              >
                <span>
                  <p className="text-white text-lg pb-2">{item.task}</p>
                  <p className="text-white text-sm ">{`${item.taskAddDate} - ${item.taskCompletedDate}`}</p>
                </span>
                <span className="flex gap-4 items-center">
                  <TiDeleteOutline
                    className="text-red-500 w-8 h-8 hover:opacity-85 cursor-pointer"
                    onClick={() => handleCompletedDelete(i)}
                  />
                </span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default App;
