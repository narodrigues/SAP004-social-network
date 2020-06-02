export const register = (email, password, firstName, lastName, age) => firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
		createUser(email, firstName, lastName, age);
		window.location = "#teste";
	})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Login não realizado")
});

const createUser = (email, firstName, lastName, age) => {
	const db = firebase.firestore();

	db.collection("users").doc(email).set({
		firstName: firstName,
		lastName: lastName,
		age: age,
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