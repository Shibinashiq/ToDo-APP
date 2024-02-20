import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addTodo = () => {
    setTodos([...todos, { list: todo, id: Date.now(), completed: false }]);
    setTodo('');
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const onDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="🖊️ Add item..."
          value={todo}
          ref={inputRef}
          onChange={(e) => setTodo(e.target.value)}
        />
        <i className="fas fa-plus" onClick={addTodo}></i>
      </div>
      <div className="todos">
        {todos.map((item, index) => (
          <div className="todo" key={index}>
            <div className="left">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTodo(item.id)}
              />
              <p style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.list}
              </p>
            </div>
            <div className="right">
              <i className="fas fa-edit"></i>
              <i onClick={() => onDelete(item.id)} className="fas fa-times"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
