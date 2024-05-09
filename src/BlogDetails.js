import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDoc, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "./firebase";

const BlogDetails = () => {
  const { id } = useParams();
  const docRef = doc(firestore, "blogs", id);
  const [blog, setBlog] = useState(null);
  let updateTime, createTime;

  useEffect(() => {
    const snapshot = getDoc(docRef);
    if (!snapshot) {
      console.log("blog does not exist");
      return;
    }
    snapshot.then((blog) => setBlog(blog.data()));
  });

  const navigate = useNavigate();

  const handleDelete = () => {
    deleteDoc(docRef).then(() => {
      navigate("/");
    });
  };

  // the useEffect hook runs after the initial render when blog is still null. So check if blog is null becuase setting the value of blog doesn't happen synchronously with the component rendering. This means that suring the initial render, blog is still null and we won't be able to access blog.updatedAt
  if (blog && blog.updatedAt !== null) {
    const timestamp = new Date(
      blog.updatedAt.seconds * 1000 + blog.updatedAt.nanoseconds / 1000000
    );
    updateTime = timestamp.toLocaleString();
  }
  if (blog && blog.createdAt) {
    const createTimestamp = new Date(
      blog.createdAt.seconds * 1000 + blog.createdAt.nanoseconds / 1000000
    );
    createTime = createTimestamp.toLocaleDateString();
  }

  return (
    <div className="blog-details">
      {blog && (
        <article>
          <h1>{blog.title}</h1>
          <p>Written by: {blog.author}</p>
          {createTime && <p>Created on: {createTime}</p>}
          {updateTime && <p>Last updated on: {updateTime}</p>}
          <div>{blog.body}</div>
          <button onClick={handleDelete}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
