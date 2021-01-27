import { useEffect, useState } from "react";
import CompaniesList from "./CompaniesList";
import SearchForm from "../shared/SearchForm";
import JoblyApi from "../api";

/** Show companies
 * 
 * State:
 * - companies: Array of company objects
 *    [ { handle, name, description, numEmployees, logoUrl }, ...]
 * - queryTerm: string to filter the companies results
 * - isLoading: boolean
 */

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [queryTerm, setQueryTerm] = useState(null); //potentially don't need
  const [isLoading, setIsLoading] = useState(true);

  /** get all companies when query term or is loading changes 
   * using JoblyApi class */
  useEffect(function getAllCompaniesOnSearch() {
    async function getAllCompanies() {
      // TODO: add a try catch to this. Pass a name rather than query term
      let companies = await JoblyApi.getAllCompanies(queryTerm);
      setCompanies(companies);
      setIsLoading(false);
    }
    if (isLoading) getAllCompanies();
  }, [queryTerm, isLoading]);

  /** Function called by the SearchForm in order to change
   *  the queryTerm for the companies AJAX request
   */

  // TODO: alternative option here: we could move getAllJobs outside of
  // useEffect and call it here. Then, we wouldn't need to have queryTerm as a
  // variable. 
  function onSearch(term) {
    setQueryTerm(term);
    setIsLoading(true);
  }

  if (isLoading) return <div>Currently Loading!</div>

  return (
    <div className="Companies m-5">
      <SearchForm onSearch={onSearch} />
      <CompaniesList companies={companies} />
    </div>
  );
}

export default Companies;