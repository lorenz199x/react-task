export const onGetExpenses = (args) => {
  return {
    type: 'FETCH_EXPENSES',
    payload: args
  }
}