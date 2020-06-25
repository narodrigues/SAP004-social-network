import {
  getUserInfos,
  editedPersonalInfos,
  editedAdditionalInfos,
  signOut,
  getUserImg,
} from './data.js';

export const userProfilePage = () => {
  const profilePage = document.createElement('div');
  profilePage.classList.add('page-feed', 'pages');
  window.location.href = '#profile';

  getUserInfos().then((users) => {
    users.forEach((doc) => {
      const infos = doc.data();
      const ageUser = infos.age || '';
      const arrayData = ageUser.split('-');
      const birthday = arrayData.reverse().join('-');

      localStorage.setItem('photo', infos.img);
      localStorage.setItem('bio', infos.bio);

      profilePage.innerHTML = `
      <header class='header-catarse'>
        <button class='btn-icon' id='openMenu'><i class='fas fa-bars icon menu'></i></button>
        <nav class='nav-main'>
          <ul>
            <li><a href='#feed'>Feed</a></li>
            <li class='sign-out' id='signOut'>Sair</li>
          </ul>
        </nav>
        <img src='./assets/feed-logo.png'>
      </header>
      <div class='divToClose wrap-desk'>
        <div class='profile-container container'>
          <aside class='profile-infos div-infos'>
            <figure>
              <img src=${infos.img} id='img-profile' alt='Foto de perfil' class='profile-picture'>
            </figure>
            <span class='user-name'>${firebase.auth().currentUser.displayName}</span>
            <nav>
              <ul>
                <li><a href='#profile' class='profile-btns'>Perfil</a></li>
                <li><a href='#profile-posts' class='profile-btns'>Meus Posts</a></li>
              </ul>
            </nav>
          </aside>
        </div>

        <main id='main-user-posts'>
          <article id='user-posts-container'></article>
        </main>
      
        <main id='user-information' class='user-info container'>
          <section class='personal-infos div-infos'>
            <div class='info-profile-option'>
              <h1>Informações pessoais</h1>
              <div id='edit-basic-info'>            
                  <button class='btn-icon' id='edit-personal-info'><i class='fas fa-user-edit icon'></i></button>
                  <button class='btn-icon icon-none' id='save-personal-info'><i class='fas fa-user-check icon'></i></button>
              </div>
            </div>
            <div class='info-user-div'>
              <span>Nome e Sobrenome:</span>
              <textarea disabled>${infos.firstName} ${infos.lastName}</textarea>
            </div>
            <div class='info-user-div'>
              <span>Data de aniversário:</span>
              <textarea disabled>${birthday || 'informação não encontrada'}</textarea>
            </div>
            <div class='info-user-div'>
              <span>Sexo:</span>
              <select id='gender' disabled>
                <option value='' selected>Selecione uma das opções:</option>
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
            <div class='info-user-div'>
              <form>
                <label for='my-file'>Select a file:</label>
                <input type='file' id='my-file' name='my-file' disabled>
              </form>
            </div>
            <div id='myImg'></div>
          </section>
          <section class='additional-infos div-infos'>
            <div class='info-profile-option'>
              <h1>Informações adicionais</h1>
              <div id='edit-additional-info'>            
                  <button class='btn-icon' id='edit-additional-infos'><i class='fas fa-user-edit icon'></i></button>
                  <button class='btn-icon icon-none' id='save-additional-infos'><i class='fas fa-user-check icon'></i></button>
              </div>
            </div>
            <form>
              <div class='info-user-div'>
                <span>Status:</span>
                <textarea id='change-status' disabled>${infos.bio}</textarea>
              </div>
              <label for='relationship-state'>Relacionamento:</label>
              <select id='relationship-state' disabled>
                <option value='' selected>Selecione uma das opções:</option>
                <option value='single'>Solteira</option>
                <option value='married'>Casada</option>
                <option value='serious-relationship'>Relacionamento sério</option>
                <option value='others'>Outros</option>
              </select>
              <div class='info-user-div'>
                <span>Sobre você:</span>
                <textarea id='about-user' disabled placeholder='Nos conte mais sobre você...'></textarea>
              </div>
            </form>
          </section>
        </main>
      </div>
      `;

      const menu = profilePage.querySelector('.nav-main');
      const divToClose = profilePage.querySelector('.divToClose');

      profilePage.querySelector('#openMenu').addEventListener('click', () => {
        menu.classList.toggle('display-block');
      });

      divToClose.addEventListener('click', () => {
        menu.classList.remove('display-block');
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
          menu.classList.add('display-block');
        } else {
          menu.classList.toggle('display-block');
        }
      });

      const gender = profilePage.querySelector('#gender');
      const status = profilePage.querySelector('#change-status');
      const about = profilePage.querySelector('#about-user');
      const selectFile = profilePage.querySelector('#my-file');
      const statusRelationship = profilePage.querySelector('#relationship-state');
      const editPersonalProfile = profilePage.querySelector('#edit-personal-info');
      const savePersonalProfile = profilePage.querySelector('#save-personal-info');
      const editAdditionalProfile = profilePage.querySelector('#edit-additional-infos');
      const saveAdditionalProfile = profilePage.querySelector('#save-additional-infos');

      profilePage.querySelector('#edit-personal-info').addEventListener('click', () => {
        gender.removeAttribute('disabled');
        selectFile.removeAttribute('disabled');

        gender.classList.toggle('editable-field');
        editPersonalProfile.classList.toggle('icon-none');
        savePersonalProfile.classList.toggle('icon-none');


        selectFile.addEventListener('change', (e) => {
          const myFile = e.target.files[0];

          getUserImg(myFile)
            .then((url) => {
              profilePage.querySelector('#myImg').innerHTML = `<img src=${url} id=${myFile.name}>`;
            });
        });
      });

      profilePage.querySelector('#save-personal-info').addEventListener('click', () => {
        gender.setAttribute('disabled', 'disabled');
        selectFile.setAttribute('disabled', 'disabled');

        gender.classList.toggle('editable-field');
        selectFile.classList.toggle('editable-field');
        editPersonalProfile.classList.toggle('icon-none');
        savePersonalProfile.classList.toggle('icon-none');

        const myFile = profilePage.querySelector('#myImg').children[0].src;

        editedPersonalInfos(doc.id, gender.value, myFile)
          .then(() => {
            window.location.reload();
          });
      });

      profilePage.querySelector('#edit-additional-infos').addEventListener('click', () => {
        status.removeAttribute('disabled');
        about.removeAttribute('disabled');
        statusRelationship.removeAttribute('disabled');

        status.focus();

        status.classList.toggle('editable-field');
        about.classList.toggle('editable-field');
        statusRelationship.classList.toggle('editable-field');
        editAdditionalProfile.classList.toggle('icon-none');
        saveAdditionalProfile.classList.toggle('icon-none');
      });


      profilePage.querySelector('#save-additional-infos').addEventListener('click', () => {
        status.setAttribute('disabled', 'disabled');
        about.setAttribute('disabled', 'disabled');
        statusRelationship.setAttribute('disabled', 'disabled');

        status.classList.toggle('editable-field');
        about.classList.toggle('editable-field');
        statusRelationship.classList.toggle('editable-field');
        editAdditionalProfile.classList.toggle('icon-none');
        saveAdditionalProfile.classList.toggle('icon-none');

        editedAdditionalInfos(doc.id, status.value, statusRelationship.value, about.value);
      });

      profilePage.querySelector('#signOut').addEventListener('click', signOut);
    });
  });

  return profilePage;
};
