import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const SignUp = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const passConfirmRef = useRef();
  const { signup, currentUser } = useAuth(); // I DONT UNDERSTAND THIS PART
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passRef.current.value !== passConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passRef.current.value);
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
    navigate("/home");
  }

  return (
    <div className="flex items-center justify-center flex-wrap">
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="mx-auto  p-8 border border-solid border-black "
          style={{ minWidth: "400px" }}
        >
          <h2 className="text-3xl mb-2 text-center">Sign Up</h2>
          {error && (
            <p className="bg-red-500 text-white border-solid border flex justify-center py-2  my-3 border-black">
              {error}
            </p>
          )}
          {}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            className="block w-full box-border p-1 mt-1 mb-4"
            ref={emailRef}
          />
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            id="pass"
            className="block w-full box-border p-1 mt-1 mb-4"
            required
            ref={passRef}
          />
          <label htmlFor="passConfirm">Password Confirmation</label>
          <input
            type="password"
            id="passConfirm"
            required
            ref={passConfirmRef}
            className="block w-full box-border p-1 mt-1 mb-2"
          />

          <button
            disabled={loading}
            className="mt-5 border-none text-white w-full p-1 text-base rounded bg-purple-1000 hover:bg-purple-1050"
          >
            Sign Up
          </button>
        </form>
      </div>

      <Link to="/login">
        <p className="p-4 text-center">Already have an account? Log In</p>
      </Link>
    </div>
  );
};

export default SignUp;
