import { useRef } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link } from "react-router-dom";

const Auth = () => {
  const formRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const formRefIn = useRef();
  const emailRefIn = useRef();
  const passRefIn = useRef();

  const formRefOut = useRef();

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
    );
  };

  const logOut = (e) => {
    e.preventDefault();
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
        <Link to="/home">
          <button>Log in</button>
        </Link>
      </form>

      <h1>Log Out Form</h1>
      <form onSubmit={logOut} ref={formRefOut}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" required />
        <Link to="/">
          <button>Log out</button>
        </Link>
      </form>
    </div>
  );
};

export default Auth;
