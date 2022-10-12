import '../style.css';
import Person from './person.js';
import API from './api.js';

const lodash = require('lodash');

const leader = document.querySelector('.leaders');
const refreshBtn = document.querySelector('.refresh-button');
const submitBtn = document.querySelector('.submit');
const api = new API();

const render = async () => {
  leader.innerHTML = '';
  const response = await api.getData();
  const persons = new Person(response);
  persons.players = lodash.sortBy(persons.players, ['score']).reverse();
  persons.players.forEach((person) => {
    leader.innerHTML += `
    <div class="leader-row">
    <p class="leader-name">${person.user}: </p>
    <p class="leader-score">${person.score}</p>
    </div>`;
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