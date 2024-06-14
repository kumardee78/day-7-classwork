import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState([]);

  function handleTask() {
    if (inputValue === "") {
      alert("Please Enter your Task");
    } else {
      let obj = {};
      obj.task = inputValue;
      obj.id = Date.now();
      setTask([...task, obj]);
    }
    setInputValue("");
  }

  function handleDelete(index) {
    setTask(
      task.filter((task) => {
        return task.id !== index;
      })
    );
  }
  
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTask(storedTasks);
    }
}, []);

// Save tasks to localStorage whenever tasks change
useEffect(() => {
  if(task.length > 0) localStorage.setItem('tasks', JSON.stringify(task));
}, [task]);

  

  return (
    <div className="my-32 py-8 w-1/2 mx-auto text-center shadow-xl bg-[whiteSmoke]">
      <h1 className="text-3xl font-bold mb-8">Glossery Buds</h1>
      <input
        className="border-2 mr-6 w-[16rem] px-2 py-1"
        type="text"
        placeholder="Add a task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={handleTask}
        className="border py-1 px-4 bg-red-600 text-white"
      >
        Add task
      </button>
      <div className="py-4 border my-4 text-start px-2 w-1/2 mx-auto">
        {task.map((item) => {
          return (
            <p key={item.id} className="flex gap-8">
              {item.task}
              <FaTrash onClick={() => handleDelete(item.id)} />
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default App;
