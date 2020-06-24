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

export const editedPersonalInfos = (id, gender, img) => firebase
  .firestore()
  .collection('users')
  .doc(id)
  .update({
    gender,
    img,
  });

export const editedAdditionalInfos = (id, bio, relationship, about) => firebase
  .firestore()
  .collection('users')
  .doc(id)
  .update({
    bio,
    relationship,
    about,
  });

const ref = firebase.storage().ref('imgs');
export const getUserImg = myFile => ref
  .child(`imgs + ${myFile.name}`)
  .put(myFile)
  .then(() => ref
    .child(`imgs + ${myFile.name}`)
    .getDownloadURL()
    .then(url => url));

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = '#login';
    });
};
