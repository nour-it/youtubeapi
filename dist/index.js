var a = Object.defineProperty;
var u = (i, t, e) => t in i ? a(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var s = (i, t, e) => (u(i, typeof t != "symbol" ? t + "" : t, e), e);
class n {
  /**
   * 
   * @param {object|string} query 
   */
  constructor(t) {
    this.setQuery(t);
  }
  /**
   * 
   * @param {object|string} query 
   * @param {string} value 
   * @returns {void}
   */
  setQuery(t, e) {
    t != null && (typeof t == "object" ? this.query = {
      ...this.query,
      ...t
    } : e != null && (this.query[t] = e));
  }
  /**
   * 
   * @returns {string}
   */
  getQuery() {
    let t = this.query || {}, e = "";
    for (let r in t)
      e += `${r}=${t[r]}&`;
    return e.slice(0, e.length - 1);
  }
}
class h extends n {
  /**
   * 
   * @param {object|string} query 
   */
  constructor(e) {
    var t = (...w) => (super(...w), /**
     * @type {string}
     */
    s(this, "path", "/channels"), /**
     * @type {object}
     */
    s(this, "query", {
      part: "snippet",
      id: ""
    }), /**
     * @type {string[]}
     */
    s(this, "queriesKey", ["part", "id"]), this);
    typeof e == "string" ? (t({ id: e }), this.setQuery({ ...this.query, id: e })) : (t(e), this.setQuery(e));
  }
  /**
   * @returns {boolean}
   */
  isValidQuery() {
    let e;
    for (let r in this.query)
      if (e = this.queriesKey.indexOf(r), e == -1)
        throw new RangeError("Invalid query for type search");
  }
}
class o extends n {
  /**
   * 
   * @param {object|string} query 
   */
  constructor(e) {
    var t = (...R) => (super(...R), /**
     * @type {string}
     */
    s(this, "path", "/search"), /**
     * @type {object}
     */
    s(this, "query", {
      part: "snippet",
      q: ""
    }), /**
     * @type {string[]}
     */
    s(this, "queriesKey", ["q", "maxResults", "part", "pageToken"]), this);
    typeof e == "string" ? (t({ q: e }), this.setQuery({ q: e })) : (t(e), this.setQuery(e));
  }
  /**
   * 
   * @param {string} token 
   * @returns void
   */
  setNextPage(e) {
    e != null && (this.query.pageToken = e);
  }
  /**
   * @retuns {boolean}
   */
  isValidQuery() {
    let e;
    for (let r in this.query)
      if (e = this.queriesKey.indexOf(r), e == -1)
        throw new RangeError("Invalid query for type search");
  }
}
class y extends n {
  /**
   * 
   * @param {object} query 
   */
  constructor(e) {
    super(e);
    /**
     * @type {string}
     */
    s(this, "path", "/videos");
    /**
     * @type {object}
     */
    s(this, "query", {
      part: "status,player,contentDetails,statistics,snippet",
      chart: "mostPopular",
      maxResults: "10"
    });
    /**
     * @type {string}
     */
    s(this, "queriesKey", ["part", "chart", "maxResults", "pageToken"]);
    this.setQuery(e);
  }
  /**
   * 
   * @param {string} token 
   * @returns void
   */
  setNextPage(e) {
    e != null && (this.query.pageToken = e);
  }
  /**
   * @returns {boolean}
   */
  isValidQuery() {
    let e;
    for (let r in this.query)
      if (e = this.queriesKey.indexOf(r), e == -1)
        throw new RangeError("Invalid query for type video");
  }
}
let p = class {
  /**
   * 
   * @param {'video' | 'search' | 'channel'} type 
   * @param {import("..").RequestQuery} query 
   */
  constructor(t, e) {
    /**
     * @type {VideoRequest|SearchRequest|ChannelRequest}
     */
    s(this, "type", null);
    /**
     * @type {object}
     */
    s(this, "types", {
      video: (t) => new y(t),
      search: (t) => new o(t),
      channel: (t) => new h(t)
    });
    /**
     * @type {string[]}
     */
    s(this, "requestTypes", ["video", "search", "channel"]);
    /**
     * @type {string}
     */
    s(this, "invalideTypeMessage", `Invalide type for request.
Request type should be ['video', 'search', 'channel']`);
    /**
     * 
     * @returns {string}
     */
    s(this, "getPath", () => this.type.path);
    /**
     * @throws {Error}
     * @returns {string}
     */
    s(this, "getQuery", () => (this.type.isValidQuery && this.type.isValidQuery(), this.type.getQuery()));
    if (this.isValidetype(t))
      this.type = this.types[t](e);
    else
      throw new Error(this.invalideTypeMessage);
  }
  /**
   * 
   * @param {string} token 
   * @returns void
   */
  setNextPage(t) {
    if (this.type.setNextPage)
      this.type.setNextPage(t);
    else
      throw new TypeError("methode setNextPage doesn't on " + typeof this.type);
  }
  /**
   * 
   * @param {string} type 
   * @returns {boolean}
   */
  isValidetype(t) {
    return this.requestTypes.indexOf(t) != -1;
  }
}, l = class {
  /**
   * 
   * @param {string} API_KEY 
   */
  constructor(t) {
    /**
     * @type {string} 
     */
    s(this, "API_URL", "https://www.googleapis.com/youtube/v3");
    this.API_KEY = t;
  }
  /**
   *
   * @param {Request} request
   * @returns {object}
   */
  async execute(t) {
    const e = this.API_URL + t.getPath() + "?" + t.getQuery() + "&key=" + this.API_KEY;
    try {
      return await (await fetch(new URL(e))).json();
    } catch (r) {
      return { error: r };
    }
  }
};
const q = l, g = p;
export {
  q as Client,
  g as Request
};
//# sourceMappingURL=index.js.map
