export const register = (email, password, firstName, lastName, age, confirmPassword) => firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
	window.location = "#teste"
	createUser(email, password, firstName, lastName, age, confirmPassword)
	})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Login não realizado")
});

const createUser = (email, password, firstName, lastName, age, confirmPassword) => {
	const db = firebase.firestore();
	db.collection("users").doc(firstName).set({
	firstName: firstName,
	lastName: lastName,
	age: age,
	email: email,
});
}


// export const emailValidation = (emailInput) => {
// 	firebase
// 	.firestore()
// 	.collection("users")
// 	.where("email", "==", emailInput)
// 	.get()
// 	.then((querySnapshot) => {
// 		if(querySnapshot.docs.length){
// 			querySnapshot.forEach((doc) => {
// 				console.log(doc.data().email);
// 				window.location = "#teste";
// 		}); 
// 		} else{
// 			alert("usuario nao encontrado")
// 		}
// 	})
// 	.catch((error) => {
// 		console.log("Error getting documents: ", error);
// 	});
// }