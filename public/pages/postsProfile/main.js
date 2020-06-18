// import { } from "./data.js";

export const userProfilePageWithPosts = () => {
  const profilePagePosts = document.createElement('div');
  profilePagePosts.classList.add('page-feed', 'pages');
  window.location.href = '#profile-posts'
  profilePagePosts.innerHTML = `
  <header class="header-catarse">
    <button class="btn-icon" id="openMenu"><i class="fas fa-bars icon menu"></i></button>
    <nav class="nav-main">
      <ul>
        <li><a href="#feed">Feed</a></li>
        <li id="signOut">Sair</li>
      </ul>
    </nav>
    <img src="./assets/feed-logo.png">
  </header>
  `

  profilePagePosts.innerHTML += `
      <div class='divToClose wrap-desk'>
        <div class='profile-container container'>
          <aside class='profile-infos div-infos'>
            <figure>
              <img src='' alt='Foto de perfil'>
            </figure>
            <span>${firebase.auth().currentUser.displayName}</span>
            <nav>
              <ul>
                <li><a href='#profile'>Perfil</a></li>
                <li><a href='#profile-posts'>Meus Posts</a></li>
              </ul>
            </nav>
          </aside>
        </div>
      `


  // setTimeout(() => {
  //   const menu = profilePagePosts.querySelector('.nav-main');
  //   const divToClose = profilePagePosts.querySelector('.divToClose');

  //   profilePagePosts.querySelector('#openMenu').addEventListener('click', () => {
  //     menu.classList.toggle('display-block');
  //   });

  //   divToClose.addEventListener('click', () => {
  //     menu.classList.remove('display-block');
  //   });

  //   window.addEventListener('resize', () => {
  //     if (window.innerWidth >= 768) {
  //       menu.classList.add('display-block');
  //     } else {
  //       menu.classList.toggle('display-block');
  //     }
  //   });
  // });

  return profilePagePosts
}