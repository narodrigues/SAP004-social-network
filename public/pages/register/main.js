import { register } from "./data.js";

export const inscribePage = () => {
  const inscribePage = document.createElement('section');
  inscribePage.classList.add('page-inscribe')
  window.location.href = '#register'
  inscribePage.innerHTML = `
    <form class="form-inscribe">
      <label for="inscribe-name">Nome:
        <input type="text" class="btn" requerid id="inscribe-name">
      </label>
      <label for="inscribe-last-name">Sobrenome:
        <input type="text" class="btn" required id="inscribe-last-name">
      </label>
      <label for="bio">Status:
        <input type="text" class="btn" required id="bio">
      </label>
      <label for="age-inscribe">Idade:
        <input type="date" class="btn" required id="age-inscribe">
      </label>
      <label for="inscribe-email">Email: 
        <input type="email" class="btn" required id="inscribe-email">
      </label>
      <label for="password-inscribe">Senha:
        <input type="password" class="btn" required id="password-inscribe">
      </label>
      <label for="confirm-password-inscribe">Confirme sua senha:
        <input type="password" class="btn" required id="confirm-password-inscribe">
      </label>
      <div class="btn-inscribe-container">
        <input type="submit" class="btn btn-send" id="inscribe-btn">
        <input type="button" class="btn btn-send" id="return-btn" value="Voltar">
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
          <p>Esta rede social tem como objetivo tratar de maneira segura e confortável uma questão que faz parte da rotina de muitas mulheres, visto que durante essa quarentena o número de casos de violência contra mulher dentro de sua própria casa tem aumentado drasticamente.</p>
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

  inscribePage.querySelector('#close-modal').addEventListener('click', () => {
    const closeOverlay = inscribePage.querySelector('.close-overlay');
    const closeModal = inscribePage.querySelector('.close-modal-info');

    closeModal.remove()
    closeOverlay.remove()
  });

  inscribePage.querySelector('#return-btn').addEventListener('click', () => {
    window.location.href = '#login';
  });

  inscribePage.querySelector('#inscribe-btn').addEventListener('click', (e) => {
    e.preventDefault()
    const firstName = inscribePage.querySelector('#inscribe-name').value;
    const lastName = inscribePage.querySelector('#inscribe-last-name').value;
    const bio = inscribePage.querySelector('#bio').value;
    const email = inscribePage.querySelector('#inscribe-email').value;
    const userAge = inscribePage.querySelector('#age-inscribe').value;
    const password = inscribePage.querySelector('#password-inscribe').value;
    const confirmPassword = inscribePage.querySelector('#confirm-password-inscribe').value;
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
        age--;
      } else if (currentMonth == month) {
        if (new Date().getDate() < day) {
          age--;
        }
      }
      return age;
    }

    const divModal = inscribePage.querySelector('#div-modal')
    const modalErrorRegister = document.createElement('div');
    const divShowErrors = document.createElement('div');
    const msgErrorInput = document.createElement('div');
    const divBtnModal = document.createElement('div');
    const btnCloseModalError = document.createElement('button');

    btnCloseModalError.classList.add('btn-icon');
    btnCloseModalError.id = ('close-modal-error');
    divBtnModal.classList.add('btn-close');
    divShowErrors.classList.add('modal', 'close-modal-info');
    modalErrorRegister.id = 'modal-of-errors'

    btnCloseModalError.innerHTML = `<i class="far fa-times-circle icon"></i>`;

    divBtnModal.append(btnCloseModalError)
    divShowErrors.append(divBtnModal, msgErrorInput);
    modalErrorRegister.append(divShowErrors);
    divModal.append(modalErrorRegister)

    btnCloseModalError.addEventListener('click', () => {
      modalErrorRegister.remove()
    })

    let showWrongInputInformation = [];

    if (firstName === '' || lastName === '' || userAge === '' || bio === '' || email === '' || password === '') {
      showWrongInputInformation.push('Preencha o(os) campo(s) vazio(s)')
    }
    if (!re.exec(firstName) || !re.exec(lastName)) {
      showWrongInputInformation.push('Digite apenas letras nos campos de nome e sobrenome')
    }
    if (password !== confirmPassword) {
      showWrongInputInformation.push('As senhas não conferem')
    }
    if ((email.length >= 1) && (email.search("@") === -1) && (email.search(" ") === -1)) {
      showWrongInputInformation.push('E-mail inválido')
    }
    if (calcAge(userAge) < "18") {
      showWrongInputInformation.push('Você precisa ter mais de 18 anos para se cadastrar')
    } else {
      register(email, password, firstName, lastName, userAge, bio);
      window.location.href = '#login';
    }
    showWrongInputInformation.forEach(erro => {
      msgErrorInput.innerHTML += `<p>${erro}</p>`
    })
  });
  return inscribePage;
}