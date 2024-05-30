import { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { updateDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
import { firestore } from "./firebase";

const Update = () => {
  const { id } = useParams();
  const docRef = doc(firestore, "blogs", id);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDoc(docRef).then((doc) => {
      setTitle(doc.data().title);
      setAuthor(doc.data().author);
      setBody(doc.data().body);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    updateDoc(docRef, {
      title: title,
      body: body,
      author: author,
      updatedAt: serverTimestamp(),
    }).then(() => {
      setIsPending(false);
      navigate("/");
    });

    return <Navigate to="/" replace={true} />;
  };

  return (
    <div className="create">
      <h2>Update blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            console.log(e);
          }}
        />

        <label>Blog body:</label>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>

        <label>Blog author:</label>
        <input
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />

        {isPending ? <button>Updating...</button> : <button>Update</button>}
      </form>
    </div>
  );
};

export default Update;
