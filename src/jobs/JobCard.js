/** Show JobCard
 * 
 * Prop:
 * - id, title, salary, equity, companyHandle, companyName
 */

//  TODO: destructure - default value for companyHandle/ name
function JobCard({ id, title, salary, equity, companyHandle, companyName }) {
  // console.log('JobCard company prop is:', company);
  return (
    <div className="JobCard">
      <div className="card text-left m-4">
        <div className="card-body">
          <h4>{title}</h4>
          <h3>{companyName}</h3>
          <p>Salary: {salary}</p>
          <p>Equity: {equity}</p>
          <button className="btn btn-danger">APPLY</button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;