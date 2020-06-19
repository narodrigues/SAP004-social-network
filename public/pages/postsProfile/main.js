import { loadedAllMyPosts, editPrivacyPost } from './data.js';

export const userProfilePageWithPosts = () => {
  const profilePagePosts = document.createElement('div');
  profilePagePosts.classList.add('page-feed', 'pages');
  window.location.href = '#profile-posts'
  profilePagePosts.innerHTML = `
  <header class='header-catarse'>
    <button class='btn-icon' id='openMenu'><i class='fas fa-bars icon menu'></i></button>
    <nav class='nav-main'>
      <ul>
        <li><a href='#feed'>Feed</a></li>
        <li class='sign-out' id='signOut'>Sair</li>
      </ul>
    </nav>
    <img src='./assets/feed-logo.png'>
  </header>
  <div class='divToClose wrap-desk'>
    <div class='profile-container container'>
      <aside class='profile-infos div-infos'>
        <figure>
          <img src='' alt='Foto de perfil'>
        </figure>
        <span>${firebase.auth().currentUser.displayName}</span>
        <nav>
          <ul>
            <li><a href='#profile'>Perfil</a></li>
            <li><a href='#profile-posts'>Meus Posts</a></li>
          </ul>
        </nav>
      </aside>
    </div>
  </div>
  <section id='posts-container'>
  </section>
  `

  const commentComponent = (comment) => {
    const commentPostUser = document.createElement('div')
    const commentBy = document.createElement('div');
    const commentText = document.createElement('textarea');

    commentPostUser.classList.add('comments-container');
    commentBy.classList.add('commented-by');
    commentText.classList.add('textareaComments');

    commentText.setAttribute('disabled', 'disabled');

    commentBy.innerHTML = `${comment.name} em ${comment.date}`;
    commentText.innerHTML = `${comment.comment}`;

    commentPostUser.append(commentBy, commentText)

    return commentPostUser;
  }

  const postComponent = (doc) => {
    const data = doc.data();
    const post = document.createElement('div');
    const postedByBox = document.createElement('div');
    const postedBy = document.createElement('span');
    const postText = document.createElement('textarea');
    const buttonsWrap = document.createElement('div');
    const likes = document.createElement('div');
    const likeBtn = document.createElement('button');
    const numberLikesInMyPosts = document.createElement('span');
    const optionPrivacyPost = document.createElement('span');
    const comments = document.createElement('section');

    post.classList.add('div-posts');
    postedByBox.classList.add('posted-box-by', 'box');
    postedBy.classList.add('name-user-published');
    postText.classList.add('content-post', 'posted-box-text', 'box');
    buttonsWrap.classList.add('posted-box-options', 'box');
    likeBtn.classList.add('btn-icon', 'like');
    numberLikesInMyPosts.classList.add('numberLikes');

    postText.setAttribute('disabled', 'disabled');
    post.setAttribute('data-postid', doc.id);

    postedBy.innerHTML = `Publicado por ${data.name} em ${data.timestamps}`;
    postText.innerHTML = `${data.post}`;
    likeBtn.innerHTML = `<i class='fas fa-heart icon'></i>`;
    numberLikesInMyPosts.innerText = `${data.likes}`;
    optionPrivacyPost.innerText = `${data.privacy}`

    postedByBox.append(postedBy)
    likes.append(likeBtn, numberLikesInMyPosts)
    buttonsWrap.append(likes, optionPrivacyPost)
    post.append(postedByBox, postText, buttonsWrap)
    
    if(data.comments) {
      data.comments.forEach(comment => {
        comments.append(commentComponent(comment));
      })
    }

    post.append(comments);

    return post
  }

  loadedAllMyPosts()
  .then((arrayPosts) => {
    const postsContainer = profilePagePosts.querySelector('#posts-container');
    arrayPosts.forEach((doc) => {
      postsContainer.append(postComponent(doc))
    })
  })

  // FUNÇÃO COMENTADA PARA MUDAR A PRIVACIDADE DO POST 
  // const optionPrivacy = document.querySelector('#option-privacy');
  // const changePrivacy = () => {
  //   editPrivacyPost(doc.id, optionPrivacy.value);
  //   // return optionPrivacy.value;
  //   console.log(optionPrivacy.value)
  // } 

  // optionPrivacy.addEventListener('change', changePrivacy);
 
  setTimeout(() => {
    const menu = profilePagePosts.querySelector('.nav-main');
    const divToClose = profilePagePosts.querySelector('.divToClose');

    profilePagePosts.querySelector('#openMenu').addEventListener('click', () => {
      menu.classList.toggle('display-block');
    });

    divToClose.addEventListener('click', () => {
      menu.classList.remove('display-block');
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        menu.classList.add('display-block');
      } else {
        menu.classList.toggle('display-block');
      }
    });
  }, 1000)

  return profilePagePosts;
}