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
      <input type="button" class="btn btn-send" id="return-btn" value="Voltar">
    </form>
  `;

  inscribePage.querySelector("#return-btn").addEventListener("click", () => {
    window.location.href = "#login";
  });

  inscribePage.querySelector("#inscribe-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const firstName = document.querySelector("#inscribe-name").value;
    const lastName = document.querySelector("#inscribe-last-name").value;
    const email = document.querySelector("#inscribe-email").value;
    const userAge = document.querySelector("#age-inscribe").value;
    const password = document.querySelector("#password-inscribe").value;
    const confirmPassword = document.querySelector("#confirm-password-inscribe").value;

    const calcAge = (date) => { 
      const dataAtual = new Date();
      const currentDate = dataAtual.getFullYear();
      const splitDate = date.split('-');
      const day = splitDate[2];
      const month = splitDate[1];
      const year = splitDate[0];
      const age = currentDate - year;
      const currentMonth = dataAtual.getMonth() + 1; 
    
      if(currentMonth < month){
        age--; 
      } else if(currentMonth == month){ 
        if(new Date().getDate() < day ){ 
          age--; 
        }
      }
      return age; 
    } 

    // const padrao = /[^a-zà-ú]/gi;

    // const firstNameValidate = firstName.match(padrao);
    // const lastNameValidate = lastName.match(padrao);
 
    // if( firstNameValidate || !firstName ){
    //    console.log("Nome possui caracteres inválidos ou é vazio")
    // }else if( lastNameValidate || !lastName ){
    //    console.log("Sobrenome possui caracteres inválidos ou é vazio")
    // }else{
    //   console.log("sobrenome ok")
    // }

    if(firstName === "" || lastName === "" || userAge === "" || email === "" || password === ""){
      alert("Preencha o(os) campo(s) vazio(s)");
    } else if(password !== confirmPassword){
      alert("a senha não confere")
    } else if(calcAge(userAge) < "18"){
      alert("Site para maiores de 18 anos");
    } else {    
      register(email, password, firstName, lastName, userAge);
    }
  });
  return inscribePage;
}