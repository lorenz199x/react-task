import React, { createContext, useState, useEffect } from 'react'
import uuid from 'uuid'
import ActionDAO from '../dao/ActionDao'
import { useImmer } from 'use-immer'
import { toast } from 'react-toastify'
import { connect } from 'react-redux';

let actionDao
export const TaskListContext = createContext()

const TaskListContextProvider = props => {
  // const localState = JSON.parse(localStorage.getItem('tasks')) || []
  // localStorage.setItem('tasks', JSON.stringify(tasks))

  const [tasks, setTasks] = useState([])
  const [editItem, setEditItem] = useState(null)

  const removeTask = key => {
    actionDao = new ActionDAO('Expenses')
    actionDao.deleteExpenses(key)
    toast.success('Expenses has been deleted.')
  }

  const clearList = () => {
    setTasks([])
  }

  const findItem = key => {
    const item = props.expenses.find(expense => expense.key === key)
    setEditItem(item)
  }

  const editTask = (title, key) => {
    const newTasks = props.expenses.map(expense => (expense.key === key ? { title, key } : expense))
    setTasks(newTasks)
    setEditItem(null) // for clearing input
  }

  return (
    <TaskListContext.Provider value={{ removeTask, clearList, findItem, editTask, editItem }}>
      {props.children}
    </TaskListContext.Provider>
  )
}


// export default TaskListContextProvider

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses.list
  }
}

export default connect(mapStateToProps, null)(TaskListContextProvider);