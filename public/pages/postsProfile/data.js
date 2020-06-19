export const loadedAllMyPosts = () => {
  return firebase
    .firestore()
    .collection('posts')
    .where('userUid', '==', firebase.auth().currentUser.uid)
    .orderBy('timestamps', 'desc')
    .get()
    .then((querySnapshot) => {
      const arrayWithPosts = [];
      querySnapshot.forEach(doc => {
        arrayWithPosts.push(doc);
      });
      return arrayWithPosts;
    });
}

export const editPrivacyPost = (id, privacy) => {
  return firebase
    .firestore()
    .collection('posts')
    .doc(id)
    .update({
      privacy: privacy
    })
}