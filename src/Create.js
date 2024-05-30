import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "./firebase";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const colRef = collection(firestore, "blogs");
    const blog = {
      title: title,
      body: body,
      author: author,
      createdAt: serverTimestamp(),
      updatedAt: null,
    };

    setIsPending(true);

    addDoc(colRef, blog);

    setIsPending(false);
    navigate("/");
  };

  return (
    <div className="create">
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>
        <label>Blog author:</label>
        <input
          value={author}
          required
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />

        {isPending ? <button>Adding...</button> : <button>Add Blog</button>}
      </form>
    </div>
  );
};

export default Create;
