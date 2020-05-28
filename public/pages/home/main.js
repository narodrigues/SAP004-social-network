// Aqui serão criados os eventos de Manipulação de DOM e templates
import { greeting } from "./data.js";

export const home = () => {
  const container = document.createElement("div");

  container.innerHTML = `
    <aside class="aside">
      <img src="" alt="logo home page">
    </aside>
    <main>
      <form id="form-login">
        <input type="email" id="email" class="form-input" placeholder="Email">
        <input type="password" id="password" class="form-input" placeholder="Password">
        <input type="button" id="btn-login" class="btn" placeholder="Login">
      </form>
      <div>
        <p>Entrar com:</p>
        <a href="/#"><i class="fab fa-google"></i></a>

        <p>Não tem uma conta? <a href="">Registre-se</a></p>
      </div>
    </main>
  `;

  const printarMensagemNoConsole = container.querySelector("#btn-login");

  printarMensagemNoConsole.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("oi")
  });

  return container;
};

export const registro = () => {
  const registrar = document.createElement("section");

  registrar.innerHTML = `
    <form class="form-register">
      <label for="register-name">Nome:
        <input type="text" class="btn" id="register-name">
      </label>
      <label for="register-email">Email: 
        <input type="email" class="btn" id="register-email">
      </label>
      <label for="register-gender">Sexo: 
        <input type="radio" class="btn" id="register-gender">
      </label>
      <label for="age-register">Idade:
        <input type="date" class="btn" id="age-register">
      </label>
      <label for="password-register">Senha:
        <input type="password" class="btn" id="password-register">
      </label>
      <label for="confirm-password-register">Confirme sua senha:
        <input type="password" class="btn" id="confirm-password-register">
      </label>
      <input type="submit" class="btn" id="register-btn" placeholder="Registrar">
    </form>
  `;

  return registrar;
}
