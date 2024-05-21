class Controller {
    constructor(model, view) {
      this.model = model;
      this.view = view;
  
      this.view.bindAddPassword(this.handleAddPassword.bind(this));
      this.view.bindDeletePassword(this.handleDeletePassword.bind(this));
      this.view.bindGeneratePassword(this.handleGeneratePassword.bind(this));
  
      this.onPasswordListChanged(this.model.passwords);
      this.model.bindPasswordListChanged(this.onPasswordListChanged.bind(this));
    }
  
    onPasswordListChanged(passwords) {
      this.view.displayPasswords(passwords);
    }
  
    handleAddPassword(password) {
      this.model.addPassword(password);
    }
  
    handleDeletePassword(index) {
      this.model.deletePassword(index);
    }
  
    handleGeneratePassword() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let password = '';
      for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return password;
    }
  }
  
  export default Controller;
  