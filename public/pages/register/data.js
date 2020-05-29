export const register = firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => console.log("Login realizado"))
  .catch( (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Login não realizado")
});