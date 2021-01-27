import { useState } from "react";
import { Redirect } from "react-router-dom";

/** Show LoginForm
 * 
 * Props:
 *  - user - { username, firstName, lastName, isAdmin, jobs }
 *    where jobs is { id, title, companyHandle, companyName, state }
 *  - login - parent function called when user logs in
 * 
 */

function LoginForm({ user, login }) {
  const defaultFormData = { username: '', password: '' };
  const [formData, setFormData] = useState(defaultFormData);

  // don't let user login if already logged in
  if (user) return <Redirect to="/" />;

  /** handle form submission, call parent fn login */
  function handleSubmit(evt) {
    evt.preventDefault();
    login(formData);
    setFormData(defaultFormData);
  }

  /** Update formData state with current state */
  function handleChange(evt) {
    let { name, value } = evt.target;
    setFormData(formData => ({ ...formData, [name]: value }));
  }

  // Have we filled in every prompt?
  let notDone = (
    Object.values(promptForm)
      .filter(v => v.trim() !== "").length < prompts.length
  );

  return (
    <form onSubmit={handleSubmit} className="m-4">
      <div className="form-group">
        <label for="username">Username</label>
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
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          name="password"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <button disabled={notDone} class="btn btn-primary">Submit</button>
    </form>
  );
}

export default LoginForm;