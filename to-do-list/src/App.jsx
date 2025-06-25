import { useState } from 'react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState("");
  // Change items to be objects with text and completed status
  const [items, setItems] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    if (inputText.trim() !== "") {
      setItems(prevItems => {
        return [...prevItems, { text: inputText, completed: false }];
      });
      setInputText("");
    }
  }

  function deleteItem(index) {
    setItems(prevItems => {
      return prevItems.filter((item, i) => i !== index);
    });
  }

  // New function to toggle completion status
  function toggleComplete(index) {
    setItems(prevItems => {
      return prevItems.map((item, i) => {
        if (i === index) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });
    });
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addItem();
    }
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input 
          onChange={handleChange} 
          onKeyPress={handleKeyPress}
          type="text" 
          value={inputText}
          placeholder="Enter a task..."
        />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <li 
              key={index} 
              className={todoItem.completed ? 'completed' : ''}
              onClick={() => toggleComplete(index)}
            >
              <span className="todo-text">
                {todoItem.text}
              </span>
              <button 
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the li click
                  deleteItem(index);
                }}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
      {items.length > 0 && (
        <div className="stats">
          <p>
            {items.filter(item => item.completed).length} of {items.length} tasks completed
          </p>
        </div>
      )}
    </div>
  );
}

export default App