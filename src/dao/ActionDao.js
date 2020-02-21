import firebase from 'firebase/app'

class Actions {
  constructor(zone) {
    this.zone = zone;
    this.path = `${this.zone}`;
  }

  fetchExpenses(fnCallback) {
    this.getExpense = firebase.database().ref(`${this.path}`)
    this.getExpensesOff = this.getExpense.on('value', (snapshot) => {
      let snap = snapshot.val()
      let arr = []
      for (let key in snap) {
        let data = { ...snap[key] }
        data.key = key
        arr.push(data)
      }
      fnCallback(snap, arr)
    })
  }

  offGetExpenses() {
    this.getExpense && this.getExpense.off('value', this.getExpensesOff)
  }

  addNewExpenses(objInfo, fnCallback) {
    const addData = firebase.database().ref(`${this.path}/`)
    addData.push().set(objInfo).then(() => {
      fnCallback()
    })
  }

  updateExpenses(id, objInfo, fnCallback) {
    const updateData = firebase.database().ref(`${this.path}/${id}`)
    updateData.update(objInfo).then(() => {
      fnCallback()
    })
  }

  deleteExpenses(id, objInfo) {
    const deleteData = firebase.database().ref(`${this.path}/${id}`)
    deleteData.remove(objInfo)
  }

}

export default Actions;