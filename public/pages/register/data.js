// export const register = firebase
//   .auth()
//   .createUserWithEmailAndPassword(email, password)
//   .then(() => console.log("Login realizado"))
//   .catch( (error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log("Login não realizado")
// });

export const createUser = (firstName, lastName, age, email, password, confirmPassword) => {
  const db = firebase.firestore();

  db.collection("users").doc(firstName).set({
    firstName: firstName,
    lastName: lastName,
    age: age,
    email: email,
    password: password,
    confirmPassword: confirmPassword
  });
}

export const emailValidation = (emailInput) => {
	firebase
	.firestore()
	.collection("users")
	.where("email", "==", emailInput)
	.get()
	.then((querySnapshot) => {
		if(querySnapshot.docs.length){
			querySnapshot.forEach((doc) => {
				console.log(doc.data().email);
				window.location = "#teste";
		}); 
		} else{
			alert("usuario nao encontrado")
		}
	})
	.catch((error) => {
		console.log("Error getting documents: ", error);
	});
}