 export const signIn = (email, password) => firebase
	.auth().signInWithEmailAndPassword(email, password)
	.then(() => window.location = "#teste")
	.catch(() => {
		alert("Email ou senha inválidos.");
 });

export const signInGoogle = () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	return firebase.auth().signInWithPopup(provider).then((result) => {
		const user = {
			firstName: result.additionalUserInfo.profile.given_name,
			lastName: result.additionalUserInfo.profile.family_name,
			email: result.user.email
		}
		firebase.firestore().collection("users").add(user);
		window.location = "#teste";
	}).catch(() => {
		alert("login não realizado, tente novamente");
	});
}

/*export const emailValidation = (emailInput, passwordInput) => {
	firebase
	.firestore()
	.collection("users")
	.where("email", "==", emailInput)
	.where("password", "==", passwordInput)
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
}*/
