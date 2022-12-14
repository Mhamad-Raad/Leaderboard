import '../style.css';
import Person from './person.js';
import API from './api.js';

const lodash = require('lodash');

const leader = document.querySelector('.leaders');
const refreshBtn = document.querySelector('.refresh-button');
const submitBtn = document.querySelector('.submit');
const api = new API();

const render = async () => {
  let i = 0;
  let st = '';
  leader.innerHTML = '';
  const response = await api.getData();
  const persons = new Person(response);
  persons.players = lodash.sortBy(persons.players, ['score']).reverse();
  persons.players.forEach((person) => {
    person.user = person.user.charAt(0).toUpperCase() + person.user.slice(1);
    const position = i === 0 ? 'first' : i === 1 ? 'second' : i === 2 ? 'third' : '';
    if (i % 2 === 1) {
      st = 'one';
    } else {
      st = 'two';
    }
    leader.innerHTML += `
    <div class="leader-row mrg-btn ${st} ${position}">
    <p class="leader-name bolder">${person.user}</p>
    <p class="leader-score bolder">${person.score}</p>
    </div>`;
    i += 1;
  });
};

submitBtn.addEventListener('click', async () => {
  const name = document.querySelector('.name-input').value;
  const score = document.querySelector('.score-input').value;
  await api.addData(name, score);

  document.querySelector('.score-input').value = '';
  document.querySelector('.name-input').value = '';
});

refreshBtn.addEventListener('click', () => {
  render();
});

window.onload = render();