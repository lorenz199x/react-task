export const onGetExpenses = (args) => {
  return {
    type: 'FETCH_EXPENSES',
    payload: args
  }
}

export const clearExpenses = () => {
  return {
    type: 'CLEAR_EXPENSES'
  }
}