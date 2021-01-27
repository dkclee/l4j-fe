import { Link } from "react-router-dom";
import "./CompanyCard.css";

/** Show CompanyCard
 * 
 * Prop:
 * - company: company to display
 *    { handle, name, description, numEmployees, logoUrl }
 */

//  TODO: destructure company
function CompanyCard({ company }) {
  // console.log('companyCard company prop is:', company);
  return (
    <div className="CompanyCard">
      <Link to={`/companies/${company.handle}`}>
        <div className="card text-left m-4">
          <div className="card-body">
            <h4>{company.name}
              {company.logoUrl && 
              <img src={company.logoUrl} alt={`${company.name}'s logo`} className="ml-5 float-right" />}
            </h4>
            <p>{company.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CompanyCard;