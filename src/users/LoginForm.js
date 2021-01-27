import { useState } from "react";
import { Redirect } from "react-router-dom";

import Alert from "../shared/Alert";

/** Show LoginForm
 * 
 * Props:
 *  - currentUser - { username, firstName, lastName, isAdmin, jobs }
 *    where jobs is { id, title, companyHandle, companyName, state }
 *  - login - parent function called when user logs in
 * 
 */

function LoginForm({ currentUser, login }) {
  const defaultFormData = { username: '', password: '' };
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState(null);
  console.log('LoginForm');

  // don't let user login if already logged in
  if (currentUser) return <Redirect to="/" />;

  /** handle form submission, call parent fn login and create alert if errors
   * are called */
  async function handleSubmit(evt) {
    evt.preventDefault();
    setErrors(await login(formData));
  }

  /** Update formData state with current state */
  function handleChange(evt) {
    let { name, value } = evt.target;
    setFormData(formData => ({ ...formData, [name]: value }));
  }

  // Have we filled in every prompt?
  let notDone = (
    Object.values(formData)
      .filter(v => v.trim() !== "").length < defaultFormData.length
  );

  let alert = (errors)
    ? <Alert msgs={errors} />
    : null;

  return (
    <form onSubmit={handleSubmit} className="m-4">
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
  );
}

export default LoginForm;