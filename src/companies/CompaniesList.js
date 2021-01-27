import CompanyCard from "./CompanyCard";

/** Show CompaniesList
 * 
 * Prop:
 * - companies: companies to display
 *    [ { handle, name, description, numEmployees, logoUrl }, ...]
 */

function CompaniesList({ companies }) {
  // Same change with company prop
  let companyCards = companies.map(c => (
    <CompanyCard key={c.handle} company={c} />
  ));

  return (
    <div className="CompaniesList">
      {companyCards}
    </div>
  );
}

export default CompaniesList;