const apiContainer = document.getElementById("api-container");
const toggleFormBtn = document.getElementById("toggle-form-btn");
const submissionSection = document.getElementById("submission-section");

// Toggle the submit form visibility when button clicked
toggleFormBtn.addEventListener("click", () => {
  if (submissionSection.style.display === "none") {
    submissionSection.style.display = "block";
    toggleFormBtn.textContent = "❌ Close Submit Form";
  } else {
    submissionSection.style.display = "none";
    toggleFormBtn.textContent = "➕ Submit an API";
  }
});

// Load and display APIs grouped by category with collapsible sections
fetch("apis.json")
  .then(response => response.json())
  .then(data => {
    const categories = data.categories;

    for (const [category, apis] of Object.entries(categories)) {
      const section = document.createElement("div");
      section.className = "category";

      const title = document.createElement("h2");
      title.textContent = category;

      const list = document.createElement("div");
      list.className = "api-list";

      // Add APIs to the list
      apis.forEach(api => {
        const item = document.createElement("div");
        item.className = "api";
        item.innerHTML = `
          <a href="${api.url}" target="_blank" rel="noopener">${api.name}</a><br/>
          <small>${api.description}</small><br/>
          <small><strong>Auth:</strong> ${api.auth}</small>
        `;
        list.appendChild(item);
      });

      // Initially show the list, but make it collapsible on title click
      title.addEventListener("click", () => {
        list.classList.toggle("hidden");
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

// Handle form submission — creates a GitHub issue for review (no direct JSON update)
document.getElementById("api-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const url = document.getElementById("url").value.trim();
  const description = document.getElementById("description").value.trim();
  const auth = document.getElementById("auth").value.trim();
  const category = document.getElementById("category").value.trim();

  const issueTitle = `New API Submission: ${name}`;
  const issueBody = `
**Name:** ${name}
**URL:** ${url}
**Description:** ${description}
**Auth:** ${auth}
**Category:** ${category}

Please review and add this API to the apis.json file.
`;

  const githubToken = ""; // Optional: insert GitHub personal access token if private repo

  try {
    const response = await fetch("https://api.github.com/repos/your-username/your-repo/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(githubToken && { Authorization: `token ${githubToken}` })
      },
      body: JSON.stringify({ title: issueTitle, body: issueBody }),
    });

    const messageEl = document.getElementById("form-message");

    if (response.ok) {
      messageEl.style.color = "green";
      messageEl.textContent = "✅ Submitted! Your API will be reviewed soon.";
      e.target.reset();
    } else {
      const errData = await response.json();
      messageEl.style.color = "red";
      messageEl.textContent = "❌ Submission failed. Check console.";
      console.error("GitHub API error:", errData);
    }
  } catch (error) {
    const messageEl = document.getElementById("form-message");
    messageEl.style.color = "red";
    messageEl.textContent = "❌ Submission failed. Check console.";
    console.error(error);
  }
});
