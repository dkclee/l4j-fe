import { useState, useContext } from "react";
import { Redirect, useLocation, useHistory } from "react-router-dom";

import userContext from "../userContext";

import Alert from "../shared/Alert";

/** Show LoginForm
 * 
 * Props:
 *  - login - parent function called when user logs in
 * 
 *  State:
 *  - formData
 *  - errors - array of error messages
 * 
 * Context:
 *  - currentUser - { username, firstName, lastName, isAdmin, applications }
 *    where applications is [jobId, ...]
 */

function LoginForm({ login }) {
  const defaultFormData = { username: '', password: '' };

  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState(null);

  const currentUser = useContext(userContext);
  const location = useLocation();
  const history = useHistory();


  // don't let user login if already logged in
  if (currentUser) return <Redirect to="/" />;

  /** handle form submission, call parent fn login and create alert if errors
   * are called */
  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);

    if (result.success) {
      history.push('/companies');
    } else {
      setErrors(result.err);
    }
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

  let alertErrors = (errors)
    ? <Alert msgs={errors} />
    : null;

  let alertMsg = (location?.state?.msg)
    ? <Alert msgs={[location.state.msg]} type="warning" />
    : null;

  return (
    <div className="container col-md-6">
      {alertMsg}
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
        {alertErrors}
        <button disabled={notDone} className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;