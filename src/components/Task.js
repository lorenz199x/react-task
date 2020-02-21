import React, { useContext } from 'react'
import TaskListContextProvider, { TaskListContext } from '../context/TaskListContext'

const Task = ({expense}) => {
  const { removeTask, findItem } = useContext(TaskListContext)
  return (
    <div>
      <li className='list-item'>
        <span>{expense.title}</span>
        <div>
          <button className='btn-delete task-btn' onClick={() => removeTask(expense.key)}>
            <i className='fas fa-trash-alt'></i>
          </button>

          <button className='btn-edit task-btn' onClick={() => findItem(expense.key)}>
            <i className='fas fa-pen'></i>
          </button>

        </div>
      </li>
    </div>
  )
}

export default Task
