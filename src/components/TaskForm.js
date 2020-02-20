import React,{ useContext, useState, useEffect } from 'react'
import { TaskListContext } from '../context/TaskListContext'

const TaskForm = () => {
  const { addTask, clearList, editTask, editItem } = useContext(TaskListContext)
  const [ title, setTitle ] = useState('')

  const handleChange = e => {
    setTitle(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if(!editItem){
      addTask(title)
      setTitle('')
    } else {
      editTask(title, editItem.id)
      // setTitle('')
    }
   
  }

  useEffect(() => {
    if(editItem !== null){
      setTitle(editItem.title)
    } else {
      setTitle('')
    }
  }, [editItem])

  return (
    <form onSubmit={handleSubmit} type='form'>
      <input onChange={handleChange} value={title} type='text' className='task-input' placeholder='Add Task...' required/>
      <div className='buttons'>
        <button type='submit' className='btn add-task-btn'>
        {
          editItem ? 'Edit task' : ' Add Task'
        }
        </button>

        <button className='btn clear-btn' onClick={clearList}>
          Clear
        </button>

      </div>
    </form>
  )
}


export default TaskForm