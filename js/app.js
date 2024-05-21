import Model from './model/model.js';
import View from './view/view.js';
import Controller from './controller/controller.js';

document.addEventListener('DOMContentLoaded', () => {
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);
});
