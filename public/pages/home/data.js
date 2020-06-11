export const posts = (text, value) => {
  const Posts = {
    post: text,
    name: firebase.auth().currentUser.displayName,
    likes: 0,
    userUid: firebase.auth().currentUser.uid,
    timestamps: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR'),
    privacy: value
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
    .where('userUid', '==', firebase.auth().currentUser.uid)
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

export const saveEditPost = (text, id) => {
  return firebase
    .firestore()
    .collection('posts')
    .doc(id)
    .update({
      post: text
    });
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