export const posts = (text) => {
  const posts = {
    post: text,
    name: firebase.auth().currentUser.displayName,
    likes: 0,
    userUid: firebase.auth().currentUser.uid,
    timestamps: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR'),
  }
  return firebase
    .firestore()
    .collection("posts")
    .add(posts)
    .then((docRef) => docRef.get().then((doc) => doc))
}

export const loadingPost = () => {
  return firebase
    .firestore()
    .collection("posts")
    .orderBy('timestamps', 'desc')
    .limit(5)
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
  console.log(text, id)
  return firebase.firestore().collection('posts').doc(id).update({
    post: text
  });
}

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "#login";
    });
}

