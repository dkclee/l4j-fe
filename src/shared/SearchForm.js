import { useState } from "react";


/** SearchForm
 * 
 * Props:
 *  - onSearch() - parent function called
 * 
 * State:
 *  - searchTerm
 */

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  /** handle form submission, call parent fn onSearch */
  function handleSubmit(evt) {
    // TODO: update and use trim to make sure only submitted when searchTerm
    // isn't a string
    evt.preventDefault();
    let trimmed = searchTerm.trim();

    if(trimmed) onSearch(trimmed);
    setSearchTerm('');
  }

  /** Update searchTerm state with current state */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="m-4">
      <div className="form-group row">
        <div className="col-11">
          <input
            id="searchTerm"
            name="searchTerm"
            value={searchTerm}
            placeholder="Enter search term..."
            className="form-control form-control-lg"
            onChange={handleChange}
          />
        </div>
        <div className="col-1">
          <button className="btn btn-primary btn-lg">Submit!</button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;