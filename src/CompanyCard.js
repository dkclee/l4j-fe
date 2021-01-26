import {Link} from "react-router-dom";

/** Show CompanyCard
 * 
 * Prop:
 * - company: company to display
 *    { handle, name, description, numEmployees, logoUrl }
 */

function CompanyCard({ company }) {
  // console.log('companyCard company prop is:', company);
  return (
    <div className="CompanyCard">
      <Link to={`/companies/${company.handle}`}>
        <div className="card text-left m-4">
          <div className="card-body">
            <h4>{company.name}</h4>
            <p>{company.description}</p>
            <img src={company.logoUrl} alt={`${company.name}'s logo`} />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CompanyCard;