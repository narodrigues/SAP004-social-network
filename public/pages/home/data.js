export const posts = (text, value) => {
  const Posts = {
    post: text,
    name: firebase.auth().currentUser.displayName,
    likes: 0,
    userUid: firebase.auth().currentUser.uid,
    timestamps: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR'),
    privacy: value,
    commentsCount: 0,
  }
  return firebase
    .firestore()
    .collection('posts')
    .add(Posts)
    .then((docRef) => docRef
    .get()
    .then((doc) => doc))
}

export const loadingPost = () => {
  return firebase
    .firestore()
    .collection('posts')
    .where('privacy', '==', 'public')
    .limit(10)
    .orderBy('timestamps', 'desc')
    .get()
    .then(
      querySnapshot => {
      const arrayWithPosts = [];
      querySnapshot.forEach(doc => {
        arrayWithPosts.push(doc);
      });
      return arrayWithPosts;
    });
}

// export const showComments = () => {
//   return firebase
//     .firestore()
//     .collection('posts')
//     .where('privacy', '==', 'public')
//     .limit(10)
//     .orderBy('timestamps', 'desc')
//     .collection('comments')
//     .orderBy('timestamps', 'desc')
//     .get()
//     .then(
//       querySnapshot => {
//       const arrayWithPosts = [];
//       querySnapshot.forEach(doc => {
//         arrayWithPosts.push(doc);
//       });
//       return arrayWithPosts;
//     });
// }

export const saveEditPost = (text, id, privacy) => {
  return firebase
    .firestore()
    .collection('posts')
    .doc(id)
    .update({
      post: text,
      privacy: privacy
    })
}

export const editLikes = (like, id) => {
  return firebase
    .firestore()
    .collection('posts')
    .doc(id)
    .update({
      "likes": like
    })
}

export const comments = (comment, id) => {
  const Comments = {
    name: firebase.auth().currentUser.displayName,
    userUid: firebase.auth().currentUser.uid,
    date: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR'),
    comment: comment,
  }
  return firebase
    .firestore()
    .collection('posts')
    .doc(id)
    .collection('comments')
    .add(Comments)
    .then((comments) => {comments})
}

export const deletePost = (id) => {
  return firebase
    .firestore()
    .collection('posts')
    .doc(id)
    .delete()
}

export const deleteComment = (id) => {
  return firebase
    .firestore()
    .collection('posts')
    .doc(id)
    .update({
    commentsCount: firebase.firestore.FieldValue.increment(-1),
    comments: firebase.firestore.FieldValue.delete()
  })
}

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = '#login';
    });
}