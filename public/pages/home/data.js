export const posts = (text, value) => {
  const Posts = {
    post: text,
    name: firebase.auth().currentUser.displayName,
    likes: 0,
    userUid: firebase.auth().currentUser.uid,
    timestamps: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR'),
    privacy: value,
    commentsCount: 0,
    // comments: [{
    //   name: '',
    //   date: '',
    //   comment: ''
    // }]
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
    .limit(5)
    .orderBy('timestamps', 'desc')
    .get()
    .then(querySnapshot => {
      const arrayWithPosts = [];
      querySnapshot.forEach(doc => {
        arrayWithPosts.push(doc);
      });
      return arrayWithPosts;
    });
}

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

// export const loadComments = (id) => {
//   return firebase
//     .firestore()
//     .collection('posts')
//     .orderBy('timestamps', 'desc')
//     .doc(id)
//     .get()
//     .then(querySnapshot => {
//       const arrayWithComments = [];
//       querySnapshot.forEach(doc => {
//         arrayWithComments.push(doc);
//       });
//       return arrayWithComments;
//     });
//}

export const editComments = (comment, id) => {
  return firebase
    .firestore()
    .collection('posts')
    .doc(id)
    .update({
      commentCount: firebase.firestore.FieldValue.increment(1),
      comments: firebase.firestore.FieldValue.arrayUnion({
        name: firebase.auth().currentUser.displayName,
        date: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR'),
        comment: comment,
      })
    })
}

export const deletePost = (id) => {
  return firebase
    .firestore()
    .collection('posts')
    .doc(id)
    .delete()
}

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = '#login';
    });
}