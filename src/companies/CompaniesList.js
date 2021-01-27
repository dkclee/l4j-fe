import CompanyCard from "./CompanyCard";

/** Show CompaniesList
 * 
 * Prop:
 * - companies: companies to display
 *    [ { handle, name, description, numEmployees, logoUrl }, ...]
 */

function CompaniesList({ companies }) {
  // Pass in handle, name, etc. rather than just company
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