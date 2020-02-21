let initialState = {
  list: [],
  title: '',
}

function expenseReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_EXPENSES': {
      return {
        ...state,
        list: action.payload
      }
    }

    case 'ADD_EXPENSE': {
      console.log('payload', action.payload)
      return {
        ...state,
        list: [...state.list, action.payload],
      }
    }

    case 'DELETE_TITLE': {
      return {
        list: action.payload
      }
    }

    default:
      return state
  }
}

export default expenseReducer;