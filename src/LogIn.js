import { useAuth } from "./contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useRef, useState } from "react";

const LogIn = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const emailRef = useRef();
  const passRef = useRef();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passRef.current.value);
    } catch {
      setError("Failed to log in");
    } finally {
      setLoading(false);
      navigate("/");
    }
  }

  return (
    <div className="flex items-center justify-center flex-wrap">
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="mx-auto  p-8 border border-solid border-black "
          style={{ minWidth: "400px" }}
        >
          <h2 className="text-3xl mb-2 text-center">Log In</h2>
          {error && (
            <p className="bg-red-500 text-white border-solid border flex justify-center py-2 my-3 border-black">
              {error}
            </p>
          )}
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
          <button
            disabled={loading}
            className="mt-5 border-none text-white w-full p-1 text-base rounded bg-purple-1000 hover:bg-purple-1050"
          >
            Sign Up
          </button>
        </form>
        <div className="w-100 mt-3 text-center">
          <Link to="/password-reset">Forgot Password?</Link>
        </div>
      </div>

      <div className="w-100 mt-3 text-center">
        <Link to="/signup">Need an account? Sign Up</Link>
      </div>
    </div>
  );
};

export default LogIn;
