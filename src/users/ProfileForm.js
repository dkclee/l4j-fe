import { useState, useContext } from "react";
import Alert from "../shared/Alert";
import userContext from "../userContext";

/** ProfileForm
 * 
 * Props:
 *  - updateProfile - parent function called when user updates profile
 * 
 * State:
 *  - formData
 *  - msgInfo - object to display alert message
 * 
 * Context:
 *  - currentUser - { username, firstName, lastName, isAdmin, applications }
 *    where applications is [jobId, ...]
 */

function ProfileForm({ updateProfile }) {
  const currentUser = useContext(userContext);
  const initialFormData = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [msgInfo, setMsgInfo] = useState(null);


  /** handle form submission, call parent fn updateProfile */
  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await updateProfile(formData);
    setMsgInfo(result);
    setFormData(formData => ({...formData, password:''}));
  }

  /** Update formData state with current state */
  function handleChange(evt) {
    let { name, value } = evt.target;
    setFormData(formData => ({ ...formData, [name]: value }));
  }

  // Have we filled in every prompt?
  let notDone = (
    Object.values(formData)
      .filter(v => v.trim() !== "").length < Object.keys(initialFormData).length
  );

  let msgs = (msgInfo)
    ? <Alert msgs={msgInfo.msgs} type={msgInfo.type} />
    : null;

  return (
    <div className="container col-md-6">
      <h3 className="my-5">Profile</h3>
      <form onSubmit={handleSubmit} className="m-4 text-left">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <p>{currentUser.username}</p>
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
        {msgs}
        <button disabled={notDone} className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default ProfileForm;