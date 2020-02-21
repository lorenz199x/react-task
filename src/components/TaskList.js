import React, { useContext, useEffect } from 'react'
import { TaskListContext } from '../context/TaskListContext'
import Task from './Task'
import ActionDAO from '../dao/ActionDao'
import { useImmer } from 'use-immer'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onGetExpenses } from '../redux/actions/index';

let actionDao
const TaskList = (props) => {
  const initialState = {
    expense: []
  }
  const [state, setState] = useImmer(initialState)

  useEffect(() => {
    actionDao = new ActionDAO('Expenses')
    actionDao.fetchExpenses((obj, arr) => {
      props.onGetExpenses(arr)
    })
  }, [])

  return (
    <div>
      {
        props.expenses && props.expenses.length !== null ? (
          <ul className='list'>
            {props.expenses.map((expense, index) => {
              return <Task expense={expense} key={expense.key} />
            })}
          </ul>
        ) : (
            <div className='no-task'>No Data</div>
          )
      }
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    expenses: state.expenses.list
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    onGetExpenses
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TaskList);