import { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Alert from "../shared/Alert";
import userContext from "../userContext";

/** SignupForm
 * 
 * Props:
 *  - signup - parent function called when user signs up
 * 
 * Context:
 *  - currentUser - { username, firstName, lastName, isAdmin, jobs }
 *    where jobs is { id, title, companyHandle, companyName, state }
 */

function SignupForm({ signup }) {
  const defaultFormData = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState(null);

  const currentUser = useContext(userContext);
  const history = useHistory();

  // don't let user sign up if already logged in
  if (currentUser) return <Redirect to="/" />;

  /** handle form submission, call parent fn signup */
  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);

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

  let alert = (errors)
    ? <Alert msgs={errors} />
    : null;

  return (
    <div className="container col-md-6">
      <h3 className="my-5">Signup Here!</h3>
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
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            name="firstName"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            name="lastName"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            name="email"
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

export default SignupForm;