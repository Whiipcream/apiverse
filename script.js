const apiContainer = document.getElementById("api-container");
const toggleFormBtn = document.getElementById("toggle-form-btn");
const submissionSection = document.getElementById("submission-section");

// Initially hide the form
submissionSection.style.display = "none";

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

      // Collapsible category on title click
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

// GitHub info - put your token and repo here
const githubToken = "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";
const githubRepo = "Whiipcream/apiverse";

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

  const messageEl = document.getElementById("form-message");

  try {
    const response = await fetch(`https://api.github.com/repos/${githubRepo}/issues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${githubToken}`
      },
      body: JSON.stringify({ title: issueTitle, body: issueBody }),
    });

    if (response.ok) {
      messageEl.style.color = "green";
      messageEl.textContent = "✅ Submitted! Your API will be reviewed soon.";
      e.target.reset();
      // Optionally hide the form after submit
      // submissionSection.style.display = "none";
      // toggleFormBtn.textContent = "➕ Submit an API";
    } else {
      const errData = await response.json();
      messageEl.style.color = "red";
      messageEl.textContent = "❌ Submission failed. Check console.";
      console.error("GitHub API error:", errData);
    }
  } catch (error) {
    messageEl.style.color = "red";
    messageEl.textContent = "❌ Submission failed. Check console.";
    console.error(error);
  }
});
