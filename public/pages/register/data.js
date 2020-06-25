const createUser = (email, firstName, lastName, userAge, bio) => {
  firebase
    .firestore()
    .collection('users').add({
      firstName,
      lastName,
      age: userAge,
      email,
      bio,
      userUid: firebase.auth().currentUser.uid,
    });
};

export const register = (email, password, firstName, lastName, userAge, bio, userUid) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      firebase.auth().currentUser.updateProfile({ displayName: `${firstName} ${lastName}` });
    })
    .then(() => {
      createUser(email, firstName, lastName, userAge, bio, userUid);
      window.location = '#login';
    });
};
