import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import app from "../Firebase/firebase.init";
import { Link } from "react-router-dom";
import "./Register.css";
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {


    const [error, setError] = useState("");
    const [sucess, setSucess] = useState("");

    const auth = getAuth(app);


    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSucess("");
        const email = event.target.email.value;
        const password = event.target.password.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSucess("You successfully Register in your account");
                emailVerification(loggedUser);
                toast.success("Please Verify Your Account");
            })
            .catch(error => {
                setError(error.message);
                console.log(error.message);
            })

        const emailVerification = (loggedUser) => {
            sendEmailVerification(loggedUser)
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    setError(error.message);
                })
        }
        event.target.reset();

    };




    return (
        <div>
            <h3>Please Register</h3>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" id="register-email" placeholder="Your Email" required />
                <br />
                <input type="password" name="password" id="password" placeholder="Your Password" required />
                <br />
                <input type="submit" value="Register" />
            </form>
            <p>Already have an account? <Link to={"/login"}>Login</Link></p>
            <p>{error}</p>
            <p className="success-text">{sucess}</p>
            <Toaster></Toaster>
        </div>
    );
};

export default Register;