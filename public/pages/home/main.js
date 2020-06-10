import { signOut, posts, loadingPost, saveEditPost } from "./data.js";

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
              <div>
                <label for="option-public"><i class="fas fa-unlock icon privacity-icon">
                  <input type="checkbox" id="option-public" class="btn-icon d-none" value="public">
                  </i>
                </label>
              </div>
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
  const btnConfigPrivacity = feedTemplate.querySelector("#option-public")

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

  btnConfigPrivacity.addEventListener("click", () => {
    feedTemplate.querySelector(".privacity-icon").classList.toggle("fa-lock")
    feedTemplate.querySelector(".privacity-icon").classList.toggle("fa-unlock")
  })


  loadingPost().then((arrayPosts) => {
    feedTemplate.querySelector("#posts-container").innerHTML = "";
    arrayPosts.forEach((doc) => {
      createPosts(doc)
    })
  })

  const createPosts = (doc, prepend) => {
    const post = doc.data();
    const postsOnFeed = document.createElement("section");
    const postsBox = document.createElement("div");
    const postedBy = document.createElement("span");
    const msgPost = document.createElement("textarea");
    const buttonsWrap = document.createElement("div");
    const postsContainer = feedTemplate.querySelector("#posts-container");

    postedBy.innerHTML = `Publicado por ${post.name} em ${post.timestamps}`;
    msgPost.innerHTML = `${post.post}`;

    postsOnFeed.classList.add("div-posts");
    postsBox.classList.add("posted-box-by", "box");
    postedBy.classList.add("name-user-published");
    msgPost.classList.add("content-post", "posted-box-text", "box");
    buttonsWrap.classList.add("posted-box-options", "box");

    msgPost.setAttribute("disabled", "disabled");

    postsOnFeed.append(postsBox, msgPost);
    postsBox.append(postedBy);

    if(post.userUid === firebase.auth().currentUser.uid){
      const editBtn = document.createElement("button");
      const saveBtn = document.createElement("button");
      const deleteBtn = document.createElement("button");

      editBtn.innerHTML = `<i class='fas fa-edit icon'></i>`;
      saveBtn.innerHTML = `<i class='far fa-save icon'></i>`;
      deleteBtn.innerHTML = `<i class='fas fa-trash-alt icon'></i>`;

      editBtn.classList.add("btn-icon");
      saveBtn.classList.add("i-none", "btn-icon");
      deleteBtn.classList.add("btn-icon");

      buttonsWrap.append(editBtn, saveBtn, deleteBtn);
      postsOnFeed.append(buttonsWrap);

      const editBtnFunctions = () => {
        saveBtn.classList.toggle("i-none");
        msgPost.removeAttribute("disabled");
      }

      const saveBtnOptions = () => {    
        saveBtn.classList.toggle("i-none");
        msgPost.setAttribute("disabled", "disabled");
       saveEditPost(msgPost.value, doc.id)
      }

      editBtn.addEventListener("click", editBtnFunctions);
      saveBtn.addEventListener("click", saveBtnOptions);

    } else {
      const likeBtn = document.createElement("button");
      const commentBtn = document.createElement("button");

      likeBtn.innerHTML = `<i class='fas fa-heart icon'></i>`;
      commentBtn.innerHTML = `<i class='fas fa-comments icon'></i>`;

      likeBtn.classList.add("btn-icon", "like")
      commentBtn.classList.add("btn-icon")
      
      buttonsWrap.append(likeBtn, commentBtn);
      postsOnFeed.append(buttonsWrap);
    }

    if(!prepend){
      postsContainer.appendChild(postsOnFeed);
    } else {
      postsContainer.prepend(postsOnFeed);
    }
  }

  feedTemplate.querySelector("#share-post").addEventListener("click", (e) => {
    e.preventDefault()
    const postText = feedTemplate.querySelector("#post-field").value;
    posts(postText)
    .then((doc) => {
      createPosts(doc , true)
    });

    feedTemplate.querySelector("#post-field").value = "";
  });

  feedTemplate.querySelector("#signOut").addEventListener("click", signOut);

  return feedTemplate;
};