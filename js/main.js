const API_URL = "https://gabistam.github.io/Demo_API/data/projects.json";

async function fetchProjects() {
  const loader = document.getElementById("loader");
  const errorMessage = document.getElementById("error-message");

  loader.style.display = "block";
  errorMessage.textContent = "";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des projets.");
    }

    const data = await response.json();
    loader.style.display = "none";
    displayProjects(data.projects);
    setupFilters(data.technologies, data.projects);
  } catch (error) {
    loader.style.display = "none";
    errorMessage.textContent = error.message;
  }
}

function displayProjects(projects) {
  const grid = document.getElementById("projects-grid");
  const noProjects = document.getElementById("no-projects");

  grid.innerHTML = "";

  if (projects.length === 0) {
    noProjects.style.display = "block";
    return;
  } else {
    noProjects.style.display = "none";
  }

  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" />
      <h3>${project.title}</h3>
      <p><strong>Client :</strong> ${project.client}</p>
      <div class="badges">
        ${project.technologies.map(tech => `<span class="badge">${tech}</span>`).join("")}
      </div>
      <button onclick="openModal(${project.id})">Voir détails</button>
    `;
    grid.appendChild(card);
  });
}

function setupFilters(technologies, allProjects) {
  const filters = document.getElementById("filters");
  filters.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.textContent = "Tous";
  allBtn.onclick = () => displayProjects(allProjects);
  filters.appendChild(allBtn);

  technologies.forEach(tech => {
    const btn = document.createElement("button");
    btn.textContent = tech;
    btn.onclick = () => {
      const filtered = allProjects.filter(p => p.technologies.includes(tech));
      displayProjects(filtered);
    };
    filters.appendChild(btn);
  });
}


function openModal(id) {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const project = data.projects.find(p => p.id === id);
      const modalBody = document.getElementById("modal-body");
      modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" />
        <p><strong>Client :</strong> ${project.client}</p>
        <p><strong>Année :</strong> ${project.year}</p>
        <p><strong>Durée :</strong> ${project.duration}</p>
        <p>${project.description}</p>
        <ul>
          ${project.features.map(f => `<li>${f}</li>`).join("")}
        </ul>
        <a href="${project.url}" target="_blank">Voir le site</a>
      `;
      document.getElementById("modal").style.display = "block";
    });
}

document.getElementById("close-modal").onclick = () => {
  document.getElementById("modal").style.display = "none";
};

document.addEventListener("DOMContentLoaded", fetchProjects);

document.getElementById("menu-toggle").addEventListener("click", () => {
  const nav = document.getElementById("nav-menu");
  nav.classList.toggle("show");
});