import {useContext} from "react";
import JobCard from "./JobCard";
import userContext from "../userContext";

/** Show JobCardList
 * 
 * Prop:
 * - jobs: jobs to display
 *    [{ id, title, salary, equity }, ...]
 *        OR
 *    [ { id, title, salary, equity, companyHandle, companyName }, ...]
 *  - applyForJob - fn to call when applying for job called in JobCard
 */

function JobCardList({ jobs, applyForJob }) {
  console.log('JobCardList applyForJob', applyForJob);
  const currentUser = useContext(userContext);
  console.log(currentUser);

  let appliedJobsId = new Set(currentUser.applications);

  let jobCards = jobs.map(j => (
    <JobCard 
      key={j.id} 
      id={j.id} 
      title={j.title}
      salary={j.salary}
      equity={j.equity}
      companyHandle={j.companyHandle}
      companyName={j.companyName}
      hasApplied={appliedJobsId.has(j.id)} 
      applyForJob={applyForJob}/>
  ));

  return (
    <div className="JobCardList">
      {jobCards}
    </div>
  );
}

export default JobCardList;