import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. 
   * Returns 
   *  { handle, name, description, numEmployees, logoUrl, jobs }
   *    where jobs is [{ id, title, salary, equity }, ...]
  */

  static async getCompany(handle) {
    var res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on a company given a name filter. 
   * Returns: 
   * [{ handle, name, description, numEmployees, logoUrl }, ...]
  */

  static async getAllCompanies(name="") {
    let data = (name)
      ? { name }
      : {};

    let res = await this.request("companies", data);
    return res.companies;
  }

  /** Get details on all jobs given a title filter.
  * Returns: 
  * [ { id, title, salary, equity, companyHandle, companyName }, ...]
  */

  static async getAllJobs(title="") {
    let data = (title)
      ? { title }
      : {};

    let res = await this.request("jobs", data);
    return res.jobs;
  }

}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;