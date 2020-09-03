import {
  getUserInfos,
  signOut,
  posts,
  loadingPost,
  saveEditPost,
  deletePost,
  addLike,
  deleteLike,
  addComments,
  deleteOnlyComment,
  saveEditComments,
} from './data.js';

export const feed = () => {
  const feedTemplate = document.createElement('div');
  feedTemplate.classList.add('page-feed', 'pages');
  window.location.href = '#feed';

  getUserInfos().then((users) => {
    users.forEach((doc) => {
      const userInfos = doc.data();
      const firebaseAuth = firebase.auth().currentUser;

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
              <img src='${userInfos.img}' alt='Foto de perfil' id='img-profile' class='feed-profile-picture'>
            </figure>
            <div class='profile-data'>
              <span id='userName'>${firebaseAuth.displayName}</span>
              <span id='bio' class='user-bio'>${userInfos.bio || 'Seu status'}</span>
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
                  <button id='share-post' class='btn profile-btns'>Postar</button>
                </div>
              </form>
            </section>
            <article class='feed-posts-container' id='posts-container'></article>
          </div>
        </main>
      `;

      const imageUserNotFound = feedTemplate.querySelector('#img-profile');
      imageUserNotFound.onerror = () => {
        imageUserNotFound.src = './assets/user-profile-default.png';
      };

      const hamburgerMenu = () => {
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
      };
      hamburgerMenu();

      const loadAllPosts = () => {
        loadingPost()
          .then((arrayPosts) => {
            feedTemplate.querySelector('#posts-container').innerHTML = '';
            arrayPosts.forEach((docPosts) => {
              createPosts(docPosts);
            });
          });
      };
      loadAllPosts();

      const editBtnFunctions = (saveBtn, selectPrivacy, msgPost) => {
        saveBtn.classList.remove('icon-none');
        selectPrivacy.classList.remove('icon-none');
        msgPost.removeAttribute('disabled');
        msgPost.focus();
      };

      const saveBtnOptions = (postId, saveBtn, selectPrivacy, msgPost) => {
        saveBtn.classList.add('icon-none');
        selectPrivacy.classList.add('icon-none');
        msgPost.setAttribute('disabled', 'disabled');

        const privacyValue = () => selectPrivacy.value;

        selectPrivacy.addEventListener('change', privacyValue);

        saveEditPost(msgPost.value, postId, privacyValue());
      };

      const deletePostBtn = (postId, optionYes, optionNo, confirmDeletePost) => {
        confirmDeletePost.classList.toggle('icon-none');

        optionNo.addEventListener('click', () => {
          confirmDeletePost.classList.toggle('icon-none');
        });

        optionYes.addEventListener('click', () => {
          feedTemplate.querySelector(`[data-postid='${postId}']`).remove();
          deletePost(postId);
        });
      };

      const addLikes = (postInfo, postId) => {
        const currentUser = firebaseAuth.uid;
        const likesInPosts = postInfo.likes;
        if (likesInPosts.length === 0) {
          addLike(postId)
            .then(() => {
              loadAllPosts();
            });
        } else {
          for (let i = 0; i < likesInPosts.length; i += 1) {
            if (likesInPosts[i].userId === currentUser) {
              deleteLike(postId, likesInPosts[i])
                .then(() => {
                  loadAllPosts();
                });
            } else {
              addLike(postId)
                .then(() => {
                  loadAllPosts();
                });
            }
          }
        }
      };

      const addComment = (postId, commentsText) => {
        addComments(postId, commentsText.value)
          .then(() => loadAllPosts());
      };

      const showOptionsComments = (commentsOptions, commentsText) => {
        commentsOptions.classList.remove('icon-none');
        commentsOptions.classList.add('comments-box');
        commentsText.focus();
      };

      const cancelComment = (commentsOptions) => {
        commentsOptions.classList.add('icon-none');
        commentsOptions.classList.remove('comments-box');
      };

      const editBtnFunctionsComment = (saveEditedComment, commentTextarea) => {
        saveEditedComment.classList.remove('icon-none');
        commentTextarea.removeAttribute('disabled');
        commentTextarea.focus();
      };

      const saveBtnOptionsComments = (postId, postInfo, saveEditedComment, commentTextarea, x) => {
        saveEditedComment.classList.add('icon-none');
        commentTextarea.setAttribute('disabled', 'disabled');

        const newComment = commentTextarea.value;
        saveEditComments(newComment, postId, postInfo.comments[x]);
      };

      const deleteCommentBtn = (postId, postInfo, confirmDeleteComment, optionYes, optionNo, x) => {
        confirmDeleteComment.classList.toggle('icon-none');

        optionNo.addEventListener('click', () => {
          confirmDeleteComment.classList.toggle('icon-none');
        });

        optionYes.addEventListener('click', () => {
          feedTemplate.querySelector(`[data-commentid='${postInfo.comments[x].id}']`).remove();

          deleteOnlyComment(postId, postInfo.comments[x]);
        });
      };

      const loadComments = (postId, postInfo, postsOnFeed, commentsBox) => {
        if (postInfo.comments && postInfo.comments.length > 0) {
          postsOnFeed.querySelector('.comments-section').classList.add('post-comment');
          postsOnFeed.querySelector('.post-options').classList.add('radius-none');

          for (let x = 0; x < postInfo.comments.length; x += 1) {
            const commentsContainer = document.createElement('div');
            commentsContainer.classList.add('comments-container');
            commentsContainer.setAttribute('data-commentid', postInfo.comments[x].id);

            commentsContainer.innerHTML = `
              <span class='commented-by'>${postInfo.comments[x].name} em ${postInfo.comments[x].date}</span>
              <textarea class='textareaComments' rows='7' disabled>${postInfo.comments[x].comment}</textarea>
            `;

            if (postInfo.comments[x].userUid === firebaseAuth.uid) {
              const btnCommentsContainer = document.createElement('div');
              btnCommentsContainer.classList.add('btn-comments-container', 'posted-box-options');

              btnCommentsContainer.innerHTML = `
                <div class='btns-default'>
                  <button class='btn-icon edit-comment'><i class="fas fa-edit icon"></i></button>
                  <button class='btn-icon icon-none save-edited-comment'><i class="far fa-save icon"></i></button>
                  <button class='btn-icon delete'><i class="fas fa-trash-alt icon"></i></button>
                </div>
                <div class='container-option icon-none'>
                  <span>ATENÇÃO!
                  Deseja mesmo excluir esse comentário?</span>
                  <button class='btn-icon option-yes'><i class="far fa-check-circle icon"></i></button>
                  <button class='btn-icon option-no'><i class="far fa-times-circle icon"></i></button>
                </div>
              `;

              const optionYes = btnCommentsContainer.querySelector('.option-yes');
              const optionNo = btnCommentsContainer.querySelector('.option-no');
              const confirmDeleteComment = btnCommentsContainer.querySelector('.container-option');
              const saveEditedComment = btnCommentsContainer.querySelector('.save-edited-comment');
              const commentTextarea = commentsContainer.querySelector('.textareaComments');

              btnCommentsContainer.querySelector('.edit-comment').addEventListener('click', () => { editBtnFunctionsComment(saveEditedComment, commentTextarea); });
              btnCommentsContainer.querySelector('.save-edited-comment').addEventListener('click', () => { saveBtnOptionsComments(postId, postInfo, saveEditedComment, commentTextarea, x); });
              btnCommentsContainer.querySelector('.delete').addEventListener('click', () => { deleteCommentBtn(postId, postInfo, confirmDeleteComment, optionYes, optionNo, x); });

              commentsContainer.append(btnCommentsContainer);
            }
            postsOnFeed.append(commentsBox);
            commentsBox.prepend(commentsContainer);
          }
        }
      };

      const createPosts = (docAllPosts, prepend) => {
        const postInfo = docAllPosts.data();
        const postId = docAllPosts.id;
        const postsContainer = feedTemplate.querySelector('#posts-container');
        const postsOnFeed = document.createElement('section');

        postsOnFeed.classList.add('div-posts');
        postsOnFeed.setAttribute('data-postid', postId);
        postsOnFeed.innerHTML = `
          <div class='posted-box-by box'>
            <span class='name-user-published'>Publicado por ${postInfo.name} em ${postInfo.timestamps}</span>
          </div>
          <textarea class='content-post posted-box-text box post-textarea' disabled rows='7'>${postInfo.post}</textarea>
          <div class='posted-box-options box post-options'>
            <div class='btns-default'></div>
          </div>
          <div class='icon-none write-comment'></div>
          <section class='comments-section'></section>
        `;

        if (postInfo.userUid === firebaseAuth.uid) {
          const postOptions = postsOnFeed.querySelector('.post-options');
          const btnsdeledit = postsOnFeed.querySelector('.btns-default');
          const confirmDeletePost = document.createElement('div');
          confirmDeletePost.classList.add('container-option', 'icon-none');

          btnsdeledit.innerHTML = `
            <div class='div-edit'>
              <button class='btn-icon' id='edit-icon'><i class="fas fa-edit icon"></i></button>   
              <button class='btn-icon edit-icon icon-none save-icon'><i class="far fa-save icon"></i></button>
              <select class='icon-none edit-icon select-privacy'>
                <option value='public'>Público</option>
                <option value='private'>Privado</option>                
              </select>
            </div>
            <button class='btn-icon delete-post'><i class="fas fa-trash-alt icon"></i></button>
          `;

          confirmDeletePost.innerHTML = `
            <span>ATENÇÃO! Deseja mesmo excluir essa publicação?</span>
            <button class='btn-icon option-yes'><i class="far fa-check-circle icon"></i></button>
            <button class='btn-icon option-no'><i class="far fa-times-circle icon"></i></button>
          `;

          postOptions.append(confirmDeletePost);

          const saveBtn = btnsdeledit.querySelector('.save-icon');
          const msgPost = postsOnFeed.querySelector('.post-textarea');
          const selectPrivacy = btnsdeledit.querySelector('.select-privacy');
          const optionYes = confirmDeletePost.querySelector('.option-yes');
          const optionNo = confirmDeletePost.querySelector('.option-no');

          btnsdeledit.querySelector('#edit-icon').addEventListener('click', () => { editBtnFunctions(saveBtn, selectPrivacy, msgPost); });
          saveBtn.addEventListener('click', () => { saveBtnOptions(postId, saveBtn, selectPrivacy, msgPost); });
          btnsdeledit.querySelector('.delete-post').addEventListener('click', () => { deletePostBtn(postId, optionYes, optionNo, confirmDeletePost); });
        } else {
          const btnsdeledit = postsOnFeed.querySelector('.btns-default');
          const commentsOptions = postsOnFeed.querySelector('.write-comment');

          btnsdeledit.innerHTML = `
            <button class='btn-icon like'><i class="far fa-heart icon"></i></button>
            <div>${postInfo.likes.length}</div>
            <button class='btn-icon comment-btn'><i class="fas fa-comments icon"></i></button>
          `;

          commentsOptions.innerHTML = `
            <textarea class='textarea-post-comment'></textarea>
            <div class='comments-btns'>
            <button class='btn-icon btn-send-comment'><i class="far fa-check-circle icon"></i></button>  
            <button class='btn-icon btn-cancel-comment'><i class="far fa-times-circle icon"></i></button>
            </div>
          `;

          const likeBtn = btnsdeledit.querySelector('.like');
          const commentBtn = btnsdeledit.querySelector('.comment-btn');
          const commentsText = commentsOptions.querySelector('.textarea-post-comment');
          const commentsPostBtn = commentsOptions.querySelector('.btn-send-comment');
          const commentsCancelBtn = commentsOptions.querySelector('.btn-cancel-comment');

          if (postInfo.likes.length >= 1) {
            for (let x = 0; x < postInfo.likes.length; x += 1) {
              if (firebaseAuth.uid === postInfo.likes[x].userId) {
                likeBtn.innerHTML = '<i class="fas fa-heart icon"></i>';
              }
            }
          }

          commentsPostBtn.addEventListener('click', () => { addComment(postId, commentsText); });
          commentsCancelBtn.addEventListener('click', () => { cancelComment(commentsOptions); });
          likeBtn.addEventListener('click', () => { addLikes(postInfo, postId); });
          commentBtn.addEventListener('click', () => { showOptionsComments(commentsOptions, commentsText); });
        }

        if (!prepend) {
          postsContainer.appendChild(postsOnFeed);
        } else {
          postsContainer.prepend(postsOnFeed);
        }

        const commentsBox = postsOnFeed.querySelector('.comments-section');

        loadComments(postId, postInfo, postsOnFeed, commentsBox);
      };

      feedTemplate.querySelector('#share-post').addEventListener('click', (e) => {
        e.preventDefault();
        const postText = feedTemplate.querySelector('#post-field').value;
        const privacyOptions = feedTemplate.querySelector('input[name="privacy"]:checked').value;

        posts(postText, privacyOptions)
          .then((docPosts) => {
            createPosts(docPosts, true);
          });
        feedTemplate.querySelector('#post-field').value = '';
      });
      feedTemplate.querySelector('#signOut').addEventListener('click', signOut);
    });
  });
  return feedTemplate;
};
