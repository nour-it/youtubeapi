'use-strict'

import BaseRequest from "./BaseRequest.js"

/**
 * @property {string} path
 * @property {object} query
 * @property {string[]} queriesKey
 * @method setNextPage
 * @method isValidQuery
 */
export default class VideoRequest extends BaseRequest {

  /**
   * @type {string}
   */
  path = "/videos"
  
  /**
   * @type {object}
   */
  query = {
    part: 'status,player,contentDetails,statistics,snippet',
    chart: 'mostPopular',
    maxResults: '10'
  }

  /**
   * @type {string}
   */
  queriesKey = ['part', 'chart', 'maxResults', 'pageToken'];

  /**
   * 
   * @param {object} query 
   */
  constructor(query) {
    super(query)
    this.setQuery(query)
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
   * @returns {boolean}
   */
  isValidQuery() {
    let index;
    for(let q in this.query) {
      index = this.queriesKey.indexOf(q)
      if (index == -1) {
        throw new RangeError("Invalid query for type video")
      }
    }
  }

}