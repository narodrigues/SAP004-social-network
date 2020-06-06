import { posts } from "./data.js";

export const feed = () => {
  const feedTemplate = document.createElement("div");
  feedTemplate.classList.add("page-feed");
  feedTemplate.classList.add("pages");
  window.location.href = "#feed";
  feedTemplate.innerHTML = `
    <header class="header">
    <button class="btn-icon" id="signOut"><i class="fas fa-bars icon menu"></i></button>
    <nav class="nav-main" style="display: none">
      <ul>
        <li>Perfil</li>
        <li>Sair</li>
      </ul>
    </nav>
    <img src="./assets/nome-logo-feed.png">
  </header>
    <main class="main-feed">
      <section class="user-profile">
        <figure id="user-img"></figure>
        <span id="userName">${firebase.auth().currentUser.displayName}</span>
      </section>
      <div class="container">
        <section class="feed-write-post">
          <form class="form-feed">
            <textarea id="post-field" class="post-field" placeholder="O que deseja compartilhar?"></textarea>
            <div class="post-field-options">
              <select id="post-privacy">
                <option value="public">Público</option>
                <option value="private">Privado</option>
              </select>
              <button id="share-post" class="btn">Postar</button>
            </div>
          </form>
        </section>
        <article class="feed-posts-container" id="posts-container"></article>
      </div>
    </main>
  `

  // setTimeout(myTimer, 2000);
  // function myTimer(){
  //   feedTemplate.querySelector("#userName").innerHTML = "";
  //   feedTemplate.querySelector("#userName").innerHTML = firebase.auth().currentUser.displayName;
  //   const clicks = feedTemplate.querySelectorAll(".like")
  //   clicks.forEach(btnlike => {
  //     btnlike.addEventListener("click", (e) => {
  //       e.preventDefault();
  //       console.log("oie")});
  //   });
  // }


  

  const likePosts = () => {
    console.log("oie")
    const allLikes = feedTemplate.querySelectorAll(".like")
    allLikes.forEach(btnlike => {
      btnlike.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("oie")});
      })
  } 
  // likePosts()

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
    likePosts()
  }  
  loadPost();

  const createPosts = (post) => {
    const postsContainer = feedTemplate.querySelector("#posts-container");
    const postsOnFeed = document.createElement("section");
    postsOnFeed.classList.add("div-posts");
    postsOnFeed.innerHTML = ` 
      <div class="posted-box-by box">
        <span class="name-user-published">Publicado por ${post.data().name} em ${post.data().timestamps}</span>
      </div>
      <div class="posted-box-text box">
        <textarea class="content-post" disabled>${post.data().post}</textarea>
      </div>
      <div class="posted-box-options box">
        <button class="btn-icon like" class="likes"><i class="fas fa-heart icon"></i></button>
        <button class="btn-icon"><i class="fas fa-comments icon"></i></button>
      </div>
    `
    postsContainer.appendChild(postsOnFeed);
  }

  feedTemplate.querySelector("#share-post").addEventListener("click", () => {
    const postText = feedTemplate.querySelector("#post-field").value;
    const post = {
      post: postText,
      name: firebase.auth().currentUser.displayName, 
      timestamps: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR')
    }
    firebase.firestore().collection("posts").add(post);
    loadPost()
    feedTemplate.querySelector("#post-field").innerHTML = "";
  });

  feedTemplate.querySelector("#signOut").addEventListener("click", () => {
    firebase.auth().signOut().then(() => {
      window.location = "#login"  
    })
  })

  return feedTemplate;
};