// export const signIn = firebase
//   .auth().signInWithEmailAndPassword(email, password)
//   .then(() => console.log("login realizado"))
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log("não foi possível fazer o login pois não existe uma conta")
// });

export const signInGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
}