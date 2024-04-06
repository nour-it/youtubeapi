import BaseRequest from "./BaseRequest.js";


/**
 * @property {string} path
 * @property {object} query
 * @property {string[]} queriesKey
 * @method isValidQuery
 */
export default class ChannelRequest extends BaseRequest {

  /**
   * @type {string}
   */
  path = "/channels"

  /**
   * @type {object}
   */
  query = {
    part: 'snippet',
    id: ''
  }

  /**
   * @type {string[]}
   */
  queriesKey = ['part', 'id']

  /**
   * 
   * @param {object|string} query 
   */
  constructor(query) {
    if (typeof query ==  'string') {
      super({ id: query })
      this.setQuery({ ...this.query, id: query })
    } else {
      super(query)
      this.setQuery(query)
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
        throw new RangeError("Invalid query for type search")
      }
    }
  }
  
}