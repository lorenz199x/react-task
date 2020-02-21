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
    date: '',
    decription: '',
    value: ''
  }
  const { clearList, editTask, editItem } = useContext(TaskListContext)
  const [title, setTitle] = useState('')
  const [state, setState] = useImmer(initialState)

  const handleChange = e => {
    // console.log('change', e.target.value)
    setTitle(e.target.value)
    // setState(draft => {
      // draft[e.target.name] = e.target.value
    // })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!editItem) {
      actionDao = new ActionDAO('Expenses')
      
      let uid = uuid()
      let objInfo = {
        id: uid,
        title,
        category: 'HD',
        decription: 'lorem ipsum',
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        value: '100',
      }
      actionDao.addNewExpenses(objInfo, () => {
        toast.success('Expenses has been added.')
      })
      setTitle('')
    } else {
      
      actionDao = new ActionDAO('Expenses')
      let key = editItem.key
      let objInfo = {
        id: editItem.id,
        title: title,
        category:  editItem.category,
        decription: editItem.decription,
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        value:  editItem.value
      }

      actionDao.updateExpenses(key, objInfo,() => {
        toast.success('Expenses has been updated.')
      })
      setTitle('')
    }

  }

  useEffect(() => {
    if (editItem !== null) {
      setTitle(editItem.title)
    } else {
      setTitle('')
    }
  }, [editItem])

  return (
    <form onSubmit={handleSubmit} type='form'>
      <input onChange={handleChange} value={title} type='text' className='task-input' placeholder='Title' required />

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