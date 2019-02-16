import app from 'firebase/app'
import {auth} from 'firebase'

export default class FireHelper {
	constructor() {
		console.log(process.env)
		app.initializeApp({
			apiKey: process.env.REACT_APP_apiKey,
			authDomain: process.env.REACT_APP_authDomain,
			databaseURL: process.env.REACT_APP_databaseURL,
			projectId: process.env.REACT_APP_projectId,
			storageBucket: process.env.REACT_APP_storageBucket,
			messagingSenderId: process.env.REACT_APP_messagingSenderId

		});

		this.FireStore = app.firestore();


		this.provider = new auth.GoogleAuthProvider();
		this.auth = app.auth();

		let Credentials = localStorage.getItem("muhgoogle")
		let Creds = JSON.parse(Credentials);

		if (!Creds) return;


		console.log(Creds);
		this.DoPreviousPersonSignin(Creds);


	}

	async DoPreviousPersonSignin(Creds) {
		try {
			this.auth.signInWithCredential(auth.GoogleAuthProvider.credential(Creds.idToken, Creds.accessToken)).then(this.StoredSignInSuccess.bind(this)).catch((e) => {
				console.log(e);
			})
		} catch (e) {
			localStorage.removeItem('muhgoogle');
		}
	}

	doSignOut = () => this.auth.signOut();

	async GoogleSignin() {
		let SigninResult = await this.auth.signInWithPopup(this.provider)
		if (!SigninResult) return;
		return this.SignInSuccess(SigninResult);

	}

	StoredSignInSuccess(CurrentUser) {
		console.log("logged in", CurrentUser)
		this.User = CurrentUser;

	}

	SignInSuccess(SigninResult) {
		console.log(SigninResult);
		this.Token = SigninResult.credential.accessToken;
		console.log(SigninResult.credential);
		localStorage.setItem("muhgoogle", JSON.stringify({
			idToken: SigninResult.credential,
			accessToken: SigninResult.credential.accessToken,
			refreshToken: SigninResult.credential.refreshToken

		}))
		this.User = SigninResult.user;
		return SigninResult;
	}
}
