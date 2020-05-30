import { signIn } from './pages/login/main.js';
import { inscribePage } from './pages/register/main.js';
import { teste } from './pages/home/main.js';

const root = document.querySelector('#root');

const init = () => {
  window.addEventListener("hashchange", () => {
    root.innerHTML = "";
    switch(window.location.hash){
      case "#login":
        root.appendChild(signIn());
        break;
      case "#register":
        root.appendChild(inscribePage());
        break;
      case "#teste":
        root.appendChild(teste());
        break;
      default:
        root.appendChild(signIn());
        break;
    }
  });
}

window.addEventListener("load", () => {
  root.appendChild(signIn());
  init();
});

