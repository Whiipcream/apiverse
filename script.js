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
      <button class="run-btn">▶️ Run API</button>
      <pre class="output">Click "Run API" to see results.</pre>
    `;

    const runBtn = card.querySelector('.run-btn');
    const output = card.querySelector('.output');

    runBtn.addEventListener('click', () => {
      output.textContent = 'Loading...';
      fetch(api.url)
        .then(res => res.json())
        .then(data => {
          output.textContent = JSON.stringify(data, null, 2);
        })
        .catch(err => {
          output.textContent = 'Error: ' + err.message;
        });
    });

    apiList.appendChild(card);
  });
}
