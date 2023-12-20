import { useState } from "react";
import app from "../Firebase/firebase.init";
import "./SignIn.css"
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";


const SignIn = () => {
    const [user, setUser] = useState("");
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
        .then( result => {
            const loggedUser = result.user;
            setUser(loggedUser);
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null);
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div className="signin-button">
            {
                user ?
                    <button onClick={handleSignOut}>SignOut</button>
                    :
                    <>
                        <button onClick={handleGoogleSignIn}>Sign In With Google</button>
                        <button onClick={handleGithubSignIn}>Sign In With Github</button>
                    </>
            }
            {
                user &&
                <div>
                    <p>User: {user?.displayName}</p>
                    <p>Email: {user?.email}</p>
                    <img src={user.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default SignIn;