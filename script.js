const searchBar = document.getElementById('searchBar');
const apiList = document.getElementById('apiList');
let apis = [];

fetch('free-apis.json')
  .then(res => res.json())
  .then(data => {
    apis = data;
    displayAPIs(data);
  });

searchBar.addEventListener('input', (e) => {
  const search = e.target.value.toLowerCase();
  const filtered = apis.filter(api => api.name.toLowerCase().includes(search));
  displayAPIs(filtered);
});

function displayAPIs(apiArray) {
  apiList.innerHTML = '';
  apiArray.forEach(api => {
    const card = document.createElement('div');
    card.className = 'api-card';
    card.innerHTML = `
      <h3>${api.name}</h3>
      <p>${api.description}</p>
      <a href="${api.url}" target="_blank">Visit API</a>
    `;
    apiList.appendChild(card);
  });
}
