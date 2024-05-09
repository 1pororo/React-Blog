import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
import { firestore } from "./firebase";

const Update = () => {
  const { id } = useParams();
  const docRef = doc(firestore, "blogs", id);

  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [author, setAuthor] = useState();
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
    });

    setIsPending(false);
    navigate("/");
  };

  return (
    <div className="create">
      <h2>Update blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          placeholder={title}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          //   possible :::  change from onchange to ref and set the different variables in the handle submit function so that it only changes at submit
        />
        <label>Blog body:</label>
        <textarea
          placeholder={body}
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>
        <label>Blog author:</label>
        <input
          placeholder={author}
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
