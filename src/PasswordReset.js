import { useAuth } from "./contexts/AuthContext";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const PasswordReset = () => {
  const { passReset } = useAuth();

  const formRef = useRef();
  const emailRef = useRef();

  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await passReset(emailRef.current.value);
      setMessage("Action taken! Check your email for further instructions");
    } catch {
      setError("Failed to send password reset email");
    }
    setLoading(false);
    formRef.current.reset();
  }

  return (
    <div className="flex items-center justify-center flex-wrap">
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="mx-auto  p-8 border border-solid border-black "
          style={{ minWidth: "400px" }}
          ref={formRef}
        >
          <h2 className="text-3xl mb-2 text-center">Reset Password</h2>
          {error && (
            <p className="bg-red-500 text-white border-solid border flex justify-center py-2 my-3 border-black">
              {error}
            </p>
          )}
          {message && (
            <p className="bg-green-500 text-white border-solid border flex justify-center py-2 my-3 border-black">
              {message}
            </p>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            className="block w-full box-border p-1 mt-1 mb-4"
            ref={emailRef}
            onClick={() => {
              setError("");
              setMessage("");
            }}
          />

          <button
            disabled={loading}
            className="mt-5 border-none text-white w-full p-1 text-base rounded bg-purple-1000 hover:bg-purple-1050"
          >
            Send password reset email
          </button>
        </form>
        <div className="w-100 mt-3 text-center">
          <Link to="/login">Already have an account? Log In</Link>
        </div>
      </div>

      <div className="w-100 mt-3 text-center">
        <Link to="/signup">Need an account? Sign Up</Link>
      </div>
    </div>
  );
};

export default PasswordReset;
