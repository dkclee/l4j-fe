import {useContext} from "react";
import {Link} from "react-router-dom";
import userContext from "./userContext";

/** Show homepage
 * 
 * Context:
 *  - currentUser: can see if currentUser is logged in
 */

function Homepage() {
  const currentUser = useContext(userContext);

  if(!currentUser) return (
    <div className="Homepage m-5">
      <h1>L4J</h1>
      <p>Find all the jobs you want here!</p>
      <Link className="btn btn-primary m-3" to="/login">Log In</Link>
      <Link className="btn btn-primary m-3" to="/signup">Sign Up</Link>
    </div>
  )

  return (
    <div className="Homepage m-5">
      <h1>Welcome to L4J, {currentUser.firstName}!</h1>
      <p>Find all the jobs you want here!</p>
    </div>
  );
}

export default Homepage;