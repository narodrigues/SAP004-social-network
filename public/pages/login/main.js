// Aqui serão criados os eventos de Manipulação de DOM e templates
// import { signIn } from "./data.js";
import { signInGoogle } from "./data.js";

export const signIn = () => {
  const container = document.createElement("div");
  container.classList.add("page-login")
  window.location.href = "#login"
  container.innerHTML = `
    <aside class="aside">
      <section class="container">
        <img src="./assets/logo.png" alt="logo home page">
        <h1>Catarse</h1>
      </section>
    </aside>
    <main class="main">
      <section class="container">
        <form action="#teste" id="form-login" class="form-login">
          <input type="email" id="email" class="form-input" placeholder="Email">
          <input type="password" id="password" class="form-input" placeholder="Password">
          <input type="submit" id="btn-login" class="btn" "Enviar>
        </form>
        <div class="register-info">
          <p>Entrar com:</p>
          <button type="button" id="login-google">Google</button>
          <p>Não tem uma conta? <a href="#register">Registre-se</a></p>
        </div>
        </section>
    </main>
  `;

  container.querySelector("#login-google").addEventListener("click", () => {
   signInGoogle().then((result) => {
    const user = {
      firstName: result.additionalUserInfo.profile.given_name,
      lastName: result.additionalUserInfo.profile.family_name,
    }
    firebase.firestore().collection("users").add(user)
     window.location = "#teste"
   }).catch((error) => {
     alert("login não realizado, tente novamente")
   })
  })

  return container;
};