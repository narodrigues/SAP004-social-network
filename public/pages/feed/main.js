import { signOut, posts, loadingPost, saveEditPost, deletePost, editLikes, addComments, deleteOnlyComment, saveEditComments } from "./data.js";

export const feed = () => {
  const feedTemplate = document.createElement('div');
  feedTemplate.classList.add('page-feed', 'pages');
  window.location.href = '#feed';
  feedTemplate.innerHTML = `
    <header class='header-catarse'>
    <button class='btn-icon' id='openMenu'><i class='fas fa-bars icon menu'></i></button>
    <nav class='nav-main'>
      <ul>
        <li id='profile'><a href='#profile'>Perfil</a></li>
        <li class='sign-out' id='signOut'>Sair</li>
      </ul>
    </nav>
    <img src='./assets/feed-logo.png'>
  </header>
    <main class='main-feed container'>
      <section class='user-profile'>
        <figure id='user-img'>
          <img src='${localStorage.getItem('photo')}' alt='Foto de perfil' class='feed-profile-picture'>
        </figure>
        <div class='profile-data'>
          <span id='userName'>${firebase.auth().currentUser.displayName}</span>
          <span id='bio'>${localStorage.getItem('bio')}</span>
        </div>
      </section>
      <div class='container'>
        <section class='feed-write-post'>
          <form class='form-feed'>
            <textarea id='post-field' class='post-field' placeholder='O que deseja compartilhar?'></textarea>
            <div class='post-field-options'>
              <form>
                <div id='form-privacy-options'>
                  <label for='option-public'> 
                    <i class='fas fa-unlock icon privacity-icon'></i>
                    <input type='radio' name='privacy' id='option-public' class='btn-icon privacy-options' value='public' checked>
                  </label>
                  <label for='option-private'>
                    <i class='fas fa-lock icon'></i>
                    <input type='radio' name='privacy' id='option-private' class='btn-icon privacy-options' value='private'>
                  </label>
                </div>
              </form>
              <button id='share-post' class='btn'>Postar</button>
            </div>
          </form>
        </section>
        <article class='feed-posts-container' id='posts-container'></article>
      </div>
    </main>
  `

  const menu = feedTemplate.querySelector('.nav-main');
  const mainToClose = feedTemplate.querySelector('.main-feed');

  feedTemplate.querySelector('#openMenu').addEventListener('click', () => {
    menu.classList.toggle('display-block');
  });

  mainToClose.addEventListener('click', () => {
    menu.classList.remove('display-block');
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      menu.classList.add('display-block');
    } else {
      menu.classList.toggle('display-block');
    }
  });

  loadingPost()
  .then((arrayPosts) => {
    feedTemplate.querySelector('#posts-container').innerHTML = "";
    arrayPosts.forEach((doc) => {
      createPosts(doc);
    })
  })


  const createPosts = (doc, prepend) => {
    const post = doc.data();
    const postsOnFeed = document.createElement('section');
    const postsBox = document.createElement('div');
    const postedBy = document.createElement('span');
    const msgPost = document.createElement('textarea');
    const buttonsWrap = document.createElement('div');
    const buttonsWrapEdit = document.createElement('div');
    const postsComment = document.createElement('section');
    const postsContainer = feedTemplate.querySelector('#posts-container');

    postedBy.innerHTML = `Publicado por ${post.name} em ${post.timestamps}`;
    msgPost.innerHTML = `${post.post}`;

    postsOnFeed.classList.add('div-posts');
    postsBox.classList.add('posted-box-by', 'box');
    postedBy.classList.add('name-user-published');
    msgPost.classList.add('content-post', 'posted-box-text', 'box');
    buttonsWrap.classList.add('posted-box-options', 'box');
    buttonsWrapEdit.classList.add('div-edit');
    postsComment.classList.add('post-comment');

    msgPost.setAttribute('disabled', 'disabled');
    postsOnFeed.setAttribute('data-postid', doc.id);

    postsOnFeed.append(postsBox, msgPost, postsComment);
    postsBox.append(postedBy);

    if (post.userUid === firebase.auth().currentUser.uid) {
      const editBtn = document.createElement('button');
      const saveBtn = document.createElement('button');
      const deleteBtn = document.createElement('button');
      const selectPrivacy = document.createElement('select');
      const optionPublic = document.createElement('option');
      const optionPrivate = document.createElement('option');

      optionPrivate.innerHTML = `Privado`;
      optionPublic.innerHTML = `Público`;
      editBtn.innerHTML = `<i class='fas fa-edit icon'></i>`;
      saveBtn.innerHTML = `<i class='far fa-save icon'></i>`;
      deleteBtn.innerHTML = `<i class='fas fa-trash-alt icon'></i>`;

      editBtn.classList.add('btn-icon');
      saveBtn.classList.add('i-none', 'btn-icon', 'edit-icon');
      selectPrivacy.classList.add('i-none', 'edit-icon');
      deleteBtn.classList.add('btn-icon', 'delete-post');

      selectPrivacy.id = 'select-privacy';

      // deleteBtn.setAttribute('data-postid', doc.id)
      optionPublic.setAttribute('value', 'public');
      optionPrivate.setAttribute('value', 'private');

      buttonsWrap.append(buttonsWrapEdit, deleteBtn);
      buttonsWrapEdit.append(editBtn, saveBtn, selectPrivacy)
      postsOnFeed.append(buttonsWrap);
      selectPrivacy.append(optionPublic, optionPrivate)

      const editBtnFunctions = () => {
        saveBtn.classList.remove('i-none');
        selectPrivacy.classList.remove('i-none');
        msgPost.removeAttribute('disabled');
        msgPost.focus();
      }

      const saveBtnOptions = () => {
        saveBtn.classList.add('i-none');
        selectPrivacy.classList.add('i-none');
        msgPost.setAttribute('disabled', 'disabled');

        const optionPrivacy = feedTemplate.querySelector('#select-privacy')
        const privacyValue = () => {
          return optionPrivacy.value;
        } 
  
        optionPrivacy.addEventListener('change', privacyValue);

        const changePostPrivacy = privacyValue();
        
        saveEditPost(msgPost.value, doc.id, changePostPrivacy);
      }

      const deletePostBtn = () => {
        const dataId = doc.id;
        feedTemplate.querySelector(`[data-postid='${dataId}']`).remove();
        deletePost(dataId);
      }

      editBtn.addEventListener('click', editBtnFunctions);
      saveBtn.addEventListener('click', saveBtnOptions);
      deleteBtn.addEventListener('click', deletePostBtn);

    } else {
      const likeBtn = document.createElement('button');
      const numberLikes = document.createElement('div');
      const commentBtn = document.createElement('button');
      const commentsOptions = document.createElement('div');
      const commentsText = document.createElement('textarea');
      const commentsCancelBtn = document.createElement('button');
      const commentsPostBtn = document.createElement('button');    
      
      likeBtn.innerHTML = `<i class='fas fa-heart icon'></i>`;
      numberLikes.innerText = `${doc.data().likes}`;
      commentBtn.innerHTML = `<i class='fas fa-comments icon'></i>`;
      commentsCancelBtn.innerHTML = `<i class="far fa-times-circle icon"></i>`
      commentsPostBtn.innerHTML = `<i class="far fa-check-circle icon"></i>`

      likeBtn.classList.add('btn-icon', 'like');
      numberLikes.classList.add('numberLikes');
      commentBtn.classList.add('btn-icon');

      commentsOptions.classList.add('i-none');
      commentsText.classList.add('textarea-post-comment');
      commentsCancelBtn.classList.add('btn-icon');
      commentsPostBtn.classList.add('btn-icon', 'sendPost'); 
      
      buttonsWrap.append(likeBtn, numberLikes, commentBtn);
      postsOnFeed.append(buttonsWrap, commentsOptions);
      commentsOptions.append(commentsText, commentsPostBtn, commentsCancelBtn);

      const addLikes = () => {
        const likeId = doc.id;
        let likes = (doc.data().likes) +1;
        editLikes(likes, likeId);

        numberLikes.setAttribute('data', 'number')
        document.querySelector(`.numberLikes`) + 1;
        numberLikes.innerHTML = doc.data().likes =+ likes;
      }

      const addComment = () => {
        const textComment = commentsText.value;
        addComments(doc.id, textComment);
        loadingPost()
        .then((arrayPosts) => {
          feedTemplate.querySelector('#posts-container').innerHTML = "";
          arrayPosts.forEach((doc) => {
            createPosts(doc);
          })
        })
      }

      commentsPostBtn.addEventListener('click', addComment);
      
      const showOptionsComments = () => {
        commentsOptions.classList.remove('i-none');
        commentsText.focus();
      }
        
      likeBtn.addEventListener('click', addLikes);
      commentBtn.addEventListener('click', showOptionsComments);
      }

      if (!prepend) {
        postsContainer.appendChild(postsOnFeed);
      } else {
        postsContainer.prepend(postsOnFeed);
      }
    
    function loadComments(){
      if(doc.data().comments){
        for(let x = 0; x < doc.data().comments.length; x++){
          const commentsContainer = document.createElement('div');
          const commentedBy= document.createElement('span'); 
          const commentTextarea= document.createElement('textarea');

          commentedBy.innerHTML = `${doc.data().comments[x].name} em ${doc.data().comments[x].date}`;
          commentTextarea.innerHTML = `${doc.data().comments[x].comment}`;

          commentsContainer.classList.add('comments-container');
          commentedBy.classList.add('commented-by');
          commentTextarea.classList.add('textareaComments');

          commentsContainer.setAttribute('data-commentid', doc.data().comments[x].id);
          commentTextarea.setAttribute('disabled', 'disabled');

          commentsContainer.append(commentedBy, commentTextarea);

          if(post.comments[x].userUid === firebase.auth().currentUser.uid){
            const btnCommentsContainer = document.createElement('div');
            const editComment = document.createElement('button');
            const saveEditedComment = document.createElement('button');
            const deleteComment = document.createElement('button');

            btnCommentsContainer.classList.add('btn-comments-container');
            editComment.classList.add('btn-icon', 'edit-comment');
            saveEditedComment.classList.add('btn-icon', 'i-none', 'save-edited-comment');
            deleteComment.classList.add('btn-icon', 'delete');

            editComment.innerHTML = `<i class='fas fa-edit icon'></i>`;
            saveEditedComment.innerHTML = `<i class='far fa-save icon'></i>`;
            deleteComment.innerHTML = `<i class='fas fa-trash-alt icon'></i>`;

            const editBtnFunctions = () => {
              saveEditedComment.classList.remove('i-none');
              commentTextarea.removeAttribute('disabled');
              // commentTextarea.setAttribute('autofocus', 'autofocus');
              commentTextarea.focus();
            }
      
            const saveBtnOptions = () => {
              saveEditedComment.classList.add('i-none');
              commentTextarea.setAttribute('disabled', 'disabled');

              const newComment = commentTextarea.value;
              const postId = doc.id;
              saveEditComments(newComment, postId, doc.data().comments[x])
            }
            
            const deleteCommenttBtn = () => {
              const postId = doc.id;
              const comments = doc.data().comments[x];
              const idComment = doc.data().comments[x].id;
              feedTemplate.querySelector(`[data-commentid='${idComment}']`).remove();
              deleteOnlyComment(postId, comments);
            }
          
            editComment.addEventListener('click', editBtnFunctions);
            saveEditedComment.addEventListener('click', saveBtnOptions);
            deleteComment.addEventListener('click', deleteCommenttBtn);

            commentsContainer.append(btnCommentsContainer);
            btnCommentsContainer.append(editComment, saveEditedComment, deleteComment);
          }
          
          postsOnFeed.append(postsComment);
          postsComment.prepend(commentsContainer)
        }
      } 
    }
    loadComments();
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