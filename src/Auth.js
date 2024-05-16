import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
// import { Link } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const formRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const formRefIn = useRef();
  const emailRefIn = useRef();
  const passRefIn = useRef();

  const signIn = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passRef.current.value
    )
      .then((cred) => {
        console.log(cred.user);
        formRef.current.reset();
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRefIn.current.value,
      passRefIn.current.value
    )
      .then(() => {
        console.log("logged in");
      })
      .catch((err) => {
        console.log(err);
      });

    navigate("/home");
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        formRefIn.current.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // these return an unsubscribe function so we can assign that to a variable -- other features you can unsubscribe from is the getDoc and getDocs
  const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log("user status changed:", user);
  });

  const unsub = () => {
    console.log("unsubscribing");
    unsubAuth();
  };

  return (
    <div className="sign-up-form">
      <h1>Sign Up Form</h1>
      <form onSubmit={signIn} ref={formRef}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" ref={emailRef} required />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" ref={passRef} required />
        <button>Sign Up</button>
      </form>

      <h1>Log In Form</h1>
      <form onSubmit={logIn} ref={formRefIn}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" ref={emailRefIn} required />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" ref={passRefIn} required />

        <button>Log in</button>
      </form>

      <button onClick={logOut}>Log out</button>

      {/* unsubscribe from auth changes */}
      {/* <button onClick={unsub}>Unsubscribe</button> */}
    </div>
  );
};

export default Auth;
