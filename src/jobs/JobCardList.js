import JobCard from "./JobCard";

/** Show JobCardList
 * 
 * Prop:
 * - jobs: jobs to display
 *    [{ id, title, salary, equity }, ...]
 *        OR
 *    [ { id, title, salary, equity, companyHandle, companyName }, ...]
 */

function JobCardList({ jobs }) {
  let jobCards = jobs.map(j => (
    <JobCard 
      key={j.id} 
      id={j.id} 
      title={j.title}
      salary={j.salary}
      equity={j.equity}
      companyHandle={j.companyHandle}
      companyName={j.companyName} />
  ));

  return (
    <div className="JobCardList">
      {jobCards}
    </div>
  );
}

export default JobCardList;