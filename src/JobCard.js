/** Show JobCard
 * 
 * Prop:
 * - job: company to display
 *    { id, title, salary, equity }
 */

function JobCard({ job }) {
  // console.log('JobCard company prop is:', company);
  return (
    <div className="JobCard">
      <div className="card text-left m-4">
        <div className="card-body">
          <h4>{job.title}</h4>
          <p>Salary: {job.salary}</p>
          <p>Equity: {job.equity}</p>
          <button className="btn btn-danger">APPLY</button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;