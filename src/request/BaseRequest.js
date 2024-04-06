'use-strict'

/**
 * @method setQuery
 * @method getQuery
 */
export default class BaseRequest {

  /**
   * 
   * @param {object|string} query 
   */
  constructor(query) {
    this.setQuery(query)
  }

  /**
   * 
   * @param {object|string} query 
   * @param {string} value 
   * @returns {void}
   */
  setQuery(query, value) {
    if (query != undefined) {
      if (typeof query == "object") {
        this.query = {
          ...this.query,
          ...query
        }
      } else {
        if (value != undefined) this.query[query] = value;
      }
    }
  }

  /**
   * 
   * @returns {string}
   */
  getQuery() {
    let query = this.query || {}, queryString = '';
    for (let q in query) queryString += `${q}=${query[q]}&`
    return queryString.slice(0, queryString.length - 1);
  }

}