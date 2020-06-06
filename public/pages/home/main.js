import { posts } from "./data.js";

export const feed = () => {
  const feedTemplate = document.createElement("div");
  feedTemplate.classList.add("page-feed");
  feedTemplate.classList.add("pages");
  window.location.href = "#feed";
  feedTemplate.innerHTML = `
    <header class="header">
    <button class="btn-icon" id="openMenu"><i class="fas fa-bars icon menu"></i></button>
    <nav class="nav-main">
      <ul>
        <li>Perfil</li>
        <li id="signOut">Sair</li>
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
  const menu = feedTemplate.querySelector(".nav-main");
  const mainToClose = feedTemplate.querySelector(".main-feed");

  feedTemplate.querySelector("#openMenu").addEventListener("click", () => {
    if(menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
      mainToClose.addEventListener("click", closeNav, true);
    }
  });

  window.addEventListener("resize", function(){
    if(window.innerWidth >= 768){
      menu.style.display = "block";
    } else {
      closeNav();
    }
  });

  function closeNav(){
    menu.style.display = "none"
  }

  const loadPost = () => {
    feedTemplate.querySelector("#posts-container").innerHTML = "";
    firebase
    .firestore()
    .collection("posts")
    .orderBy('timestamps', 'desc')
    .limit(5)
    .get()
    .then(database => {
      database.forEach(post => {
        createPosts(post.data());
      });
      addEventLikePost();
    })
  }
  loadPost();

  const createPosts = (post, prepend) => {
    const postsContainer = feedTemplate.querySelector("#posts-container");
    let postsOnFeed = document.createElement("section");
    postsOnFeed.classList.add("div-posts");
    postsOnFeed.innerHTML = `
      <div class="posted-box-by box">
        <span class="name-user-published">Publicado por ${post.name} em ${post.timestamps}</span>
      </div>
      <textarea class="content-post posted-box-text box" disabled>${post.post}</textarea>
     `

    if(post.userUid === firebase.auth().currentUser.uid){
      postsOnFeed.innerHTML +=  `
        <div class="posted-box-options box">
          <button class="btn-icon"><i class="fas fa-edit icon"></i></button>
        </div>
      `
    } else {
      postsOnFeed.innerHTML +=  `
        <div class="posted-box-options box">
          <button class="btn-icon like" class="likes"><i class="fas fa-heart icon"></i></button>
          <button class="btn-icon"><i class="fas fa-comments icon"></i></button>
        </div>
      `
    }

    if(!prepend){
      postsContainer.appendChild(postsOnFeed)
    } else {
      postsContainer.prepend(postsOnFeed)
      removeEventLikePost();
      addEventLikePost();
    }
  }

  const handleLike = (e) => {
    e.preventDefault();
    console.log("oi")
  }
 
  const addEventLikePost = () => {
    const allLikes = feedTemplate.querySelectorAll(".like")
    allLikes.forEach((btnLike) => {
      btnLike.addEventListener("click", handleLike, false);
    })
  }

  const removeEventLikePost = () => {
    const allLikes = feedTemplate.querySelectorAll(".like")
    allLikes.forEach((btnLike) => {
      btnLike.removeEventListener("click", handleLike, false);
    })
  }
  
  feedTemplate.querySelector("#share-post").addEventListener("click", () => {
    
    const postText = feedTemplate.querySelector("#post-field").value;
    const post = {
      post: postText,
      name: firebase.auth().currentUser.displayName, 
      timestamps: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR'),
      userUid: firebase.auth().currentUser.uid
    }
    firebase
    .firestore()
    .collection("posts")
    .add(post)
    .then(() => {
      createPosts(post, true);
    })
    feedTemplate.querySelector("#post-field").value = "";
  });

  feedTemplate.querySelector("#signOut").addEventListener("click", () => {
    firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "#login";  
    });
  });

  return feedTemplate;
};