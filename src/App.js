import React, {useState, useRef, useEffect} from 'react';
import TodoList from "./TodoList"
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'


function App() {
  //useState returns an array
  //we destructure the array - object destructuring
  //the first variable todos is every one of the todos
  //the second variable is the FUNCTION we call to UPDATE the todos
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  //LOAD todos
  //we want this useEffect to run once (only) to load our array of todos
  //we set our todos to what we get back from stored todos if there are stored todos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos)
      setTodos(storedTodos)
  }, [])

  //SAVE todos
  //useEffect is a function that takes another function as a perameter
  //we determine when useEffect runs by passing in an array of dependencies
  //anytime a dependency changes, eseEffect runs
  //anytime our array of todos changes, useEfect runs to save our todos to local
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])


  function toggleTodo(id) {
    //here we make a copy of our current todos list
    //this is so we don't modify the existing list
    //in react you should not modify a state variable, make a copy
    //and use the copy to set the new state
    const newTodos = [...todos]
    //here we get the todo we want to modify
    //we find a todo tjhat ha the same id as the ide we passed into handleToggleTodo
    const todo = newTodos.find(todo => todo.id === id)
    //this allows us to toggle the todo from complete to incomplete and vv
    todo.complete = !todo.complete
    setTodos(newTodos) 
    //we have to pass this function down to our todoList as a prop
  }
  
  //in this function we need to take our previous todos, add a new todo, 
  //then set our todos to a new todo list
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    //if name is empty just return
    if (name === '') return
    //prevTodos is a function call that allows us to set our todos
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    //clears the input
    todoNameRef.current.value = null
}

function handleClearTodos(todo) {
  //we are setting our todos to a new list that only includes imcomplete todos
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos)
}

  return (
    <>
    {/* putting the prop todos to the list component */}
    <TodoList toggleTodo={toggleTodo} todos={todos} />
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do!</div>
    </>
  )
}

export default App;
