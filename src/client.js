"use-strict";

import Request from "./request.js";

/**
 * @property {string} API_URL
 */
export default class Client {
  
  /**
   * @type {string} 
   */
  API_URL = `https://www.googleapis.com/youtube/v3`;

  /**
   * 
   * @param {string} API_KEY 
   */
  constructor(API_KEY) {
    this.API_KEY = API_KEY;
  }

  /**
   *
   * @param {Request} request
   * @returns {object}
   */
  async execute(request) {
    const url =
      this.API_URL +
      request.getPath() +
      "?" +
      request.getQuery() +
      "&key=" +
      this.API_KEY;
    try {
      return await (await fetch(new URL(url))).json()
    } catch (error) {
      return {error}
    }
  }
}
