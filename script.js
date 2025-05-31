fetch('https://raw.githubusercontent.com/public-apis/public-apis/master/entries.json')
  .then(response => response.json())
  .then(data => {
    const categorizedAPIs = {};

    data.entries.forEach(api => {
      const category = api.Category || 'Uncategorized';
      if (!categorizedAPIs[category]) categorizedAPIs[category] = [];
      categorizedAPIs[category].push({
        name: api.API,
        description: api.Description,
        url: api.Link,
        auth: api.Auth || "No"
      });
    });

    renderAPIs(categorizedAPIs);
  })
  .catch(err => {
    console.error('Error loading APIs:', err);
    document.getElementById('api-list').innerText = 'Failed to load APIs.';
  });

function renderAPIs(categories) {
  const container = document.getElementById('api-list');
  container.innerHTML = '';

  Object.keys(categories).sort().forEach(category => {
    const catWrapper = document.createElement('div');
    catWrapper.classList.add('category');

    const catTitle = document.createElement('h2');
    catTitle.textContent = category;
    catWrapper.appendChild(catTitle);

    categories[category].forEach(api => {
      const apiCard = document.createElement('div');
      apiCard.className = 'api-card';

      apiCard.innerHTML = `
        <h3>${api.name}</h3>
        <p>${api.description}</p>
        <a href="${api.url}" target="_blank">Visit API</a>
        <p><strong>Auth:</strong> ${api.auth}</p>
      `;

      catWrapper.appendChild(apiCard);
    });

    container.appendChild(catWrapper);
  });
}
