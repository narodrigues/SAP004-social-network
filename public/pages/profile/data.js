export const getUserInfos = () => {
  return firebase
  .firestore()
  .collection('users')
  .where('userUid', '==', firebase.auth().currentUser.uid)
  .get()
  .then((querySnapshot) => {
    const usersInfo = [];
    querySnapshot.forEach(doc => {
      usersInfo.push(doc);
    });
    return usersInfo;
  });
}

export const editedPersonalInfos = (id, gender) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(id)
    .update({
      gender: gender
    })
}

export const editedAdditionalInfos = (id, bio, relationship, about) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(id)
    .update({
      bio: bio,
      relationship: relationship,
      about: about
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