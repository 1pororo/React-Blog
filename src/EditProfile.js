import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const EditProfile = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const passConfirmRef = useRef();
  const { currentUser, editEmail, editPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passRef.current.value !== passConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
      promises.push(editEmail(emailRef.current.value));
    }
    if (passRef.current.value) {
      promises.push(editPassword(passRef.current.value));
    }

    Promise.all(promises).then(navigate("/"));

    // try {
    //   setError("");
    //   setLoading(true);
    // } catch {
    //   setError("Failed to edit profile");
    // }
    // setLoading(false);
  }

  console.log(currentUser);

  return (
    <div className="flex items-center justify-center flex-wrap">
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="mx-auto  p-8 border border-solid border-black "
          style={{ minWidth: "400px" }}
        >
          <h2 className="text-3xl mb-2 text-center">Edit Profile</h2>
          {error && (
            <p className="bg-red-500 text-white border-solid border flex justify-center py-2  my-3 border-black">
              {error}
            </p>
          )}
          {}
          <label htmlFor="email">New Email</label>
          <input
            type="email"
            id="email"
            className="block w-full box-border p-1 mt-1 mb-4"
            ref={emailRef}
            defaultValue={currentUser.email}
          />
          <label htmlFor="pass">New Password</label>
          <input
            type="password"
            id="pass"
            className="block w-full box-border p-1 mt-1 mb-4"
            ref={passRef}
          />
          <label htmlFor="passConfirm">Confirm New Password</label>
          <input
            type="password"
            id="passConfirm"
            ref={passConfirmRef}
            className="block w-full box-border p-1 mt-1 mb-2"
          />

          <button
            disabled={loading}
            className="mt-5 border-none text-white w-full p-1 text-base rounded bg-purple-1000 hover:bg-purple-1050"
          >
            Confirm Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
