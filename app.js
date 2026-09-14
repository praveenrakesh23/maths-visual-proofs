// Metadata for all 18 Interactive Mathematics Projects
const projectsData = [
  {
    id: "67",
    num: "01",
    title: "Fundamental Theorem of Calculus",
    folder: "67-fundamental-theorem-of-calculus",
    category: "Calculus",
    categoryClass: "calculus",
    difficulty: "Intermediate",
    description:
      "Explore why the derivative of an accumulated area function A(x) = ∫_a^x f(t)dt equals the original function f(x)."
  },
  {
    id: "72",
    num: "02",
    title: "Optimization: Maximum and Minimum from Derivative",
    folder: "72-optimization-derivative-max-min",
    category: "Calculus",
    categoryClass: "calculus",
    difficulty: "Intermediate",
    description:
      "Explore tangent slopes, critical points where f'(x)=0, derivative sign changes, and local extrema classification."
  },
  {
    id: "135",
    num: "03",
    title: "Sphere: Surface Area & Volume",
    folder: "135-sphere-surface-area-volume",
    category: "Geometry & Solids",
    categoryClass: "geometry",
    difficulty: "Beginner",
    description:
      "Interactive 3D WebGL visualization for understanding sphere surface area (4πr²) and volume (4/3πr³) derivation."
  },
  {
    id: "136",
    num: "04",
    title: "Composite Solids and Units",
    folder: "136-composite-solids-and-units",
    category: "Geometry & Solids",
    categoryClass: "geometry",
    difficulty: "Intermediate",
    description:
      "Interactively decompose complex 3D shapes into standard solid primitives and calculate unit volumes."
  },
  {
    id: "137",
    num: "05",
    title: "Circle: Locus of Equal Distance",
    folder: "137-circle-locus-equal-distance",
    category: "Conic Sections",
    categoryClass: "conics",
    difficulty: "Beginner",
    description:
      "Understand circles geometrically as the locus of points equidistant from a fixed central point."
  },
  {
    id: "138",
    num: "06",
    title: "Parabola: Focus & Directrix",
    folder: "138-parabola-focus-directrix",
    category: "Conic Sections",
    categoryClass: "conics",
    difficulty: "Intermediate",
    description:
      "Visualize the locus definition of a parabola where distance to focus equals perpendicular distance to directrix."
  },
  {
    id: "139",
    num: "07",
    title: "Ellipse: Sum of Distances",
    folder: "139-ellipse-sum-of-distances",
    category: "Conic Sections",
    categoryClass: "conics",
    difficulty: "Intermediate",
    description:
      "Discover how the sum of distances from any point on an ellipse to two foci remains constant (d₁ + d₂ = 2a)."
  },
  {
    id: "140",
    num: "08",
    title: "Hyperbola: Difference of Distances",
    folder: "140-hyperbola-difference-of-distances",
    category: "Conic Sections",
    categoryClass: "conics",
    difficulty: "Intermediate",
    description:
      "Explore hyperbola branches defined by constant absolute difference of distances to two foci (|d₁ - d₂| = 2a)."
  },
  {
    id: "141",
    num: "09",
    title: "Eccentricity Classification",
    folder: "141-eccentricity-classification",
    category: "Conic Sections",
    categoryClass: "conics",
    difficulty: "Intermediate",
    description:
      "Understand how eccentricity e classifies all conics: Circle (e=0), Ellipse (0<e<1), Parabola (e=1), Hyperbola (e>1)."
  },
  {
    id: "142",
    num: "10",
    title: "Cone Slice: Conics",
    folder: "142-cone-slice-conics",
    category: "Conic Sections",
    categoryClass: "conics",
    difficulty: "Advanced",
    description:
      "Visualize 3D double cone planar intersections yielding circles, ellipses, parabolas, and hyperbolas."
  },
  {
    id: "143",
    num: "11",
    title: "Parabola: Reflective Property",
    folder: "143-parabola-reflective-property",
    category: "Conic Sections",
    categoryClass: "conics",
    difficulty: "Intermediate",
    description:
      "Interactively prove how incoming parallel rays reflect through the focal point of a parabolic mirror."
  },
  {
    id: "144",
    num: "12",
    title: "Directrix-Focus Standard Equation",
    folder: "144-directrix-focus-standard-equation",
    category: "Conic Sections",
    categoryClass: "conics",
    difficulty: "Advanced",
    description:
      "Derive and explore standard algebraic equations for conics directly from focus-directrix locus definitions."
  },
  {
    id: "145",
    num: "13",
    title: "Inequality on a Number Line",
    folder: "145-inequality-number-line",
    category: "Inequalities",
    categoryClass: "inequalities",
    difficulty: "Beginner",
    description:
      "Represent single and open/closed interval inequalities visually on an interactive real number line."
  },
  {
    id: "146",
    num: "14",
    title: "Solving Linear Inequalities",
    folder: "146-solving-linear-inequalities",
    category: "Inequalities",
    categoryClass: "inequalities",
    difficulty: "Beginner",
    description:
      "Step-by-step interactive solver for linear inequalities with real-time graph transformation visualizer."
  },
  {
    id: "147",
    num: "15",
    title: "Compound Inequalities & Intervals",
    folder: "147-compound-inequalities-intervals",
    category: "Inequalities",
    categoryClass: "inequalities",
    difficulty: "Intermediate",
    description:
      "Explore AND / OR compound inequalities, interval notation, and union/intersection solution regions."
  },
  {
    id: "148",
    num: "16",
    title: "Quadratic Inequalities by Graph Regions",
    folder: "148-quadratic-inequalities-graphs-region",
    category: "Inequalities",
    categoryClass: "inequalities",
    difficulty: "Intermediate",
    description:
      "Solve quadratic inequalities by examining positive and negative parabolic graph regions above and below x-axis."
  },
  {
    id: "149",
    num: "17",
    title: "AM-GM Inequality",
    folder: "149-am-gm-inequality",
    category: "Inequalities",
    categoryClass: "inequalities",
    difficulty: "Advanced",
    description:
      "Visual geometric and algebraic proofs demonstrating Arithmetic Mean ≥ Geometric Mean with equality when a = b."
  },
  {
    id: "150",
    num: "18",
    title: "Triangle Inequality",
    folder: "150-triangle-inequality",
    category: "Inequalities",
    categoryClass: "inequalities",
    difficulty: "Beginner",
    description:
      "Explore side length constraints proving the sum of any two sides of a triangle exceeds the third side length."
  }
];


