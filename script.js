const apiContainer = document.getElementById("api-container");

fetch("apis.json")
  .then(response => response.json())
  .then(data => {
    const categories = data.categories;

    for (const [category, apis] of Object.entries(categories)) {
      const section = document.createElement("div");
      section.className = "category";

      const title = document.createElement("h2");
      title.textContent = category;
      title.addEventListener("click", () => {
        list.style.display = list.style.display === "block" ? "none" : "block";
      });

      const list = document.createElement("div");
      list.className = "api-list";

      apis.forEach(api => {
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
      apiContainer.appendChild(section);
    }
  })
  .catch(err => {
    apiContainer.innerHTML = "<p>Failed to load APIs. Check your apis.json file.</p>";
    console.error(err);
  });

document.getElementById("api-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const url = document.getElementById("url").value;
  const description = document.getElementById("description").value;
  const auth = document.getElementById("auth").value;
  const category = document.getElementById("category").value;

  const issueTitle = `New API Submission: ${name}`;
  const issueBody = `
**Name:** ${name}
**URL:** ${url}
**Description:** ${description}
**Auth:** ${auth}
**Category:** ${category}

Please review and consider adding this to the apis.json file.
`;

  const githubToken = ""; // ← Fill in if testing privately

  const result = await fetch("https://api.github.com/repos/your-username/your-repo/issues", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(githubToken && { Authorization: `token ${githubToken}` })
    },
    body: JSON.stringify({
      title: issueTitle,
      body: issueBody
    })
  });

  const message = document.getElementById("form-message");
  if (result.ok) {
    message.textContent = "✅ Submitted! It will be reviewed and added shortly.";
  } else {
    message.textContent = "❌ Failed to submit. Check console for details.";
    console.error(await result.json());
  }

  document.getElementById("api-form").reset();
});
