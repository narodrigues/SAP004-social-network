import { getUserInfos, editUserInfos } from "./data.js";

export const userProfilePage = () => {
  const profilePage = document.createElement('div');
  profilePage.classList.add('wrap-desk', 'page-feed', 'pages');
  window.location.href = '#profile'
  profilePage.innerHTML = `
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
  
  getUserInfos().then((arrayPosts) => {
    arrayPosts.forEach((doc) => {
      let infos = doc.data();
      profilePage.innerHTML += `
      <div class='divToClose'>
        <aside class='profile-infos div-infos'>
          <figure>
            <img src='' alt='Foto de perfil'>
          </figure>
          <span>${firebase.auth().currentUser.displayName}</span>
          <nav>
            <ul>
              <li><a href='#'>Perfil</a></li>
              <li><a href='#'>Meus Posts</a></li>
            </ul>
          </nav>
        </aside>
      
        <main id='main-user-posts'>
          <article id='user-posts-container'></article>
        </main>
      
        <main id='user-information' class='container'>
          <section class='personal-infos div-infos'>
              <div class='info-profile-option'>
                <h1>Informações pessoais</h1>
                <div class='edit-user-btn'>            
                    <button class='btn-icon'><i class="fas fa-user-edit icon"></i></button>
                    <button class='btn-icon i-none'><i class="fas fa-user-check icon"></i></button>
                </div>
              </div>
              <div class='info-user-div'>
                <span>Nome e Sobrenome:</span>
                <textarea disabled>${infos.firstName} ${infos.lastName}</textarea>
              </div>
              <div class='info-user-div'>
                <span>Idade:</span>
                <textarea disabled>${infos.age}</textarea>
              </div>
              <div class='info-user-div'>
                <span>Sexo:</span>
                <select id='gender' disabled>
                  <option value='female'>Feminino</option>
                  <option value='male'>Masculino</option>
                  <option value='prefer-not-inform'>Prefiro não informar</option>
                  <option value='others'>Outros</option>
                </select>
                </div>
              <div class='info-user-div'>
                <span>Email:</span>
                <textarea disabled>${firebase.auth().currentUser.email}</textarea>
              </div>
          </section>
          <section class='additional-infos div-infos'>
            <div class='info-profile-option'>
              <h1>Informações adicionais</h1>
              <div class='edit-user-btn'>            
                  <button class='btn-icon'><i class="fas fa-user-edit icon"></i></button>
                  <button class='btn-icon i-none'><i class="fas fa-user-check icon"></i></button>
              </div>
            </div>
            <form action=''>
              <div class='info-user-div'>
                <span>Status:</span>
                <textarea id='change-status' disabled>${infos.bio}</textarea>
              </div>
              <label for='relationship-state'>Relacionamento:</label>
              <select id='relationship-state' disabled>
                <option value='single'>Solteira</option>
                <option value='married'>Casada</option>
                <option value='serious-relationship'>Relacionamento sério</option>
                <option value='others'>Outros</option>
              </select>
              <div class='info-user-div'>
                <span>Sobre você:</span>
                <textarea id='about-user' disabled>${infos.about}</textarea>
              </div>
            </form>
          </section>
        </main>
      </div>
      `
    })
  })

  setTimeout(function(){
  const menu = profilePage.querySelector('.nav-main');
  const divToClose = profilePage.querySelector('.divToClose');

  profilePage.querySelector('#openMenu').addEventListener('click', () => {
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
      divToClose.addEventListener('click', closeNav, true);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      menu.style.display = 'block';
    } else {
      closeNav();
    }
  });

  const closeNav = () => {
    menu.style.display = 'none';
  }}, 1000)


  return profilePage;
}