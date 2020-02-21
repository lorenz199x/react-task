import React, { createContext, useState, useEffect } from 'react'
import uuid from 'uuid'
import ActionDAO from '../dao/ActionDao'
import { useImmer } from 'use-immer'
import { toast } from 'react-toastify'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearExpenses } from '../redux/actions/index';

let actionDao
export const TaskListContext = createContext()

const TaskListContextProvider = props => {
  const [tasks, setTasks] = useState([])
  const [editItem, setEditItem] = useState(null)

  const removeTask = key => {
    actionDao = new ActionDAO('Expenses')
    actionDao.deleteExpenses(key)
    toast.success('Expenses has been deleted.')
  }

  const clearList = () => {
    props.clearExpenses()
  }

  const findItem = key => {
    const item = props.expenses.find(expense => expense.key === key)
    setEditItem(item)
  }

  const editTask = (title, key) => {
    const newTasks = props.expenses.map(expense => (expense.key === key ? { title, key } : expense))
    setTasks(newTasks)
    setEditItem(null)
  }

  return (
    <TaskListContext.Provider value={{ removeTask, clearList, findItem, editTask, editItem }}>
      {props.children}
    </TaskListContext.Provider>
  )
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses.list
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    clearExpenses
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TaskListContextProvider);