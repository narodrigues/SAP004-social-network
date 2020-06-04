import { posts } from "./data.js";

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
      <section class="user-profile">
        <figure id="user-img"></figure>
        <span id="userName"></span>
      </section>
      <div>
        <section class="feed-write-post">
          <form class="form-feed">
            <textarea id="post-field" class="post-field" placeholder="O que deseja compartilhar?"></textarea>
            <div class="post-field-options">
              <button id="share-post" class="btn">Postar</button>
              <select id="post-privacy">
                <option value="private">Privado</option>
                <option value="public">Público</option>
              </select>
            </div>
          </form>
        </section>
        <article class="feed-posts-container" id="posts-container"></article>
      </div>
    </main>
  `

  feedTemplate.querySelector("#share-post").addEventListener("click", () => {
    const postText = document.querySelector("#post-field").value;
    const post = {
      post: postText,
      name: firebase.auth().currentUser.displayName, 
      timestamps: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR')
    }
    firebase.firestore().collection("posts").add(post);
    loadPost();
  });

  const createPosts = (post) => {
    const postsContainer = feedTemplate.querySelector("#posts-container");
    const postsOnFeed = document.createElement("section");
    postsOnFeed.classList.add("div-posts");
    postsOnFeed.innerHTML = ` 
      <div class="posted-box-by box">
        <span class="name-user-published">Publicado por ${post.data().name} em ${post.data().timestamps}</span>
      </div>
      <div class="posted-box-text box">
        <p class="content-post">${post.data().post}</p>
      </div>
      <div class="posted-box-options box">
        <button class="btn-icon"><i class="fas fa-heart icon"></i></button>
        <button class="btn-icon"><i class="fas fa-comments icon"></i></button>
      </div>
    `
    postsContainer.appendChild(postsOnFeed);  
  }

  const loadPost = () => {
    firebase
    .firestore()
    .collection("posts")
    .orderBy('timestamps', 'desc')
    .limit(5)
    .get()
    .then(database => {
      database.forEach(post => {
        createPosts(post)
      });
    });
    feedTemplate.querySelector("#posts-container").innerHTML = "";
  }
  loadPost();

  return feedTemplate;
};