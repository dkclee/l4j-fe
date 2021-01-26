import { useParams } from "react-router-dom";
import JoblyApi from "./api";

/** Show CompanyDetail
 * 
 * Show a company's details and jobs given url param
 * 
 * Params:
 *  - handle: company handle
 * 
 */

function CompanyDetail() {
  const {handle} = useParams();

  const company = JoblyApi.getCompany(handle);


  return (
    <div className="CompanyDetail">
      <h1>Welcome to CompanyDetail!</h1>
    </div>
  );
}

export default CompanyDetail;