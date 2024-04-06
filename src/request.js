'use-strict'

import ChannelRequest from "./request/channelRequest.js";
import SearchRequest from "./request/searchRequest.js";
import VideoRequest from "./request/videoRequest.js";

/**
 * @property {VideoRequest|SearchRequest|ChannelRequest} type
 * @property {object} types 
 * @property {string[]} requestTypes 
 * @property {string} invalideTypeMessage 
 * @method getPath
 */
export default class Request {

  /**
   * @type {VideoRequest|SearchRequest|ChannelRequest}
   */
  type = null

  /**
   * @type {object}
   */
  types = {
    "video": (query) => new VideoRequest(query),
    "search": (query) => new SearchRequest(query),
    "channel": (query) => new ChannelRequest(query),
  }

  /**
   * @type {string[]}
   */
  requestTypes = ['video', 'search', 'channel']

  /**
   * @type {string}
   */
  invalideTypeMessage = "Invalide type for request.\nRequest type should be ['video', 'search', 'channel']"

  /**
   * 
   * @param {'video' | 'search' | 'channel'} type 
   * @param {import("..").RequestQuery} query 
   */
  constructor(type, query) {
    if (this.isValidetype(type)) {
      this.type = this.types[type](query)
    } else {
      throw new Error(this.invalideTypeMessage);
    }
  }

  /**
   * 
   * @returns {string}
   */
  getPath = () => {
    return this.type.path;
  }

  /**
   * @throws {Error}
   * @returns {string}
   */
  getQuery = () => {
    if(this.type.isValidQuery) {
      this.type.isValidQuery();
    }
    return this.type.getQuery()
  }

  /**
   * 
   * @param {string} token 
   * @returns void
   */
  setNextPage(token) {
    if (this.type.setNextPage) {
      this.type.setNextPage(token)
    } else {
      throw new TypeError("methode setNextPage doesn't on " +  typeof this.type)
    }
  }

  /**
   * 
   * @param {string} type 
   * @returns {boolean}
   */
  isValidetype(type) {
    const index = this.requestTypes.indexOf(type)
    return index != -1;
  }
}