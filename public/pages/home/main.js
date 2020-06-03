export const feed = () => {
  const feedTemplate = document.createElement("div");
  feedTemplate.classList.add("page-feed");
  window.location.href = "#feed";
  feedTemplate.innerHTML = `
    <header class="header">
    <nav class="nav-main">
      <ul>
        <li>Perfil</li>
        <li>Sair</li>
      </ul>
    </nav>
    <img src="">
  </header>
    <main class="main-feed">
      <section>
        <figure id="user-img"></figure>
        <span id="userName"></span>
      </section>
      <section>
        <form action="post" class="form-feed">
          <textarea id="post-field" class="post-field" cols="30" rows="10" placeholder="O que deseja compartilhar?"></textarea>
          <button id="share-post" class="btn">Postar</button>
          <select id="post-privacy">
            <option value="private">Privado</option>
            <option value="public">Público</option>
          </select>
        </form>
      </section>
      <article id="posts-container"></article>
    </main>
  `
  return feedTemplate;
};