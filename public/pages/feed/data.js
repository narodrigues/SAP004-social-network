export const getUserInfos = () => firebase
  .firestore()
  .collection('users')
  .where('userUid', '==', firebase.auth().currentUser.uid)
  .get()
  .then((querySnapshot) => {
    const usersInfo = [];
    querySnapshot.forEach((doc) => {
      usersInfo.push(doc);
    });
    return usersInfo;
  });

export const posts = (text, value) => {
  const Posts = {
    post: text,
    name: firebase.auth().currentUser.displayName,
    likesCount: 0,
    likes: [],
    userUid: firebase.auth().currentUser.uid,
    timestamps: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR'),
    privacy: value,
    commentsCount: 0,
  };
  return firebase
    .firestore()
    .collection('posts')
    .add(Posts)
    .then(docRef => docRef
      .get()
      .then(doc => doc));
};

export const loadingPost = () => firebase
  .firestore()
  .collection('posts')
  .where('privacy', '==', 'public')
  .limit(10)
  .orderBy('timestamps', 'desc')
  .get()
  .then((querySnapshot) => {
    const arrayWithPosts = [];
    querySnapshot.forEach((doc) => {
      arrayWithPosts.push(doc);
    });
    return arrayWithPosts;
  });

export const saveEditPost = (text, id, value) => firebase
  .firestore()
  .collection('posts')
  .doc(id)
  .update({
    post: text,
    privacy: value,
  });

export const deletePost = id => firebase
  .firestore()
  .collection('posts')
  .doc(id)
  .delete();

export const addLike = id => firebase
  .firestore()
  .collection('posts')
  .doc(id)
  .update({
    likesCount: firebase.firestore.FieldValue.increment(1),
    likes: firebase.firestore.FieldValue.arrayUnion({
      userId: firebase.auth().currentUser.uid,
    }),
  });

export const deleteLike = (id, user) => firebase
  .firestore()
  .collection('posts')
  .doc(id)
  .update({
    likesCount: firebase.firestore.FieldValue.increment(-1),
    likes: firebase.firestore.FieldValue.arrayRemove({
      ...user,
    }),
  });

export const addComments = (id, text) => firebase
  .firestore()
  .collection('posts')
  .doc(id)
  .update({
    commentCount: firebase.firestore.FieldValue.increment(1),
    comments: firebase.firestore.FieldValue.arrayUnion({
      name: firebase.auth().currentUser.displayName,
      userUid: firebase.auth().currentUser.uid,
      date: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR'),
      comment: text,
      id: new Date().getTime(),
    }),
  });

export const saveEditComments = (text, id, commentTarget) => firebase
  .firestore()
  .collection('posts')
  .doc(id)
  .get()
  .then((doc) => {
    const mapComment = doc.data().comments.map((myComment) => {
      if (myComment.id === commentTarget.id) {
        const newComment = { ...commentTarget, comment: text };
        return newComment;
      }
      return myComment;
    });
    firebase
      .firestore()
      .collection('posts')
      .doc(id)
      .update({
        comments: mapComment,
      });
  });

export const deleteOnlyComment = (id, comments) => firebase
  .firestore()
  .collection('posts')
  .doc(id)
  .update({
    commentsCount: firebase.firestore.FieldValue.increment(-1),
    comments: firebase.firestore.FieldValue.arrayRemove({
      ...comments,
    }),
  });

export const signOut = () => firebase
  .auth()
  .signOut()
  .then(() => {
    window.location.href = '#login';
  });
