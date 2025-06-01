fetch("apis.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load apis.json");
    }
    return response.json();
  })
  .then((data) => {
    const container = document.getElementById("api-container");

    if (!data.categories || typeof data.categories !== "object") {
      container.innerHTML = "<p>No API categories found.</p>";
      return;
    }

    const categories = data.categories;

    // Loop through categories
    for (const [category, apis] of Object.entries(categories)) {
      // Create collapsible section
      const section = document.createElement("div");
      section.className = "category collapsed";

      // Category title
      const title = document.createElement("h2");
      title.textContent = category;
      title.addEventListener("click", () => {
        section.classList.toggle("collapsed");
      });

      // List of APIs
      const list = document.createElement("div");
      list.className = "api-list";

      if (Array.isArray(apis) && apis.length > 0) {
        apis.forEach((api) => {
          if (api.name && api.url && api.description && api.auth !== undefined) {
            const item = document.createElement("div");
            item.className = "api";
            item.innerHTML = `
              <a href="${api.url}" target="_blank" rel="noopener noreferrer">${api.name}</a><br/>
              <small>${api.description}</small><br/>
              <small><strong>Auth:</strong> ${api.auth}</small>
            `;
            list.appendChild(item);
          }
        });
      } else {
        list.innerHTML = "<p><em>No APIs listed in this category.</em></p>";
      }

      // Combine section
      section.appendChild(title);
      section.appendChild(list);
      container.appendChild(section);
    }
  })
  .catch((err) => {
    console.error("API fetch error:", err);
    document.getElementById("api-container").innerHTML =
      "<p>Failed to load APIs. Check your apis.json file and console for errors.</p>";
  });
