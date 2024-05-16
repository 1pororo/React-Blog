import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Sorry</h2>
      <p>That page is cannot be found</p>
      <Link to="/home">Go to Home</Link>
    </div>
  );
};

export default NotFound;
