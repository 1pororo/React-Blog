import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>The Falming Blog</h1>
      <div className="links">
        <Link to="/" className="hover:text-purple-1000">
          Home
        </Link>
        <Link to="/login" className="hover:text-purple-1000">
          Log out
        </Link>
        <Link
          to="/create"
          className=" bg-purple-1000 hover:bg-purple-1050  rounded-lg 
          text-white"
        >
          New Post
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
