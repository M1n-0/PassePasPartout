class View {
    constructor() {
      this.app = document.getElementById('app');
  
      this.form = document.getElementById('addPasswordForm');
      this.website = document.getElementById('website');
      this.username = document.getElementById('username');
      this.password = document.getElementById('password');
      this.generateButton = document.getElementById('generatePassword');
      this.passwordList = document.getElementById('passwordList');
    }
  
    get _website() {
      return this.website.value;
    }
  
    get _username() {
      return this.username.value;
    }
  
    get _password() {
      return this.password.value;
    }
  
    resetInput() {
      this.website.value = '';
      this.username.value = '';
      this.password.value = '';
    }
  
    displayPasswords(passwords) {
      while (this.passwordList.firstChild) {
        this.passwordList.removeChild(this.passwordList.firstChild);
      }
  
      passwords.forEach((password, index) => {
        const li = document.createElement('li');
        li.textContent = `${password.website} - ${password.username} - ${password.password}`;
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.classList.add('delete-button');
        deleteButton.dataset.index = index;
  
        li.append(deleteButton);
        this.passwordList.append(li);
      });
    }
  
    bindAddPassword(handler) {
      this.form.addEventListener('submit', event => {
        event.preventDefault();
  
        if (this._website && this._username && this._password) {
          handler({
            website: this._website,
            username: this._username,
            password: this._password
          });
          this.resetInput();
        }
      });
    }
  
    bindDeletePassword(handler) {
      this.passwordList.addEventListener('click', event => {
        if (event.target.className === 'delete-button') {
          const index = event.target.dataset.index;
          handler(index);
        }
      });
    }
  
    bindGeneratePassword(handler) {
      this.generateButton.addEventListener('click', event => {
        this.password.value = handler();
      });
    }
  }
  
  export default View;
  