import { getUserInfos, editedPersonalInfos, editedAdditionalInfos, signOut } from "./data.js";

export const userProfilePage = () => {
  const profilePage = document.createElement('div');
  profilePage.classList.add('page-feed', 'pages');
  window.location.href = '#profile'
  profilePage.innerHTML = `
  <header class="header-catarse">
    <button class="btn-icon" id="openMenu"><i class="fas fa-bars icon menu"></i></button>
    <nav class="nav-main">
      <ul>
        <li><a href="#feed">Feed</a></li>
        <li class='sign-out' id="signOut">Sair</li>
      </ul>
    </nav>
    <img src="./assets/feed-logo.png">
  </header>
  `

  getUserInfos().then((users) => {
    users.forEach((doc) => {
      const infos = doc.data();
      const calcAge = (date) => { 
        const dataAtual = new Date();
        const currentDate = dataAtual.getFullYear();
        const splitDate = date.split('-'); 
        const day = splitDate[2];
        const month = splitDate[1];
        const year = splitDate[0];
        const currentMonth = dataAtual.getMonth() + 1; 
        let age = currentDate - year; 
      
        if(currentMonth < month){
          age--; 
        } else if(currentMonth == month){ 
          if(new Date().getDate() < day ){ 
            age--; 
          }
        }
        return age; 
      }
      profilePage.innerHTML += `
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
      
        <main id='main-user-posts'>
          <article id='user-posts-container'></article>
        </main>
      
        <main id='user-information' class='user-info container'>
          <section class='personal-infos div-infos'>
              <div class='info-profile-option'>
                <h1>Informações pessoais</h1>
                <div id='edit-basic-info'>            
                    <button class='btn-icon' id='edit-personal-info'><i class="fas fa-user-edit icon"></i></button>
                    <button class='btn-icon i-none' id='save-personal-info'><i class="fas fa-user-check icon"></i></button>
                </div>
              </div>
              <div class='info-user-div'>
                <span>Nome e Sobrenome:</span>
                <textarea disabled>${infos.firstName} ${infos.lastName}</textarea>
              </div>
              <div class='info-user-div'>
                <span>Idade:</span>
                <textarea disabled>${calcAge(infos.age)}</textarea>
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
                <form method="post" enctype="multipart/form-data">
                  <label for="myfile">Select a file:</label>
                  <input type="file" id="myfile" name="myfile">
                </form>
              </div>
          </section>
          <section class='additional-infos div-infos'>
            <div class='info-profile-option'>
              <h1>Informações adicionais</h1>
              <div id='edit-additional-info'>            
                  <button class='btn-icon' id='edit-additional-infos'><i class="fas fa-user-edit icon"></i></button>
                  <button class='btn-icon i-none' id='save-additional-infos'><i class="fas fa-user-check icon"></i></button>
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
      `

  setTimeout(() => {
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
    const statusRelationship = profilePage.querySelector('#relationship-state');
    const editPersonalProfile = profilePage.querySelector('#edit-personal-info');
    const savePersonalProfile = profilePage.querySelector('#save-personal-info');
    const editAdditionalProfile = profilePage.querySelector('#edit-additional-infos');
    const saveAdditionalProfile = profilePage.querySelector('#save-additional-infos');

    profilePage.querySelector('#edit-personal-info').addEventListener('click', () => {
      gender.removeAttribute('disabled');

      gender.classList.toggle('editable-field');
      editPersonalProfile.classList.toggle('i-none');
      savePersonalProfile.classList.toggle('i-none');
    });


    profilePage.querySelector('#save-personal-info').addEventListener('click', () => {
      gender.setAttribute('disabled', 'disabled');

      gender.classList.toggle('editable-field');
      editPersonalProfile.classList.toggle('i-none');
      savePersonalProfile.classList.toggle('i-none');

      editedPersonalInfos(doc.id, gender.value);
    })


    profilePage.querySelector('#edit-additional-infos').addEventListener('click', () => {
      status.removeAttribute('disabled');
      about.removeAttribute('disabled');
      statusRelationship.removeAttribute('disabled');

      status.focus();

      status.classList.toggle('editable-field');
      about.classList.toggle('editable-field');
      statusRelationship.classList.toggle('editable-field');
      editAdditionalProfile.classList.toggle('i-none');
      saveAdditionalProfile.classList.toggle('i-none');
    });


    profilePage.querySelector('#save-additional-infos').addEventListener('click', () => {
      status.setAttribute('disabled', 'disabled');
      about.setAttribute('disabled', 'disabled');
      statusRelationship.setAttribute('disabled', 'disabled');

      status.classList.toggle('editable-field');
      about.classList.toggle('editable-field');
      statusRelationship.classList.toggle('editable-field');
      editAdditionalProfile.classList.toggle('i-none');
      saveAdditionalProfile.classList.toggle('i-none');

      editedAdditionalInfos(doc.id, status.value, statusRelationship.value, about.value)
    });

    profilePage.querySelector('#signOut').addEventListener('click', signOut)
}, 1000)



  })
})

  return profilePage;
}