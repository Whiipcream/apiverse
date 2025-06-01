// Load both JSON files and merge categories
Promise.all([
  fetch("apis.json").then((res) => res.json()),
  fetch("extra-apis.json").then((res) => res.json()) // your second file
])
  .then(([data1, data2]) => {
    const merged = { categories: {} };

    // Merge categories from both files
    [data1, data2].forEach((data) => {
      for (const [category, apis] of Object.entries(data.categories)) {
        if (!merged.categories[category]) {
          merged.categories[category] = [];
        }
        merged.categories[category].push(...apis);
      }
    });

    const container = document.getElementById("api-container");
    const categories = merged.categories;

    for (const [category, apis] of Object.entries(categories)) {
      const section = document.createElement("div");
      section.className = "category collapsed"; // collapsed by default

      const title = document.createElement("h2");
      title.textContent = category;
      title.addEventListener("click", () => {
        section.classList.toggle("collapsed");
      });

      const list = document.createElement("div");
      list.className = "api-list";

      apis.forEach((api) => {
        const item = document.createElement("div");
        item.className = "api";
        item.innerHTML = `
          <a href="${api.url}" target="_blank">${api.name}</a><br/>
          <small>${api.description}</small><br/>
          <small><strong>Auth:</strong> ${api.auth}</small>
        `;
        list.appendChild(item);
      });

      section.appendChild(title);
      section.appendChild(list);
      container.appendChild(section);
    }
  })
  .catch((err) => {
    document.getElementById("api-container").innerHTML =
      "<p>Failed to load APIs. Check your JSON files.</p>";
    console.error(err);
  });
