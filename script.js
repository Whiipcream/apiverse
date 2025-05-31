const apiContainer = document.getElementById('api-container');

fetch('https://raw.githubusercontent.com/Kiara22/public-apis-json/main/public_apis.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.json();
  })
  .then(data => {
    displayApis(data);
  })
  .catch(error => {
    console.error('Failed to load APIs:', error);
    apiContainer.innerHTML = `<p style="color:red;">Failed to load APIs: ${error.message}</p>`;
  });

function displayApis(data) {
  apiContainer.innerHTML = '';

  for (const category in data) {
    const catSection = document.createElement('section');
    catSection.className = 'category';

    const catTitle = document.createElement('h2');
    catTitle.textContent = category;
    catSection.appendChild(catTitle);

    const ul = document.createElement('ul');

    data[category].forEach(api => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${api.API}</strong> — ${api.Description}<br />
        <a href="${api.Link}" target="_blank" rel="noopener noreferrer">Documentation</a>
      `;
      ul.appendChild(li);
    });

    catSection.appendChild(ul);
    apiContainer.appendChild(catSection);
  }
}
