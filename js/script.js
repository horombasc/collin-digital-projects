const projectGrid = document.getElementById("project-grid");
const videoGrid = document.getElementById("video-grid");
const filters = document.getElementById("filters");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

const categories = ["All", ...new Set(projects.map(project => project.category))];

function renderFilters() {
  filters.innerHTML = categories.map((category, index) => `
    <button class="filter-btn ${index === 0 ? "active" : ""}" data-category="${category}">
      ${category}
    </button>
  `).join("");

  filters.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
      filters.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      renderProjects(button.dataset.category);
    });
  });
}

function renderProjects(category = "All") {
  const visibleProjects = category === "All"
    ? projects
    : projects.filter(project => project.category === category);

  projectGrid.innerHTML = visibleProjects.map(project => `
    <article class="card">
      <div class="card-media">
        ${project.image
          ? `<img src="${project.image}" alt="${project.title}" loading="lazy">`
          : `<span>Add project image</span>`
        }
      </div>
      <div class="card-body">
        <div class="card-tag">${project.category}</div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="card-actions">
          ${project.liveUrl
            ? `<a class="small-btn" href="${project.liveUrl}" target="_blank" rel="noopener">View Website ↗</a>`
            : ""
          }
          ${project.videoUrl
            ? `<a class="small-btn" href="#videos">Watch Demo</a>`
            : ""
          }
        </div>
      </div>
    </article>
  `).join("");
}

function renderVideos() {
  videoGrid.innerHTML = projectVideos.map(video => `
    <article class="card video-card">
      ${video.videoUrl
        ? `<video controls preload="metadata">
             <source src="${video.videoUrl}" type="video/mp4">
             Your browser does not support the video element.
           </video>`
        : `<div class="video-placeholder">Add your demonstration video in the <strong>projectVideos</strong> section of js/projects.js.</div>`
      }
      <div class="card-body">
        <div class="card-tag">Project Demo</div>
        <h3>${video.title}</h3>
        <p>${video.description}</p>
      </div>
    </article>
  `).join("");
}

renderFilters();
renderProjects();
renderVideos();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});
