import { useEffect, useState, useContext } from "react";
import SearchForm from "../shared/SearchForm";
import JoblyApi from "../api";
import JobCardList from "../jobs/JobCardList";
import LoadingSpinner from "../LoadingSpinner";
import userContext from "../userContext";
/** JobList
 * 
 * Props:
 *  - applyForJob - fn to call when applying for job called in JobCard
 * 
 * State:
 * - jobs: Array of job objects
 *    [{ id, title, salary, equity }, ...]
 * - queryTerm: string to filter the job results
 * - isLoading: boolean
 *  
 * 
 */

function JobListForUser({applyForJob}) {

  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useContext(userContext);

  /** get all jobs when query term or is loading changes 
 * using JoblyApi class */
  useEffect(function getAllJobsOnSearchForUser() {
    async function getAllJobsForUser() {
      let jobs;
      try {
        jobs = await JoblyApi.getAllJobsForUser(currentUser.username);
        setJobs(jobs);
        setIsLoading(false);
      } catch (err) {
        // Maybe we want to let the user know what the error was
        // and redirect to some error page or ask the user to 
        // refresh the page?
        // Redirect and perhaps use the location object to hold
        // an error message
        return;
      }
    }
    if (isLoading) getAllJobsForUser();
  }, [title, isLoading, currentUser.username]);

  /** Function called by the SearchForm in order to change
   *  the title for the companies AJAX request
   */
  // Alternative option here: we could move getAllJobs outside of
  // useEffect and call it here. Then, we wouldn't need to have title as a
  // variable. 
  function onSearch(term) {
    setTitle(term);
    setIsLoading(true);
  }

  if (isLoading) return <LoadingSpinner msg="Loading the job applications for user" />

  return (
    <div className="JobForUser m-5">
      <SearchForm onSearch={onSearch} term={title} />
      <JobCardList jobs={jobs} applyForJob={applyForJob} />
    </div>
  );
}

export default JobListForUser;