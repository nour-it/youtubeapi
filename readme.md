<h3 align="center">
    YOUTUBE NOURIT CLIENT
   <br>
</h3>

<div align="center"> 
   <p align="center">
    ceci est une api pour pouvoir récupérer les information sur les videos disponible sur youtube ainsi que les chaînes
   </p>
   <br><br>
</div>

### YOUTUBE API DATA CLIENT

## VIDEO
vous pouvez récupérer les dernières videos favories
```js
import { Client, Request } from "youtubenouritclient";
const client = new Client("API_KEY")
const request = new Request("video")
const onSuccess = (data) => {
  ...
}
const onError = (err) => {
  ...
}
client.execute(request).then(onSuccess).catch(onError)
```

## SEARCH
vous pouvez faire une recherche sur une video comme ce ci
```js
import { Client, Request } from "youtubenouritclient";
const client = new Client("API_KEY")
const request = new Request("search", "my_search")
const onSuccess = (data) => {
  ...
}
const onError = (err) => {
  ...
}
client.execute(request).then(onSuccess).catch(onError)
```
ou comme cela.
```js
import { Client, Request } from "youtubenouritclient";
const client = new Client("API_KEY")
const request = new Request("search", {q: "my_search"})
const onSuccess = (data) => {
  ...
}
const onError = (err) => {
  ...
}
client.execute(request).then(onSuccess).catch(onError)
```