const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

//fetch random user and add money
async function getRandomUser() {
  let response = await fetch('https://randomuser.me/api');
  const data = await response.json();
  const user = data.results[0];
  console.log(data);

  const nweUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000) + 1,
    thumbnail: `${user.picture.thumbnail}`,
  };
  addData(nweUser);
}

function addData(obj) {
  data.push(obj);
  updateDOM();
  //每次新增新的就updatDOM一次
}
function updateDOM(updateData = data) {
  main.innerHTML = '<h2><strong>Person </strong>Wealth</h2>';
  updateData.forEach((data) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong><img src="${data.thumbnail}" alt="${
      data.name
    }"class="thumbnail" >${data.name}</strong>${formatMoney(data.money)}`;
    main.append(element);
  });
}
function doubleMoney() {
  data = data.map((item) => {
    return { ...item, money: item.money * 2 };
  });
  updateDOM();
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}
function showMillionaires() {
  data = data.filter((user) => {
    return user.money > 1000000;
  });
  updateDOM();
}
function calculateWealth() {
  const wealth = data.reduce((acc, user) => {
    return (acc += user.money);
  }, 0);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}
// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
