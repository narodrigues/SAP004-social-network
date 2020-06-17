export const getUserInfos = () => {
  return firebase
  .firestore()
  .collection('users')
  .where('userUid', '==', firebase.auth().currentUser.uid)
  .get()
  .then((querySnapshot) => {
    const arrayWithPosts = [];
    querySnapshot.forEach(doc => {
      arrayWithPosts.push(doc);
    });
    return arrayWithPosts;
  });
}


export const editUserInfos = (id, bio, gender, relationship, about) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(id)
    .update({
      bio: bio,
      gender: gender,
      relationship: relationship,
      about: about
    })
}