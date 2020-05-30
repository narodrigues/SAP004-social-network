import { createUser } from "./data.js";

export const inscribePage = () => {
  const inscribePage = document.createElement("section");
  inscribePage.classList.add("page-inscribe")
  window.location.href = "#register"
  inscribePage.innerHTML = `
    <form class="form-inscribe">
      <label for="inscribe-name">Nome:
        <input type="text" class="btn" id="inscribe-name">
      </label>
      <label for="inscribe-last-name">Sobrenome:
      <input type="text" class="btn" id="inscribe-last-name">
    </label>
      <label for="inscribe-email">Email: 
        <input type="email" class="btn" id="inscribe-email">
      </label>
      <label for="inscribe-gender">Sexo: 
        <input type="radio" class="btn" id="inscribe-gender" title="Feminino">
        <input type="radio" class="btn" id="inscribe-gender-male" title="Masculino">
      </label>
      <label for="age-inscribe">Idade:
        <input type="date" class="btn" id="age-inscribe">
      </label>
      <label for="password-inscribe">Senha:
        <input type="password" class="btn" id="password-inscribe">
      </label>
      <label for="confirm-password-inscribe">Confirme sua senha:
        <input type="password" class="btn" id="confirm-password-inscribe">
      </label>
      <input type="submit" class="btn" id="inscribe-btn">
    </form>
  `;

    inscribePage.querySelector("#inscribe-btn").addEventListener("click", (e) => {
      e.preventDefault();
      const firstName = document.querySelector("#inscribe-name").value;
      const lastName = document.querySelector("#inscribe-last-name").value;
      const email = document.querySelector("#inscribe-email").value;
      const age = document.querySelector("#age-inscribe").value;
      const password = document.querySelector("#password-inscribe").value;
      const confirmPassword = document.querySelector("#confirm-password-inscribe").value;
      
      createUser(firstName, lastName, age, email, password, confirmPassword)
    });

  return inscribePage;
}