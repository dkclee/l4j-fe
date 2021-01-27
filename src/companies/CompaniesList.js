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
    <CompanyCard 
      key={c.handle} 
      handle={c.handle}
      name={c.name} 
      description={c.description} 
      numEmployees={c.numEmployees} 
      logoUrl={c.logoUrl} />     
  ));

  return (
    <div className="CompaniesList">
      {companyCards}
    </div>
  );
}

export default CompaniesList;