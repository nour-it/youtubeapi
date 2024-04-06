'use-strict'

import BaseRequest from "./BaseRequest.js"

/**
 * @property {string} path
 * @property {object} query
 * @property {string[]} queriesKey
 * @method setNextPage
 * @method isValidQuery
 */
export default class SearchRequest extends BaseRequest {

  /**
   * @type {string}
   */
  path = "/search"

  /**
   * @type {object}
   */
  query = {
    part: 'snippet',
    q: '',
  }

  /**
   * @type {string[]}
   */
  queriesKey = ['q', 'maxResults', 'part', 'pageToken']

  /**
   * 
   * @param {object|string} query 
   */
  constructor(query) {
    if (typeof query == 'string') {
      super({ q: query })
      this.setQuery({ q: query })
    } else {
      super(query)
      this.setQuery(query)
    }
  }

  /**
   * 
   * @param {string} token 
   * @returns void
   */
  setNextPage(token) {
    if (token != undefined) {
      this.query["pageToken"] = token
    }
  }

  /**
   * @retuns {boolean}
   */
  isValidQuery() {
    let index;
    for (let q in this.query) {
      index = this.queriesKey.indexOf(q)
      if (index == -1) {
        throw new RangeError("Invalid query for type search")
      }
    }
  }
}