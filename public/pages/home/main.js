import { signOut, posts, loadingPost, saveEditPost, deletePost } from "./data.js";

export const feed = () => {
  const feedTemplate = document.createElement('div');
  feedTemplate.classList.add('page-feed');
  feedTemplate.classList.add('pages');
  window.location.href = '#feed';
  feedTemplate.innerHTML = `
    <header class="header">
    <button class="btn-icon" id="openMenu"><i class="fas fa-bars icon menu"></i></button>
    <nav class="nav-main">
      <ul>
        <li>Perfil</li>
        <li id="signOut">Sair</li>
      </ul>
    </nav>
    <img src="./assets/feed-logo.png">
  </header>
    <main class="main-feed">
      <section class="user-profile">
        <figure id="user-img"></figure>
        <span id="userName">${firebase.auth().currentUser.displayName}</span>
        <span id="bio"></span>
      </section>
      <div class="container">
        <section class="feed-write-post">
          <form class="form-feed">
            <textarea id="post-field" class="post-field" placeholder="O que deseja compartilhar?"></textarea>
            <div class="post-field-options">
              <form>
                <div id="form-privacy-options">
                  <label for="option-public"> 
                    <i class="fas fa-unlock icon privacity-icon"></i>
                    <input type="radio" name="privacy" id="option-public" class="btn-icon privacy-options" value="public" checked>
                  </label>
                  <label for="option-private">
                    <i class="fas fa-lock icon"></i>
                    <input type="radio" name="privacy" id="option-private" class="btn-icon privacy-options" value="private">
                  </label>
                </div>
              </form>
              <button id="share-post" class="btn btn-send">Postar</button>
            </div>
          </form>
        </section>
        <article class="feed-posts-container" id="posts-container"></article>
      </div>
    </main>
  `

  const menu = feedTemplate.querySelector('.nav-main');
  const mainToClose = feedTemplate.querySelector('.main-feed');

  feedTemplate.querySelector('#openMenu').addEventListener('click', () => {
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
      mainToClose.addEventListener('click', closeNav, true);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      menu.style.display = 'block';
    } else {
      closeNav();
    }
  });

  const closeNav = () => {
    menu.style.display = 'none';
  }

  const teste = firebase.auth().currentUser.uid;
  console.log(teste)
  const teste2 = firebase.firestore().collection('posts').doc().get();
  console.log(teste2)


    loadingPost(doc.data().privacy).then((arrayPosts) => {
      feedTemplate.querySelector('#posts-container').innerHTML = "";
      arrayPosts.forEach((doc) => {
        createPosts(doc)
      })
    })



  const createPosts = (doc, prepend) => {
    const post = doc.data();
    const post2 = doc.data().privacy;
    console.log(post2)

    if (post.userUid === firebase.auth().currentUser.uid) {
      const editBtn = document.createElement('button');
      const saveBtn = document.createElement('button');
      const deleteBtn = document.createElement('button');

      editBtn.innerHTML = `<i class='fas fa-edit icon'></i>`;
      saveBtn.innerHTML = `<i class='far fa-save icon'></i>`;
      deleteBtn.innerHTML = `<i class='fas fa-trash-alt icon'></i>`;

      editBtn.classList.add('btn-icon');
      saveBtn.classList.add('i-none', 'btn-icon');
      deleteBtn.classList.add('btn-icon');

      buttonsWrap.append(editBtn, saveBtn, deleteBtn);
      postsOnFeed.append(buttonsWrap);

      const editBtnFunctions = () => {
        saveBtn.classList.remove('i-none');
        msgPost.removeAttribute('disabled');
      }

      const saveBtnOptions = () => {
        saveBtn.classList.add('i-none');
        msgPost.setAttribute('disabled', 'disabled');
        saveEditPost(msgPost.value, doc.id);
      }

      const deletePostBtn = () => {
        const dataId = doc.id;
        feedTemplate.querySelector(`[data-postid=${dataId}]`).remove();
        deletePost(dataId);
      }

      editBtn.addEventListener('click', editBtnFunctions);
      saveBtn.addEventListener('click', saveBtnOptions);
      deleteBtn.addEventListener('click', deletePostBtn);

    } else {
      const likeBtn = document.createElement('button');
      const commentBtn = document.createElement('button');

      likeBtn.innerHTML = `<i class='fas fa-heart icon'></i>`;
      commentBtn.innerHTML = `<i class='fas fa-comments icon'></i>`;

      likeBtn.classList.add('btn-icon', 'like');
      commentBtn.classList.add('btn-icon');

      buttonsWrap.append(likeBtn, commentBtn);
      postsOnFeed.append(buttonsWrap);
    }

    if (!prepend) {
      postsContainer.appendChild(postsOnFeed);
    } else {
      postsContainer.prepend(postsOnFeed);
    }
  }

  feedTemplate.querySelector('#share-post').addEventListener('click', (e) => {
    e.preventDefault()
    const postText = feedTemplate.querySelector('#post-field').value;
    const privacyOptions = feedTemplate.querySelector('input[name="privacy"]:checked').value;

    posts(postText, privacyOptions)
      .then((doc) => {
        createPosts(doc, true)
      });

    feedTemplate.querySelector('#post-field').value = '';
  });

  feedTemplate.querySelector('#signOut').addEventListener('click', signOut);

  return feedTemplate;
};