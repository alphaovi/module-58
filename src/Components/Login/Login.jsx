import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import app from "../Firebase/firebase.init";
import { useRef, useState } from "react";
import "./Login.css";
import toast from "react-hot-toast";

const Login = () => {
    const [error, setError] = useState("");
    // const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");
    const [verifiedEmail, setVerifiedEmail] = useState("");
    const emailRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const auth = getAuth(app);

    const handleSubmit = (event) => {

        event.preventDefault();
        setSuccess("");
        setError("");


        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // setEmail(email);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSuccess("Congrates! You Successfully Logged In Your Account");
                if (loggedUser.emailVerified) {
                    setVerifiedEmail("Your Email Address Is Verified");
                    navigate(from, { replace: true })
                    return;
                }
                else {
                    setVerifiedEmail("Please Verify Your Email Address");
                    navigate(from, { replace: true })
                    return;
                }


            })

            .catch(error => {
                const errorMessage = error.message;
                setError(errorMessage)
                console.log(error.message);
            })
        form.reset();
    }

    const handleResetPassword = (event) => {
        const email = emailRef.current.value;
        console.log(email);
        if (!email) {
            toast("Please Enter Your Email Address");
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast("Send The Verification. Please Check Your Email");
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                setError(errorMessage);
                return;
            })

    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" id="email" placeholder="Your Email" ref={emailRef} required />
                <br />
                <input type="password" name="password" id="password" placeholder="Your Password" required />
                <br />
                <input type="submit" value="Login" />
            </form>
            <p>Forget Password? <button onClick={handleResetPassword}>Please Reset</button></p>
            <p>New in this site? <Link to={"/register"}>Register</Link></p>
            <p className="error-text">{error}</p>
            <p className="success-text">{success}</p>
            <p>{verifiedEmail}</p>
        </div>
    );
};

export default Login;