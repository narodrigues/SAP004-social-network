// export const teste = () => {

// }

export const posts = (text, username, likes, friendNomment, friendName, timestamp) => {
	const db = firebase.firestore();

	db.collection("posts").add({
		post: text,
		username: username,
		likes: likes,
		comments: {
			friendNomment: friendNomment,
			friendName: friendName,
			timestamp: timestamp
		}
	});
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