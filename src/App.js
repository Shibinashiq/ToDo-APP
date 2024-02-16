import './App.css';
import { useState } from 'react';

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setTodo] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const removeTodo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
    // Clear editing state if the removed todo is being edited
    if (editId === id) {
      setEditId(null);
      setEditText('');
    }
  };

  const startEditing = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText('');
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
          value={toDo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="🖊️ Add item..."
        />
        <i
          onClick={() => {
            setTodos([...toDos, { id: Date.now(), text: toDo, status: false }]);
            setTodo(''); // Clear the input after adding a new item
          }}
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {toDos.map((item) => (
          <div className="todo" key={item.text}>
            <div className="left">
              <input
                onChange={(e) => {
                  setTodos((todos) =>
                    todos.map((todo) =>
                      todo.id === item.id ? { ...todo, status: e.target.checked } : todo
                    )
                  );
                }}
                checked={item.status}
                type="checkbox"
                name=""
                id={item.id}
              />
              {editId === item.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <p>{item.text}</p>
              )}
            </div>
            <div className="right">
              <i
                onClick={() => (editId === item.id ? saveEdit(item.id) : startEditing(item.id, item.text))}
                className={editId === item.id ? "fas fa-save" : "fas fa-edit"}
                style={{ cursor: 'pointer' }}
              ></i>
              <i
                onClick={() => removeTodo(item.id)}
                className="fas fa-times"
                style={{ cursor: 'pointer' }}
              ></i>
            </div>
          </div>
        ))}

        {toDos.map((item) => {
          if (item.status) {
            return <h3 key={item.id}>{item.text}</h3>;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;
