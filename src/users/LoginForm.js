import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import userContext from "../userContext";

import Alert from "../shared/Alert";

/** Show LoginForm
 * 
 * Props:
 *  - login - parent function called when user logs in
 * 
 * Context:
 *  - currentUser - { username, firstName, lastName, isAdmin, jobs }
 *    where jobs is { id, title, companyHandle, companyName, state }
 */

function LoginForm({ login }) {
  const defaultFormData = { username: '', password: '' };
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState(null);
  const currentUser = useContext(userContext);

  // don't let user login if already logged in
  if (currentUser) return <Redirect to="/" />;

  /** handle form submission, call parent fn login and create alert if errors
   * are called */
  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    // maybe use the history object to push the user to homepage
    // if the user login was successful
    // TODO: we can use location object when we do history.push
    setErrors(result);
  }

  /** Update formData state with current state */
  function handleChange(evt) {
    let { name, value } = evt.target;
    setFormData(formData => ({ ...formData, [name]: value }));
  }

  // Have we filled in every prompt?
  let notDone = (
    Object.values(formData)
      .filter(v => v.trim() !== "").length < Object.keys(defaultFormData).length
  );

  let alert = (errors)
    ? <Alert msgs={errors} />
    : null;

  return (
    <div className="container col-md-6">
      <h3 className="my-5">Login Here!</h3>
      <form onSubmit={handleSubmit} className="m-4 text-left">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            name="username"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            name="password"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        {alert}
        <button disabled={notDone} className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;