const apiContainer = document.getElementById('api-container');

// Load APIs from local JSON file
fetch('apis.json')
  .then(response => response.json())
  .then(data => {
    // Group APIs by category
    const categories = {};
    data.entries.forEach(api => {
      if (!categories[api.Category]) {
        categories[api.Category] = [];
      }
      categories[api.Category].push(api);
    });

    // Build HTML for each category and its APIs
    for (const category in categories) {
      const section = document.createElement('section');
      const heading = document.createElement('h2');
      heading.textContent = category;
      section.appendChild(heading);

      categories[category].forEach(api => {
        const apiDiv = document.createElement('div');
        apiDiv.classList.add('api-item');
        apiDiv.innerHTML = `
          <h3>${api.API}</h3>
          <p>${api.Description}</p>
          <a href="${api.Link}" target="_blank" rel="noopener noreferrer">API Docs</a>
        `;
        section.appendChild(apiDiv);
      });

      apiContainer.appendChild(section);
    }
  })
  .catch(err => {
    apiContainer.textContent = 'Failed to load APIs';
    console.error(err);
  });
