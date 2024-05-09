import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>The Falming Blog</h1>
      <div className="links">
        <Link to="/home">Home</Link>
        <Link to="/">Log in</Link>
        <Link
          to="/create"
          style={{
            color: "white",
            backgroundColor: "#8E8CD8",
            borderRadius: "8px",
          }}
        >
          New Post
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
