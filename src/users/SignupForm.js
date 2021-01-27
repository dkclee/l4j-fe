import { useState } from "react";
import { Redirect } from "react-router-dom";

/** SignupForm
 * 
 * Props:
 *  - currentUser - { username, firstName, lastName, isAdmin, jobs }
 *    where jobs is { id, title, companyHandle, companyName, state }
 *  - signup - parent function called when user signs up
 * 
 */

function SignupForm({ currentUser, signup }) {
  const defaultFormData = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  };
  const [formData, setFormData] = useState(defaultFormData);

  // don't let user sign up if already logged in
  if (currentUser) return <Redirect to="/" />;

  /** handle form submission, call parent fn signup */
  function handleSubmit(evt) {
    evt.preventDefault();
    signup(formData);
    setFormData(defaultFormData);
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
      <button disabled={notDone} className="btn btn-primary">Submit</button>
    </form>
  );
}

export default SignupForm;