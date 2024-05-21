class Model {
    constructor() {
      this.passwords = JSON.parse(localStorage.getItem('passwords')) || [];
    }
  
    bindPasswordListChanged(callback) {
      this.onPasswordListChanged = callback;
    }
  
    _commit(passwords) {
      this.onPasswordListChanged(passwords);
      localStorage.setItem('passwords', JSON.stringify(passwords));
    }
  
    addPassword(password) {
      this.passwords.push(password);
      this._commit(this.passwords);
    }
  
    deletePassword(index) {
      this.passwords.splice(index, 1);
      this._commit(this.passwords);
    }
  }
  
  export default Model;
  