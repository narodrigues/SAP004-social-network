
export const posts = (text) => {
	const posts = {
		post: text,
		name: firebase.auth().currentUser.displayName,
		likes: 0,
		userUid: firebase.auth().currentUser.uid,
		timestamps: firebase.firestore.Timestamp.fromDate(new Date()).toDate().toLocaleString('pt-BR'),
	}
	return firebase
		.firestore()
		.collection("posts")
		.add(posts)
		.then(() => posts)
}

export const loadingPost = () => {
	return firebase
		.firestore()
		.collection("posts")
		.orderBy('timestamps', 'desc')
		.limit(5)
		.get()
		.then(querySnapshot => {
			const arrayWithPosts = [];
			querySnapshot.forEach(doc => {
				arrayWithPosts.push(doc.data());
			});
			return arrayWithPosts;
		});
}

export const saveEditPost = (text) => {
	// const idPost = text.target.dataset.class;
	return firebase.firestore().collection('posts').doc(docRef.id).update({
		post: text
	});  
}

export const signOut = () => {
	firebase
		.auth()
		.signOut()
		.then(() => {
			window.location.href = "#login";
		});
}

