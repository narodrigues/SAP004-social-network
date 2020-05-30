// Aqui serão criados os eventos de Manipulação de DOM e templates
// import { signIn } from "./data.js";
// import { signInGoogle } from "./data.js";

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
          <a href="/#" style="margin-top: 10px"><i class="fab fa-google"></i></a>
          <p>Não tem uma conta? <a href="#register">Registre-se</a></p>
        </div>
        </section>
    </main>
  `;

  // const printarMensagemNoConsole = container.querySelector("#btn-login");

  // printarMensagemNoConsole.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   window.location.href = ""
  // });

  return container;
};