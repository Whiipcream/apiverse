fetch("apis.json")
  .then(response => {
    if (!response.ok) throw new Error("Failed to load apis.json");
    return response.json();
  })
  .then(data => {
    const container = document.getElementById("api-container");

    if (!data.categories) {
      container.innerHTML = "<p>No categories found in apis.json.</p>";
      return;
    }

    Object.entries(data.categories).forEach(([categoryName, apiList]) => {
      // Create category section
      const section = document.createElement("div");
      section.className = "category collapsed";

      // Create category title
      const title = document.createElement("h2");
      title.textContent = categoryName;
      title.addEventListener("click", () => {
        section.classList.toggle("collapsed");
      });

      // API list container
      const list = document.createElement("div");
      list.className = "api-list";

      if (Array.isArray(apiList)) {
        apiList.forEach(api => {
          if (api.name && api.url && api.description && typeof api.auth !== "undefined") {
            const item = document.createElement("div");
            item.className = "api";
            item.innerHTML = `
              <a href="${api.url}" target="_blank">${api.name}</a><br/>
              <small>${api.description}</small><br/>
              <small><strong>Auth:</strong> ${api.auth}</small>
            `;
            list.appendChild(item);
          }
        });
      }

      section.appendChild(title);
      section.appendChild(list);
      container.appendChild(section);
    });
  })
  .catch(err => {
    document.getElementById("api-container").innerHTML =
      "<p>🚫 Failed to load APIs. Check your <code>apis.json</code> or console.</p>";
    console.error("Load error:", err);
  });
