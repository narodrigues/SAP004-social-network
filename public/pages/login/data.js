export const signIn = (email, password) => {
	firebase
	.auth()
	.signInWithEmailAndPassword(email, password)
	.then(() => window.location = '#feed')
	.catch((error) => {
		alert(error.code);
	});
}

export const signInGoogle = () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	return firebase
	.auth()
	.signInWithPopup(provider)
	.then((result) => {
		const user = {
			firstName: result.additionalUserInfo.profile.given_name,
			lastName: result.additionalUserInfo.profile.family_name,
			email: result.user.email
		}
		firebase
		.firestore()
		.collection('users')
		.add(user);
		window.location = '#feed';
	})
	.catch(() => {
		alert('login não realizado, tente novamente');
	});
}