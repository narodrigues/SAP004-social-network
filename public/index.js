import { signInPage } from './pages/login/main.js';
import { inscribePage } from './pages/register/main.js';
import { feed } from './pages/home/main.js';

const root = document.querySelector('#root');

const init = () => {
  window.addEventListener("hashchange", () => {
    root.innerHTML = "";
    switch(window.location.hash){
      case "#login":
        root.appendChild(signInPage());
        break;
      case "#register":
        root.appendChild(inscribePage());
        break;
      case "#feed":
        root.appendChild(feed());
        break;
      default:
        root.appendChild(signInPage());
        break;
    }
  });
}

window.addEventListener("load", () => {
  root.appendChild(signInPage());
  init();
});

