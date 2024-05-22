import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const LogIn = () => {
  const navigate = useNavigate();

  const formRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();

  const [error, setError] = useState();

  const logIn = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      pwdRef.current.value
    )
      .then((cred) => {
        console.log(cred.user);
        navigate("/home");
      })
      .catch((err) => {
        setError(err.message);
      });

    formRef.current.reset();
  };

  onAuthStateChanged(auth, (user) => {
    console.log(user);
  });
  return (
    <div>
      <form
        action=""
        className="mx-auto w-64 p-8 border border-solid border-black"
        ref={formRef}
      >
        <h2 className="text-3xl mb-2 ">Sign Up</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          className="block w-full box-border"
        />
        <label htmlFor="pwd">Password</label>
        <input
          type="password"
          id="pwd"
          ref={pwdRef}
          className="block w-full box-border"
        />
        <button className="mt-5" onClick={logIn}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default LogIn;
