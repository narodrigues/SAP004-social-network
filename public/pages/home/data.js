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
		.then(function(doc) {
			// posts.add({postId: doc.id})
			console.log(posts)
			console.log("Document written with ID: ", doc.id);
		})

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
				console.log(doc)
			});
			return arrayWithPosts;
		});
}

// export const saveEditPost = (text) => {
// 	return firebase
// 	.firestore()
// 	.collection("posts")
// 	.get()
// 	.then(doc => {
// 		console.log(doc.data())
// 	});

// // ;	return firebase.firestore().collection('posts').get().doc().update()
// }

export const signOut = () => {
	firebase
		.auth()
		.signOut()
		.then(() => {
			window.location.href = "#login";
		});
}

