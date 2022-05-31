import React from "react";
import "./App.css";
import { Card, Form } from 'react-bootstrap';
import { Button } from "@mui/material";
import {useState, useEffect } from 'react';



function App() {

  const [todos, setTodos] = useState([
    {
      text: "This is a sample todo",
      isDone: false
    }
  ]);

  useEffect(() => {
    const oldTodos = localStorage.getItem('todo');
  } ,[])


  const addTodo = text => {
    const oldTodos = localStorage.getItem('todo');
    const newTodos = [...todos,  { text }];
    localStorage.setItem('todo',newTodos);
    setTodos(newTodos);
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    localStorage.setItem('todo',newTodos);
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    localStorage.setItem('todo',newTodos);
    setTodos(newTodos);
  };

  function Todo({ todo, index, markTodo, removeTodo }) {
    return (
      <div
        className="todo"
        
      >
        <span style={{ border:"1px solid black", textDecoration: todo.isDone ? "line-through" : "" , backgroundColor: todo.isDone ? "rgb(0, 168, 8)" : "rgba(218, 141, 0, 0.993)"}}>{todo.text}</span>
        <div>
        <Button variant="outlined" style={{ color: "purple", backgroundColor:"green", marginTop: "3px"}}  onClick={() => markTodo(index)}>✓</Button>{' '}
          <Button variant="outlined" style={{ color: "orange", backgroundColor:"red"}} onClick={() => removeTodo(index)}>✕</Button>
        </div>
      </div>
    );
  }
  
  function FormTodo({ addTodo }) {
    const [value, setValue] = useState("");
  
    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue("");
    };
  
    return (
      <Form onSubmit={handleSubmit}> 
      <Form.Group>
        <Form.Label><b>Add To-do</b></Form.Label>
        <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new to-do" />
      </Form.Group>
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Form>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;