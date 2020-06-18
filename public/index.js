import { signInPage } from './pages/login/main.js';
import { inscribePage } from './pages/register/main.js';
import { feed } from './pages/feed/main.js';
import { userProfilePage } from './pages/profile/main.js';
import { userProfilePageWithPosts } from './pages/postsProfile/main.js';

const root = document.querySelector('#root');

const init = () => {
  firebase.auth().onAuthStateChanged((user) => {
    const currentHash = window.location.hash;
    root.innerHTML = '';
    if (user) {
      switch (currentHash) {
        case '#login':
          root.appendChild(signInPage());
          break;
        case '#register':
          root.appendChild(inscribePage());
          break;
        case '#feed':
          root.appendChild(feed());
          break;
        case '#profile':
          root.appendChild(userProfilePage());
          break;
          case '#profile-posts':
            root.appendChild(userProfilePageWithPosts());
          break;
        default:
          root.appendChild(feed());
      }
    } else if (!user) {
      switch (currentHash) {
        case '#register':
          root.appendChild(inscribePage());
          break;
        default:
          root.appendChild(signInPage());
      }
    }
  });
};

window.addEventListener('load', init);

window.addEventListener('hashchange', () => {
  init()
}, false);
