import React from "react";
import ShowTasks from "./ShowTasks";
import { useState } from "react";

const Tasks = ({ tasks, setTasks }) => {
  const [isAddEnabled, setIsAddEnabled] = useState(false);
  const [task, setTask] = useState("");

  const toggleAdd = () => {
    setIsAddEnabled(!isAddEnabled);
  };

  const addTask = (e) => {
    e.preventDefault();
    setIsAddEnabled(false);

    if (!task) {
      alert("Please Enter Valid Input!");
    } else {
      const id = (5 * Math.random() + 3).toString();

      const tmp = { id: id, text: task };
      console.log(tmp);

      setTasks([...tasks, tmp]);
      console.log(tasks);

      setTask("");
    }
  };

  const deleteTask = (id) => {
    const tmp = tasks.filter((e) => e.id !== id);
    setTasks([...tmp]);
  };

  return (
    <div>
      <ShowTasks tasks={tasks} deleteTask={deleteTask}></ShowTasks>

      <div className="addTask">
        {" "}
        <button className="addTaskButton" onClick={toggleAdd}>
          Add
        </button>
        <br />
        {isAddEnabled && (
          <form onSubmit={addTask}>
            <input
              type="text"
              placeholder="Enter data here"
              onChange={(e) => {
                setTask(e.target.value);
                console.log(task);
              }}
            />
            <button>save</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Tasks;
