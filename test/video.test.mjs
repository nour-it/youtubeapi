import assert from 'assert'
import {Client, Request} from "../index.js"

// Function to check if two arrays are different
function arraysAreDifferent(arr1, arr2) {
  if (arr1.length !== arr2.length) {
      return true;
  }
  for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
          return true;
      }
  }
  return false;
}

describe('should be a valide video', function () {
  beforeEach(async function () {
    (await import('dotenv')).config();
  })
  this.timeout(10000);
  it('should not failed', async function () {
    const client = new Client(process.env.YOUTUBE_API_KEY)
    const request = new Request("video");
    return client.execute(request).then(function (data) { 
       assert.ok(data.hasOwnProperty("kind"));
       assert.ok(data.hasOwnProperty("etag"));
       assert.ok(data.hasOwnProperty("items"));
    }).catch((err) => err)
  });

  it('should paginate', async function () {
    const client = new Client(process.env.YOUTUBE_API_KEY)
    const request = new Request("video");
    const data =  await client.execute(request)
    const nextPageToken = data.nextPageToken;
    request.setNextPage(nextPageToken);
    const data2 = await client.execute(request);
    assert.ok(arraysAreDifferent(data.items, data2.items));
  });
});