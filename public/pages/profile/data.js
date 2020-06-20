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

export const editedPersonalInfos = (id, gender, img) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(id)
    .update({
      gender: gender,
      img: img
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

export const getUserImg = (myFile) => {
  let ref = firebase.storage().ref('imgs');
  return ref
  .child('imgs' + myFile.name)
  .put(myFile)
  .then(() => {
    return ref
    .child('imgs' + myFile.name)
    .getDownloadURL()
    .then( url => { return url });
  });
}

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = '#login';
    });
}