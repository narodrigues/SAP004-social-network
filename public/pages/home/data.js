// export const teste = () => {

// }

export const posts = (text, username, likes, friendComment, friendName, timestamp) => {
	const db = firebase.firestore();

	db.collection("posts").add({
		post: text,
		username: username,
		likes: likes,
		comments: {
			friendNomment: friendComment,
			friendName: friendName,
			timestamp: timestamp
		}
	});
}


export const signOut = () => {
	firebase.auth().signOut().then(() => {
		window.location.href = "#login"
	  })
}
//para colocar o nome da pessoa junto da foto
// export const userId = firebase.auth().currentUser.uid;
// firebase.firestore()
//   .collection('users')
//   .where('user_uid', '==', userId)
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((user) => {
  //    document.(#id) innerHTML = `oi, {$user}`
//       console.log(user)
//     });
//   });