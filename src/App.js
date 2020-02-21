import React from 'react'
import TaskList from '../src/components/TaskList'
import TaskForm from '../src/components/TaskForm'
import Header from '../src/components/Header'
import TaskListContextProvider from '../src/context/TaskListContext'
import './App.css'
import firebase from './firebase'

const App = () => {
  return (
    <TaskListContextProvider>
      <div className='container'>
        <div className='app-wrapper'>
          <Header />
          <div className='main'>
            <TaskForm />
            <TaskList />
          </div>
        </div>
      </div>
    </TaskListContextProvider>
  )


}

export default App
