import assert from'assert'
import {Client, Request} from "../index.js"


describe('should a valide channel', function () {
  
  beforeEach(async function () {
    (await import('dotenv')).config();
  })

  it('should have right structure for channel', async function () {
    const client = new Client(process.env.YOUTUBE_API_KEY)
    const request = new Request("channel", "UC-ITMRJ_c9gFYG1nwi-hc5A");
    this.timeout(10000);
    return client.execute(request).then(function (data) { 
       assert.ok(data.hasOwnProperty("kind"));
       assert.ok(data.hasOwnProperty("etag"));
       assert.ok(data.hasOwnProperty("items"));
       assert.ok(data.hasOwnProperty("snippet"));
    }).catch((err) => err)

  });
});