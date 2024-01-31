import { useReducer, useState, useRef } from "react";
import "./App.css";

function App() {
  const inputRef = useRef();
  const [tasks, dispatch] = useReducer((state = [], action) => {
    switch (action.type) {
      case "add_task":
        {
          return [
            ...state,
            {
              id: state.length,
              title: action.title,
            },
          ];
        }
      case 'remove_task': {

        return state.filter((task, index)=>{return index != action.index}); 
      }
      default:
        {
          return state;
        }
      
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "add_task",
      title: inputRef.current.value,
    });
    inputRef.current.value =''; 
  };
  return (
    <div>
      <h1>Lista de tareas</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="tarea">Tarea </label>
        <input type="text" name="title" ref={inputRef} />
        <input type="submit" value="Enviar" />
      </form>
      <div className="tasks">
        {
          tasks?.map((task, index)=>{
           return <div className="task" key={index}>
              <p>{task.title}</p>
              <button onClick={()=>dispatch({type:"remove_task", index: index})}>Borrar</button>
            </div>
          })
        }
      </div>
    </div>
  );
}

export default App;
