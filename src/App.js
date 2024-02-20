import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const addTodo = () => {
    if (editId !== null) {
      // If editing, update the existing todo
      setTodos((prevTodos) =>
        prevTodos.map((item) =>
          item.id === editId ? { ...item, list: todo } : item
        )
      );
      setEditId(null);
    } else {
      // If not editing, add a new todo
      setTodos([...todos, { list: todo, id: Date.now(), completed: false }]);
    }
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

  const onEdit = (id) => {
    const editTodo = todos.find((item) => item.id === id);
    setTodo(editTodo.list);
    setEditId(id);
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
              <i className="fas fa-edit" onClick={() => onEdit(item.id)}></i>
              <i onClick={() => onDelete(item.id)} className="fas fa-times"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
