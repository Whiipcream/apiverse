import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDQtrl8316XSV4iWROLMOE3rCMNlN8co8o",
  authDomain: "apiverse-67eb1.firebaseapp.com",
  projectId: "apiverse-67eb1",
  storageBucket: "apiverse-67eb1.appspot.com",
  messagingSenderId: "703964190155",
  appId: "1:703964190155:web:8acf1d4668aa80b0c4124e"
};

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load and display APIs
const container = document.getElementById("api-container");
const apisRef = collection(db, "apis");

async function loadAPIs() {
  const snapshot = await getDocs(apisRef);
  const categories = {};

  snapshot.forEach(doc => {
    const api = doc.data();
    if (!categories[api.category]) categories[api.category] = [];
    categories[api.category].push(api);
  });

  container.innerHTML = ""; // Clear before rendering

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
    container.appendChild(section);
  }
}

loadAPIs();

// Handle API submission
document.getElementById("submit-api").addEventListener("click", async () => {
  const name = document.getElementById("api-name").value.trim();
  const description = document.getElementById("api-description").value.trim();
  const url = document.getElementById("api-url").value.trim();
  const auth = document.getElementById("api-auth").value.trim();
  const category = document.getElementById("api-category").value.trim();

  if (!name || !description || !url || !auth || !category) {
    document.getElementById("submission-status").textContent = "Please fill all fields.";
    return;
  }

  try {
    await addDoc(apisRef, { name, description, url, auth, category });
    document.getElementById("submission-status").textContent = "✅ API submitted successfully!";
    document.querySelectorAll('#add-api-form input').forEach(input => input.value = '');
    loadAPIs(); // Refresh list
  } catch (error) {
    console.error("Error adding document: ", error);
    document.getElementById("submission-status").textContent = "❌ Error submitting API.";
  }
});
