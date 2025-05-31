fetch("apis.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("api-container");
    const categories = data.categories;

    for (const [category, apis] of Object.entries(categories)) {
      const section = document.createElement("div");
      section.className = "category";

      const title = document.createElement("h2");
      title.textContent = category;

      const list = document.createElement("div");
      list.className = "api-list";

      title.addEventListener("click", () => {
        list.style.display = list.style.display === "block" ? "none" : "block";
      });

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
      "<p>Failed to load APIs. Check your apis.json file.</p>";
    console.error(err);
  });
