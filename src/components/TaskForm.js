import React, { useContext, useState, useEffect } from 'react'
import firebase from 'firebase'
import { toast } from 'react-toastify'
import moment from 'moment'
import ActionDAO from '../dao/ActionDao'
import { TaskListContext } from '../context/TaskListContext'
import uuid from 'uuid'
import { useImmer } from 'use-immer'

let actionDao
const TaskForm = () => {
  const initialState = {
    title: '',
    category: '',
    decription: '',
    dataValue: ''
  }
  const { clearList, editItem } = useContext(TaskListContext)
  const [state, setState] = useImmer(initialState)

  const handleChange = (name, value) => {
    setState(draft => {
      draft[name] = value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!editItem) {
      actionDao = new ActionDAO('Expenses')
      
      let uid = uuid()
      let objInfo = {
        id: uid,
        title: state.title,
        category: state.category,
        decription: state.decription,
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        value: state.dataValue,
      }
      actionDao.addNewExpenses(objInfo, () => {
        toast.success('Expenses has been added.')
      })
    } else {
      actionDao = new ActionDAO('Expenses')
      let key = editItem.key
      let objInfo = {
        id: editItem.id,
        title: state.title,
        category:  state.category,
        decription: state.decription,
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        value:  state.dataValue
      }
      actionDao.updateExpenses(key, objInfo,() => {
        toast.success('Expenses has been updated.')
      })
    }
    clearFields()
  }

  const clearFields = () => {
    setState(draft => {
      draft.title = ''
      draft.category = ''
      draft.decription = ''
      draft.dataValue = ''
    })
  }

  useEffect(() => {
    if (editItem !== null) {
      setState(draft => {
        draft.title = editItem.title
        draft.category = editItem.category
        draft.decription = editItem.decription
        draft.dataValue = editItem.value
      })
    } else {
      clearFields()
    }
  }, [editItem])

  return (
    <form onSubmit={handleSubmit} type='form'>
      <input onChange={(e) => handleChange('title', e.target.value)} name='title' value={state.title} type='text' className='task-input' placeholder='Title' required />
      <input onChange={(e) => handleChange('category', e.target.value)} name='category' value={state.category} type='text' className='task-input' placeholder='Category' required />
      <input onChange={(e) => handleChange('decription', e.target.value)} name='description' value={state.decription} type='text' className='task-input' placeholder='Description' required />
      <input onChange={(e) => handleChange('dataValue', e.target.value)} name='dataValue' value={state.dataValue} type='text' className='task-input' placeholder='Value' required />

      <div className='buttons'>
        <button type='submit' className='btn add-task-btn'>
          { editItem ? 'Edit task' : ' Add Task' }
        </button>
        <button className='btn clear-btn' onClick={clearList}>
          Clear
        </button>

      </div>
    </form>
  )
}


export default TaskForm