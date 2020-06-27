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
        </main>;
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
        addComments(postId, commentsText.value);
        loadAllPosts();
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
        saveEditComments(newComment, postId, postInfo.comments[x])
          .then(() => { loadAllPosts(); });
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

      const loadComments = (postId, postInfo, postsOnFeed, postsComment) => {
        if (postInfo.comments) {
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
              const commentTextarea = btnCommentsContainer.querySelector('.textareaComments');

              btnCommentsContainer.querySelector('.edit-comment').addEventListener('click', () => { editBtnFunctionsComment(saveEditedComment, commentTextarea); });
              btnCommentsContainer.querySelector('.save-edited-comment').addEventListener('click', () => { saveBtnOptionsComments(postId, postInfo, saveEditedComment, commentTextarea, x); });
              btnCommentsContainer.querySelector('.delete').addEventListener('click', () => { deleteCommentBtn(postId, postInfo, confirmDeleteComment, optionYes, optionNo, x); });

              commentsContainer.append(btnCommentsContainer);
            }
            postsOnFeed.append(postsComment);
            postsComment.prepend(commentsContainer);
          }
        }
      };

      const createPosts = (docAllPosts, prepend) => {
        const postInfo = docAllPosts.data();
        const postId = docAllPosts.id;
        const postsOnFeed = document.createElement('section');
        const postsBox = document.createElement('div');
        const postedBy = document.createElement('span');
        const msgPost = document.createElement('textarea');
        const buttonsWrap = document.createElement('div');
        const buttonsPostEditAndDelete = document.createElement('div');
        const buttonsWrapEdit = document.createElement('div');
        const postsComment = document.createElement('section');
        const postsContainer = feedTemplate.querySelector('#posts-container');

        postedBy.innerHTML = `Publicado por ${postInfo.name} em ${postInfo.timestamps}`;
        msgPost.innerHTML = `${postInfo.post}`;

        postsOnFeed.classList.add('div-posts');
        postsBox.classList.add('posted-box-by', 'box');
        postedBy.classList.add('name-user-published');
        msgPost.classList.add('content-post', 'posted-box-text', 'box');
        buttonsPostEditAndDelete.classList.add('btns-default');
        buttonsWrap.classList.add('posted-box-options', 'box');
        buttonsWrapEdit.classList.add('div-edit');
        postsComment.classList.add('post-comment');

        msgPost.setAttribute('disabled', 'disabled');
        msgPost.setAttribute('rows', '7');
        postsOnFeed.setAttribute('data-postid', postId);

        postsOnFeed.append(postsBox, msgPost, postsComment);
        postsBox.append(postedBy);

        if (postInfo.userUid === firebaseAuth.uid) {
          const editBtn = document.createElement('button');
          const saveBtn = document.createElement('button');
          const deleteBtn = document.createElement('button');
          const confirmDeletePost = document.createElement('div');
          const message = document.createElement('span');
          const optionYes = document.createElement('button');
          const optionNo = document.createElement('button');
          const selectPrivacy = document.createElement('select');
          const optionPublic = document.createElement('option');
          const optionPrivate = document.createElement('option');

          optionPrivate.innerHTML = 'Privado';
          optionPublic.innerHTML = 'Público';
          editBtn.innerHTML = '<i class="fas fa-edit icon"></i>';
          saveBtn.innerHTML = '<i class="far fa-save icon"></i>';
          deleteBtn.innerHTML = '<i class="fas fa-trash-alt icon"></i>';
          optionYes.innerHTML = '<i class="far fa-check-circle icon"></i>';
          optionNo.innerHTML = '<i class="far fa-times-circle icon"></i>';
          message.innerText = `ATENÇÃO!
          Deseja mesmo excluir essa publicação?`;

          editBtn.classList.add('btn-icon');
          saveBtn.classList.add('icon-none', 'btn-icon', 'edit-icon');
          selectPrivacy.classList.add('icon-none', 'edit-icon');
          deleteBtn.classList.add('btn-icon', 'delete-post');
          confirmDeletePost.classList.add('container-option');
          confirmDeletePost.classList.add('icon-none');
          optionYes.classList.add('btn-icon');
          optionNo.classList.add('btn-icon');

          selectPrivacy.id = 'select-privacy';

          optionPublic.setAttribute('value', 'public');
          optionPrivate.setAttribute('value', 'private');

          buttonsWrap.append(buttonsPostEditAndDelete, confirmDeletePost);
          buttonsPostEditAndDelete.append(buttonsWrapEdit, deleteBtn);
          buttonsWrapEdit.append(editBtn, saveBtn, selectPrivacy);
          confirmDeletePost.append(message, optionYes, optionNo);
          postsOnFeed.append(buttonsWrap);
          selectPrivacy.append(optionPublic, optionPrivate);

          editBtn.addEventListener('click', () => { editBtnFunctions(saveBtn, selectPrivacy, msgPost); });
          saveBtn.addEventListener('click', () => { saveBtnOptions(postId, saveBtn, selectPrivacy, msgPost); });
          deleteBtn.addEventListener('click', () => { deletePostBtn(postId, optionYes, optionNo, confirmDeletePost); });
        } else {
          const likeBtn = document.createElement('button');
          const numberLikes = document.createElement('div');
          const commentBtn = document.createElement('button');
          const commentsOptions = document.createElement('div');
          const commentsText = document.createElement('textarea');
          const commentsBtns = document.createElement('div');
          const commentsCancelBtn = document.createElement('button');
          const commentsPostBtn = document.createElement('button');

          if (postInfo.likes.length >= 1) {
            for (let x = 0; x < postInfo.likes.length; x += 1) {
              if (firebaseAuth.uid === postInfo.likes[x].userId) {
                likeBtn.innerHTML = '<i class="fas fa-heart icon"></i>';
              } else {
                likeBtn.innerHTML = '<i class="far fa-heart icon"></i>';
              }
            }
          } else {
            likeBtn.innerHTML = '<i class="far fa-heart icon"></i>';
          }

          numberLikes.innerHTML = `${postInfo.likes.length}`;
          commentBtn.innerHTML = '<i class="fas fa-comments icon"></i>';
          commentsCancelBtn.innerHTML = '<i class="far fa-times-circle icon"></i>';
          commentsPostBtn.innerHTML = '<i class="far fa-check-circle icon"></i>';

          likeBtn.classList.add('btn-icon', 'like');
          numberLikes.classList.add('numberLikes');
          commentBtn.classList.add('btn-icon');
          commentsOptions.classList.add('icon-none');
          commentsText.classList.add('textarea-post-comment');
          commentsBtns.classList.add('comments-btns');
          commentsCancelBtn.classList.add('btn-icon', 'btn-cancel');
          commentsPostBtn.classList.add('btn-icon', 'sendPost', 'btn-send');

          buttonsWrap.append(buttonsPostEditAndDelete);
          buttonsPostEditAndDelete.append(likeBtn, numberLikes, commentBtn);
          postsOnFeed.append(buttonsWrap, commentsOptions);
          commentsOptions.append(commentsText, commentsBtns);
          commentsBtns.append(commentsPostBtn, commentsCancelBtn);

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
        loadComments(postId, postInfo, postsOnFeed, postsComment);
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