// ============================================================
// APPLICATION STATE
// ============================================================

let activeCategory = "All";
let searchQuery = "";


// ============================================================
// HTML ESCAPE
// Prevent metadata from accidentally being interpreted as HTML
// ============================================================

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// ============================================================
// GET FILTERED PROJECTS
// ============================================================

function getFilteredProjects() {
  const query = searchQuery.trim().toLowerCase();

  return projectsData.filter((project) => {
    const matchesCategory =
      activeCategory === "All" ||
      project.category === activeCategory;

    const matchesSearch =
      !query ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query) ||
      project.folder.toLowerCase().includes(query) ||
      project.id.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
}


// ============================================================
// PROJECT URL
// ============================================================

function getProjectURL(project) {
  if (window.location.protocol === "file:") {
    return `${project.folder}/index.html`;
  }

  return `${project.folder}/`;
}


// ============================================================
// RENDER PROJECTS
// ============================================================

function renderProjects() {
  const container = document.getElementById("catalog-content");
  const countElement = document.getElementById("project-count");

  if (!container) {
    console.error("catalog-content element was not found.");
    return;
  }

  const filtered = getFilteredProjects();

  // ----------------------------------------------------------
  // Update count
  // ----------------------------------------------------------

  if (countElement) {
    countElement.textContent =
      `${filtered.length} Interactive Visualization${
        filtered.length === 1 ? "" : "s"
      }`;
  }


  // ----------------------------------------------------------
  // Empty state
  // ----------------------------------------------------------

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No Visualizations Found</h3>
        <p>
          Try searching for another term or selecting a different
          category.
        </p>
        <button
          type="button"
          class="clear-search-btn"
          id="clear-search"
        >
          Clear Search
        </button>
      </div>
    `;

    const clearButton = document.getElementById("clear-search");

    if (clearButton) {
      clearButton.addEventListener("click", () => {
        searchQuery = "";

        const searchInput =
          document.getElementById("search-input");

        if (searchInput) {
          searchInput.value = "";
          searchInput.focus();
        }

        renderProjects();
      });
    }

    return;
  }


  // ----------------------------------------------------------
  // Category order
  // ----------------------------------------------------------

  const categoryOrder = [
    "Calculus",
    "Geometry & Solids",
    "Conic Sections",
    "Inequalities"
  ];

  const categories =
    activeCategory === "All"
      ? categoryOrder
      : [activeCategory];


  // ----------------------------------------------------------
  // Generate cards
  // ----------------------------------------------------------

  let html = "";

  categories.forEach((category) => {
    const categoryProjects = filtered.filter(
      (project) => project.category === category
    );

    if (categoryProjects.length === 0) {
      return;
    }

    html += `
      <section
        class="category-section"
        data-category="${escapeHTML(category)}"
      >
        <h2 class="category-title">
          ${escapeHTML(category)}
        </h2>

        <div class="cards-grid">
    `;

    categoryProjects.forEach((project) => {
      const projectURL = getProjectURL(project);

      html += `
        <a
          href="${escapeHTML(projectURL)}"
          class="project-card"
          data-project-id="${escapeHTML(project.id)}"
          data-category="${escapeHTML(project.category)}"
          aria-label="Open ${escapeHTML(project.title)}"
        >

          <div class="project-card-content">

            <div class="card-top">

              <span class="card-num">
                ${escapeHTML(project.num)}
              </span>

              <div class="card-badges">

                <span
                  class="badge badge-${escapeHTML(
                    project.categoryClass
                  )}"
                >
                  ${escapeHTML(project.category)}
                </span>

                <span class="badge badge-diff-inter">
                  ${escapeHTML(project.difficulty)}
                </span>

              </div>

            </div>

            <h3 class="card-title">
              ${escapeHTML(project.title)}
            </h3>

            <p class="card-desc">
              ${escapeHTML(project.description)}
            </p>

          </div>

          <div class="card-action">

            <span>Open Project</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
              />

              <polyline
                points="12 5 19 12 12 19"
              />
            </svg>

          </div>

        </a>
      `;
    });

    html += `
        </div>
      </section>
    `;
  });

  container.innerHTML = html;
}


// ============================================================
// SET ACTIVE CATEGORY
// ============================================================

function setActiveCategory(category) {
  activeCategory = category;

  // Update button states
  document.querySelectorAll(".tab-btn").forEach((button) => {
    const isActive =
      button.dataset.category === activeCategory;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  renderProjects();
}


// ============================================================
// INITIALIZE CATEGORY BUTTONS
// ============================================================

function initializeCategoryButtons() {
  const buttons = document.querySelectorAll(".tab-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category || "All";

      setActiveCategory(category);
    });
  });
}


// ============================================================
// INITIALIZE SEARCH
// ============================================================

function initializeSearch() {
  const searchInput =
    document.getElementById("search-input");

  if (!searchInput) {
    return;
  }

  searchInput.addEventListener("input", (event) => {
    searchQuery = event.target.value;

    renderProjects();
  });

  // Escape clears search
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      searchInput.value = "";
      searchQuery = "";

      renderProjects();
    }
  });
}


// ============================================================
// KEYBOARD ACCESSIBILITY
// ============================================================

function initializeKeyboardNavigation() {
  document.addEventListener("keydown", (event) => {
    // "/" focuses search unless the user is already typing
    if (
      event.key === "/" &&
      document.activeElement?.tagName !== "INPUT" &&
      document.activeElement?.tagName !== "TEXTAREA"
    ) {
      event.preventDefault();

      const searchInput =
        document.getElementById("search-input");

      if (searchInput) {
        searchInput.focus();
      }
    }
  });
}


// ============================================================
// HANDLE CATEGORY FROM URL HASH
// ============================================================

function initializeHashNavigation() {
  function applyHash() {
    const hash = window.location.hash.replace("#", "").toLowerCase();

    if (!hash) {
      return;
    }

    const hashMap = {
      calculus: "Calculus",
      geometry: "Geometry & Solids",
      "geometry-solids": "Geometry & Solids",
      conics: "Conic Sections",
      "conic-sections": "Conic Sections",
      inequalities: "Inequalities"
    };

    const category = hashMap[hash];

    if (category) {
      setActiveCategory(category);
    }
  }

  window.addEventListener("hashchange", applyHash);

  applyHash();
}


// ============================================================
// HANDLE CATEGORY SIDEBAR LINKS
// ============================================================

function initializeSidebarNavigation() {
  /*
    If your sidebar uses links such as:

    <a href="#calculus">

    or:

    <a href="#inequalities">

    this will allow the existing hash navigation to control
    the catalog without requiring changes to the HTML.
  */

  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("href");

      if (!target || target === "#") {
        return;
      }

      const hash = target.substring(1).toLowerCase();

      const categoryMap = {
        calculus: "Calculus",
        geometry: "Geometry & Solids",
        "geometry-solids": "Geometry & Solids",
        conics: "Conic Sections",
        "conic-sections": "Conic Sections",
        inequalities: "Inequalities"
      };

      if (categoryMap[hash]) {
        setActiveCategory(categoryMap[hash]);
      }
    });
  });
}


// ============================================================
// UPDATE TOTAL PROJECT COUNT
// ============================================================

function initializeProjectCount() {
  const countElement =
    document.getElementById("project-count");

  if (!countElement) {
    return;
  }

  // Initially show total number of projects.
  countElement.textContent =
    `${projectsData.length} Interactive Visualizations`;
}


// ============================================================
// INITIALIZE APPLICATION
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initializeProjectCount();

  renderProjects();

  initializeCategoryButtons();

  initializeSearch();

  initializeKeyboardNavigation();

  initializeHashNavigation();

  initializeSidebarNavigation();
});