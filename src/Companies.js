import { useEffect, useState } from "react";
import CompaniesList from "./CompaniesList";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";

/** Show companies
 * 
 * State:
 * - companies: Array of company objects
 *    [ { handle, name, description, numEmployees, logoUrl }, ...]
 * - queryTerm: string to filter the companies results
 */

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [queryTerm, setQueryTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /** get all companies when query term or is loading changes 
   * using JoblyApi class */
  useEffect(function getAllCompaniesOnMount() {
    async function getAllCompanies() {
      let companies = await JoblyApi.getAllCompanies(queryTerm);
      setCompanies(companies);
      setIsLoading(false);
    }
    if(isLoading) getAllCompanies();
  }, [queryTerm, isLoading]);

  /** Function called by the SearchForm in order to change
   *  the queryTerm for the companies AJAX request
   */
  function onSearch(term) {
    setQueryTerm(term);
    setIsLoading(true);
  }

  if(isLoading) return <div>Currently Loading!</div>

  return (
    <div className="Companies m-5">
      <SearchForm onSearch={onSearch} />
      <CompaniesList companies={companies} />
    </div>
  );
}

export default Companies;