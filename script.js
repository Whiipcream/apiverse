const apiUrl = 'https://api.publicapis.io/entries';

async function fetchAndDisplayAPIs() {
  const container = document.getElementById('api-container');
  container.innerHTML = '<p>Loading APIs...</p>';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to fetch APIs');

    const data = await response.json();
    const apis = data.entries;

    // Group APIs by category
    const grouped = apis.reduce((acc, api) => {
      const category = api.Category || 'Others';
      if (!acc[category]) acc[category] = [];
      acc[category].push(api);
      return acc;
    }, {});

    // Clear container
    container.innerHTML = '';

    // Build UI grouped by category
    for (const [category, apiList] of Object.entries(grouped)) {
      const catSection = document.createElement('section');
      catSection.classList.add('category-section');

      const catHeader = document.createElement('h2');
      catHeader.textContent = category;
      catSection.appendChild(catHeader);

      const list = document.createElement('ul');
      list.classList.add('api-list');

      apiList.forEach(api => {
        const item = document.createElement('li');
        item.classList.add('api-item');

        // API name with link
        const link = document.createElement('a');
        link.href = api.Link;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = api.API;

        // Description text
        const desc = document.createElement('p');
        desc.textContent = api.Description;

        // Show Auth, HTTPS, Cors info inline
        const info = document.createElement('small');
        info.textContent = `Auth: ${api.Auth || 'None'} | HTTPS: ${api.HTTPS} | Cors: ${api.Cors}`;

        item.appendChild(link);
        item.appendChild(desc);
        item.appendChild(info);

        list.appendChild(item);
      });

      catSection.appendChild(list);
      container.appendChild(catSection);
    }

  } catch (error) {
    container.innerHTML = `<p style="color:red;">Failed to load APIs: ${error.message}</p>`;
  }
}

// Run on page load
window.addEventListener('DOMContentLoaded', fetchAndDisplayAPIs);
