let initialState = {
  list: [],
}

function expenseReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_EXPENSES': {
      return {
        ...state,
        list: action.payload
      }
    }

    case 'CLEAR_EXPENSES': {
      return initialState
    }

    default:
      return state
  }
}

export default expenseReducer;