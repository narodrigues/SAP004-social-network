export const register = (email, password, firstName, lastName, userAge) => firebase
  	.auth()
	.createUserWithEmailAndPassword(email, password)
  .then(() => firebase.auth().currentUser.updateProfile({displayName: `${firstName} ${lastName}`}))
	.then(() => {
		createUser(email, firstName, lastName, userAge);
		window.location = "#teste";
	})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
		console.log("Login não realizado")
		
		if(errorCode === "auth/email-already-in-use"){
			alert("E-mail já cadastrado");
		} else if(errorCode === "auth/invalid-email"){
			alert("E-mail inválido");
		} else if(errorCode === "auth/weak-password"){
			alert("A senha é muito fraca");
		}
});

const createUser = (email, firstName, lastName, userAge) => {
	const db = firebase.firestore();

	db.collection("users").add({
		firstName: firstName,
		lastName: lastName,
		age: userAge,
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