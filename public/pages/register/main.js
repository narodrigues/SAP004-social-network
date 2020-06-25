import { register } from './data.js';

export const inscribePage = () => {
  const inscribePageTemplate = document.createElement('section');
  inscribePageTemplate.classList.add('page-inscribe');
  window.location.href = '#register';
  inscribePageTemplate.innerHTML = `
    <form class='form-inscribe'>
      <label for='inscribe-name'>Nome:
        <input type='text' class='input' requerid id='inscribe-name'>
      </label>
      <label for='inscribe-last-name'>Sobrenome:
        <input type='text' class='input' required id='inscribe-last-name'>
      </label>
      <label for='bio'>Status:
        <input type='text' class='input' required id='bio'>
      </label>
      <label for='age-inscribe'>Idade:
        <input type='date' class='input' required id='age-inscribe'>
      </label>
      <label for='inscribe-email'>Email: 
        <input type='email' class='input' required id='inscribe-email'>
      </label>
      <label for="password-inscribe">Senha:
        <input type='password' class='input' required id='password-inscribe'>
      </label>
      <label for='confirm-password-inscribe'>Confirme sua senha:
        <input type='password' class='input' required id='confirm-password-inscribe'>
      </label>
      <div class='btn-inscribe-container'>
        <input type='submit' class='btn profile-btns' id='inscribe-btn'>
        <input type='button' class='btn profile-btns' id='return-btn' value='Voltar'>
      </div>
    </form>
    <section class='modal close-modal-info'>
      <section class='content-section'>
        <div class='btn-close'>
          <button class='btn-icon' id='close-modal'><i class="far fa-times-circle icon"></i></button>
        </div>
        <div class='title'>
          <h2>Seja bem vinda!</h2>
        </div>
        <div class="content-modal">
          <p>A palavra <strong>Catarse</strong> é usada para definir o processo de cura emocional através da Psicanálise, que consiste na cura através da libertação de pensamentos, sentimentos, e experiências traumáticas vividas até então.</p>
          <p>Esta rede social tem como objetivo tratar de maneira segura e confortável uma questão que faz parte da rotina de muitas mulheres que é a violência doméstica, visto que durante essa quarentena o número de casos tem aumentado drasticamente.</p>
          <p>Este é um canal seguro onde você poderá compartilhar suas experiências e ajudar outras mulheres a superarem esta situação através de suas interações.</p>
          <p>Aqui prezamos pelo respeito e empatia umas pelas outras. Assim, pedimos sua colaboração para que superemos esse desafio</p>
        </div>
        <div class='title'>
          <p>Obrigada!</p>
        </div>
      </section>
    </section>
    <div class='overlay close-overlay'></div>
    <div id='div-modal'></div>
  `;

  inscribePageTemplate.querySelector('#close-modal').addEventListener('click', () => {
    const closeOverlay = inscribePageTemplate.querySelector('.close-overlay');
    const closeModal = inscribePageTemplate.querySelector('.close-modal-info');

    closeModal.remove();
    closeOverlay.remove();
  });

  inscribePageTemplate.querySelector('#return-btn').addEventListener('click', () => {
    window.location.href = '#login';
  });

  inscribePageTemplate.querySelector('#inscribe-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const firstName = inscribePageTemplate.querySelector('#inscribe-name').value;
    const lastName = inscribePageTemplate.querySelector('#inscribe-last-name').value;
    const bio = inscribePageTemplate.querySelector('#bio').value;
    const email = inscribePageTemplate.querySelector('#inscribe-email').value;
    const userAge = inscribePageTemplate.querySelector('#age-inscribe').value;
    const password = inscribePageTemplate.querySelector('#password-inscribe').value;
    const confirmPassword = inscribePageTemplate.querySelector('#confirm-password-inscribe').value;
    const re = /^[a-z À-ú]*$/i;

    const calcAge = (date) => {
      const dataAtual = new Date();
      const currentDate = dataAtual.getFullYear();
      const splitDate = date.split('-');
      const day = splitDate[2];
      const month = splitDate[1];
      const year = splitDate[0];
      const currentMonth = dataAtual.getMonth() + 1;
      let age = currentDate - year;

      if (currentMonth < month) {
        age -= 1;
      } else if (currentMonth === month) {
        if (new Date().getDate() < day) {
          age -= 1;
        }
      }
      return age;
    };

    const divModal = inscribePageTemplate.querySelector('#div-modal');
    const modalErrorRegister = document.createElement('div');
    const divShowErrors = document.createElement('div');
    const msgErrorInput = document.createElement('div');
    const divBtnModal = document.createElement('div');
    const btnCloseModalError = document.createElement('button');

    btnCloseModalError.classList.add('btn-icon');
    btnCloseModalError.id = ('close-modal-error');
    divBtnModal.classList.add('btn-close');
    divShowErrors.classList.add('modal', 'close-modal-info');
    modalErrorRegister.id = 'modal-of-errors';

    btnCloseModalError.innerHTML = '<i class="far fa-times-circle icon"></i>';

    divBtnModal.append(btnCloseModalError);
    divShowErrors.append(divBtnModal, msgErrorInput);
    modalErrorRegister.append(divShowErrors);
    divModal.append(modalErrorRegister);

    btnCloseModalError.addEventListener('click', () => {
      modalErrorRegister.remove();
    });

    const showWrongInputInformation = [];

    let withError = false;
    const errorCode = firebase.auth().Error;
    if (firstName === '' || lastName === '' || userAge === '' || bio === '' || email === '' || password === '') {
      withError = true;
      showWrongInputInformation.push('Preencha o(os) campo(s) vazio(s)');
    }
    if (!re.exec(firstName) || !re.exec(lastName)) {
      withError = true;
      showWrongInputInformation.push('Digite apenas letras nos campos de nome e sobrenome');
    }
    if (password !== confirmPassword) {
      withError = true;
      showWrongInputInformation.push('As senhas não conferem');
    }
    if (errorCode === 'auth/weak-password') {
      withError = true;
      showWrongInputInformation.push('Sua senha é muito fraca');
    }
    if ((email.length <= 1) || (email.search('@') === -1)) {
      withError = true;
      showWrongInputInformation.push('E-mail inválido');
    }
    if (errorCode === 'auth/email-already-in-use') {
      withError = true;
      showWrongInputInformation.push('Este e-mail já está sendo usado');
    }
    if (calcAge(userAge) < '18') {
      withError = true;
      showWrongInputInformation.push('Você precisa ter mais de 18 anos para se cadastrar');
    }

    if (!withError) {
      register(email, password, firstName, lastName, userAge, bio);
      window.location.href = '#login';
    } else {
      showWrongInputInformation.forEach((erro) => {
        msgErrorInput.innerHTML += `<p>${erro}</p>`;
      });
    }
  });
  return inscribePageTemplate;
};
