import React,{useState} from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const addTodo = () => {
  if (input.trim()) {
    setTodos([...todos, { text: input, completed: false }]);
    setInput('');
  }
};


   const pressEnter = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
   };


   const toggleDone = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };
  return(
    <div className="todo-page">
      <div className='todo-container'>
      <h1 className='heading'>Todo List</h1>
      <div className='todo-input'>
        <input className='input-box' type="text" value={input} 
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={pressEnter}
        placeholder="Add a new task" />
        <button
         onClick={addTodo}
        className='add-button'>Add</button>
      </div>

      <ul className='todo-list'>
        {todos.map((todo, index) => (
          <li key={index} className='todo-item'>
             <span className={todo.completed ? 'completed' : ''}>
                {todo.text}
              </span>
             <div className='todo-actions'>
    <button className='done-button' onClick={() => toggleDone(index)}>Mark as Done</button>
    <button className='delete-button' onClick={() => deleteTodo(index)}>Delete</button>
  </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default App;
