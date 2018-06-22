// API/AikidoApi.js

const API = 'https://bridge.buddyweb.fr/api/aikido/stage'

export function getStageFromApiSearchedText(text=false) {
  if(text){
    const url = API + '?lieux=' + text
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
  }else {
    const url = API
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
  }
}

export function getStageFromApiwithId(id){
  const url = API + '/' + id
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.log(error))
}
