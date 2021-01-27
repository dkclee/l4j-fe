import { useEffect, useState } from "react";
import SearchForm from "../shared/SearchForm";
import JoblyApi from "../api";
import JobCardList from "../jobs/JobCardList";


/** JobList
 * 
 * State:
 * - jobs: Array of job objects
 *    [{ id, title, salary, equity }, ...]
 * - queryTerm: string to filter the job results
 * - isLoading: boolean
 *  
 * 
 */

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [queryTerm, setQueryTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  /** get all jobs when query term or is loading changes 
 * using JoblyApi class */
  useEffect(function getAllJobsOnSearch() {
    // TODO: update similar to companies
    async function getAllJobs() {
      let jobs = await JoblyApi.getAllJobs(queryTerm);
      setJobs(jobs);
      setIsLoading(false);
    }
    if (isLoading) getAllJobs();
  }, [queryTerm, isLoading]);

  /** Function called by the SearchForm in order to change
   *  the queryTerm for the companies AJAX request
   */
  function onSearch(term) {
    setQueryTerm(term);
    setIsLoading(true);
  }

  if (isLoading) return <div>Currently Loading!</div>

  return (
    <div className="JobList">
      <SearchForm onSearch={onSearch} />
      <JobCardList jobs={jobs} />
    </div>
  );
}

export default JobList;