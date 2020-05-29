// Aqui serão criados os eventos de Manipulação de DOM e templates
// import { signIn } from "./data.js";
// import { signInGoogle } from "./data.js";

export const signIn = () => {
  const container = document.createElement("div");
  window.location.href = "#login"
  container.innerHTML = `
    <aside class="aside">
      <img src="../assets/logo.png" alt="logo home page">
    </aside>
    <main>
      <form action="#teste" id="form-login">
        <input type="email" id="email" class="form-input" placeholder="Email">
        <input type="password" id="password" class="form-input" placeholder="Password">
        <input type="submit" id="btn-login" class="btn" value="Enviar">
      </form>
      <div>
        <p>Entrar com:</p>
        <a href="/#"><i class="fab fa-google"></i></a>

        <p>Não tem uma conta? <a href="#register">Registre-se</a></p>
      </div>
    </main>
  `;

  // const printarMensagemNoConsole = container.querySelector("#btn-login");

  // printarMensagemNoConsole.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   window.location.href = ""
  // });

  return container;
};