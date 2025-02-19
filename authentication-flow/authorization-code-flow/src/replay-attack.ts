const url = 'http://host.docker.internal:3000/callback?session_state=&code='

const request1 = fetch(url)
const request2 = fetch(url)

Promise.all([request1, request2])
  .then(async (responses) => {
    return Promise.all(responses.map((response) => response.json()))
  })
  .then((jsons) => console.log(jsons))
