import assert from 'assert'
import {Request} from "../index.js"

describe('should be a valide requet', function () {
  beforeEach(async function () {
    (await import('dotenv')).config();
  })
  
  it('should be a valid query type', async function () {
    new Request("video");
    assert.ok(true)
    assert.throws(() => new Request("video2"), Error)
  });
  
  it('should be a valid query', async function () {
    const request = new Request("video");
    assert.equal(request.getQuery(), "part=status,player,contentDetails,statistics,snippet&chart=mostPopular&maxResults=10")
  });
  
  it('should be a valid search query', async function () {
    const request = new Request("search", "code");
    assert.equal(request.getQuery(), "part=snippet&q=code")
  });
  
  it('should be a paginate query', async function () {
    const request = new Request("video");
    assert.equal(request.getQuery(), "part=status,player,contentDetails,statistics,snippet&chart=mostPopular&maxResults=10")
    request.setNextPage("CAoQAA");
    assert.equal(request.getQuery(), "part=status,player,contentDetails,statistics,snippet&chart=mostPopular&maxResults=10&pageToken=CAoQAA")
  });

});