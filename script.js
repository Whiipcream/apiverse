const apiContainer = document.getElementById('api-container');

// Load APIs from local JSON file
fetch('apis.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const categories = data.categories; // your JSON's root key

    for (const category in categories) {
      const section = document.createElement('section');
      const heading = document.createElement('h2');
      heading.textContent = category;
      section.appendChild(heading);

      categories[category].forEach(api => {
        const apiDiv = document.createElement('div');
        apiDiv.classList.add('api-item');
        apiDiv.innerHTML = `
          <h3>${api.name}</h3>
          <p>${api.description}</p>
          <p><strong>Auth:</strong> ${api.auth}</p>
          <a href="${api.url}" target="_blank" rel="noopener noreferrer">API Docs</a>
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
