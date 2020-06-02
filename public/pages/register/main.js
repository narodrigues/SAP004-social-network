import { register } from "./data.js";

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
      <label id="gender">Sexo:</label>
      <label for="inscribe-gender" class="input-gender"> 
        <input type="radio" name="gender" class="btn" id="inscribe-gender" title="Feminino"> 
        Feminino
      </label>
      <label for="inscribe-gender-male" class="input-gender">
        <input type="radio" name="gender" class="btn" id="inscribe-gender-male" title="Masculino">
        Masculino
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
      <input type="submit" class="btn btn-send" id="inscribe-btn">
    </form>
  `;

  inscribePage.querySelector("#inscribe-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const firstName = document.querySelector("#inscribe-name").value;
    const lastName = document.querySelector("#inscribe-last-name").value;
     const email = document.querySelector("#inscribe-email").value;
    const age = document.querySelector("#age-inscribe").value;
    const password = document.querySelector("#password-inscribe").value;

    register(email, password, firstName, lastName, age);
  });

  return inscribePage;
}