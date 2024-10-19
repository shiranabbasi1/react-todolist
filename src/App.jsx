import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {

  const [todos, setTodos] = useState([]);

  const [todo, setTodo] = useState("");
  const [index, setIndex] = useState(-1);

  function persistData(newTodoList) {
    localStorage.setItem("todos", JSON.stringify(newTodoList));
  }

  function handleAddTodo(newTodo) {
    if (index < 0) {
      const newTodoList = [...todos, newTodo];
      persistData(newTodoList);
      setTodos(newTodoList);
    } else {
      const newTodoList = [...todos];
      newTodoList.splice(index, 0, newTodo);
      persistData(newTodoList);
      setTodos(newTodoList);
      setIndex(-1);
    }
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => (todoIndex != index));
    setTodos(newTodoList);
    persistData();
  }

  function handleEditTodo(index) {
    const todoToEdit = todos[index];
    setIndex(index);
    setTodo(todoToEdit);
    handleDeleteTodo(index);
  }

  useEffect(() => {
    if (!localStorage) {
      return;
    }

    const localTodos = localStorage.getItem("todos");
    if (!localTodos) {
      return;
    }

    setTodos(JSON.parse(localTodos));

  }, []);

  return (
    <>
      <TodoInput handleAddTodo={handleAddTodo} todo={todo} setTodo={setTodo} />
      <TodoList todos={todos} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} />
    </>
  )
}

export default App
