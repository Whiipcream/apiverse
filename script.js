// Load local apis.json file and display APIs grouped by category

// Utility: Group APIs by Category
function groupByCategory(entries) {
  return entries.reduce((acc, api) => {
    const cat = api.Category || 'Uncategorized';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(api);
    return acc;
  }, {});
}

// Display APIs in the container element
function displayAPIs(entries) {
  const container = document.getElementById('api-container');
  container.innerHTML = ''; // clear previous

  const grouped = groupByCategory(entries);

  for (const [category, apis] of Object.entries(grouped)) {
    // Create category header
    const catHeader = document.createElement('h2');
    catHeader.textContent = category;
    container.appendChild(catHeader);

    // Create list for this category
    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.paddingLeft = '0';

    apis.forEach(api => {
      const item = document.createElement('li');
      item.style.marginBottom = '10px';

      // API name as clickable link
      const link = document.createElement('a');
      link.href = api.Link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = api.API;
      link.style.fontWeight = 'bold';
      link.style.color = '#0d6efd'; // bootstrap blue link color
      link.style.textDecoration = 'none';
      link.onmouseenter = () => link.style.textDecoration = 'underline';
      link.onmouseleave = () => link.style.textDecoration = 'none';

      // Description text
      const desc = document.createElement('p');
      desc.textContent = api.Description;
      desc.style.margin = '4px 0';

      // Auth info badge
      const auth = document.createElement('span');
      auth.textContent = api.Auth ? `Auth: ${api.Auth}` : 'No Auth';
      auth.style.fontSize = '0.8em';
      auth.style.color = '#555';

      // HTTPS badge
      const https = document.createElement('span');
      https.textContent = api.HTTPS ? 'HTTPS' : 'No HTTPS';
      https.style.fontSize = '0.8em';
      https.style.color = api.HTTPS ? 'green' : 'red';
      https.style.marginLeft = '10px';

      item.appendChild(link);
      item.appendChild(desc);
      item.appendChild(auth);
      item.appendChild(https);

      list.appendChild(item);
    });

    container.appendChild(list);
  }
}

// Fetch local apis.json and start app
fetch('apis.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load APIs');
    return response.json();
  })
  .then(data => {
    displayAPIs(data.entries);
  })
  .catch(err => {
    document.getElementById('api-container').textContent = err.message;
  });
