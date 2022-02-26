import React from 'react'
import Todo from "./Todo"

export default function TodoList({ todos, toggleTodo }) {
  return (
    todos.map(todo => {
      //a unique key allows react to re-render only the things that have changed in our array, rather than re-render an entire array
      return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
    })
  )
}