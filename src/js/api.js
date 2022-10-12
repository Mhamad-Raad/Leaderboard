class API {
  constructor() {
    this.url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Slut826R3pO63VBrQrgC/scores/';
  }

  getData = async () => {
    const result = await fetch(this.url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
    .then((response) => response.json())
    .catch((error) => error);
    return result;
  }
  addData = async (name, score) => {  
    const result = await fetch(this.url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ user: name, score: score }),
    })
    .then((response) => response.json())
    .catch((error) => error);
    return result;
  }
}

module.exports = API;
