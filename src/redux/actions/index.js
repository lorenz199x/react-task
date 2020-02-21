export const onGetExpenses = (args) => {
  return {
    type: 'FETCH_EXPENSES',
    payload: args
  }
}

export const addExpense = (args) => {
  return {
    type: 'ADD_EXPENSE',
    payload: args
  }
}