export const loadedAllMyPosts = () => firebase
  .firestore()
  .collection('posts')
  .where('userUid', '==', firebase.auth().currentUser.uid)
  .orderBy('timestamps', 'desc')
  .get()
  .then((querySnapshot) => {
    const arrayWithPosts = [];
    querySnapshot.forEach((doc) => {
      arrayWithPosts.push(doc);
    });
    return arrayWithPosts;
  });

export const editPrivacyPost = (id, privacy) => firebase
  .firestore()
  .collection('posts')
  .doc(id)
  .update({
    privacy,
  });


export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = '#login';
    });
};
