const state = { careers: [], lostFound: [], feedback: [] };
const dom = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheDom(); bindEvents(); initializeDate(); initializeApp();
});

function cacheDom() {
  dom.lostFoundForm = document.getElementById("lostFoundForm");
  dom.lostFoundMessage = document.getElementById("lostFoundMessage");
  dom.searchLostFound = document.getElementById("searchLostFound");
  dom.filterType = document.getElementById("filterType");
  dom.filterCategory = document.getElementById("filterCategory");
  dom.lostFoundList = document.getElementById("lostFoundList");
  dom.lostFoundCount = document.getElementById("lostFoundCount");

  dom.careerSelect = document.getElementById("careerSelect");
  dom.careerButton = document.getElementById("careerButton");
  dom.roadmapTitle = document.getElementById("roadmapTitle");
  dom.roadmapIntro = document.getElementById("roadmapIntro");
  dom.roadmapTimeline = document.getElementById("roadmapTimeline");
  dom.roadmapSkills = document.getElementById("roadmapSkills");
  dom.roadmapTools = document.getElementById("roadmapTools");
  dom.roadmapCourses = document.getElementById("roadmapCourses");
  dom.roadmapRoles = document.getElementById("roadmapRoles");

  dom.feedbackForm = document.getElementById("feedbackForm");
  dom.feedbackMessage = document.getElementById("feedbackMessage");
  dom.feedbackList = document.getElementById("feedbackList");
  dom.summaryAverage = document.getElementById("summaryAverage");
  dom.summaryTotal = document.getElementById("summaryTotal");
  dom.summaryTopCourse = document.getElementById("summaryTopCourse");

  dom.statOpenCases = document.getElementById("statOpenCases");
  dom.statFoundPosts = document.getElementById("statFoundPosts");
  dom.statCareerPaths = document.getElementById("statCareerPaths");
  dom.statFeedbackCount = document.getElementById("statFeedbackCount");

  dom.openGamesModal = document.getElementById("openGamesModal");
  dom.closeGamesModal = document.getElementById("closeGamesModal");
  dom.gamesModal = document.getElementById("gamesModal");
}

function bindEvents() {
  dom.lostFoundForm.addEventListener("submit", handleLostFoundSubmit);
  dom.feedbackForm.addEventListener("submit", handleFeedbackSubmit);
  dom.searchLostFound.addEventListener("input", debounce(loadLostFound, 250));
  dom.filterType.addEventListener("change", loadLostFound);
  dom.filterCategory.addEventListener("change", loadLostFound);
  dom.careerButton.addEventListener("click", renderSelectedCareer);

  dom.lostFoundList.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-resolve-id]");
    if (!button) return;
    const id = button.dataset.resolveId;
    button.disabled = true; button.textContent = "Updating...";
    try {
      await api(`/api/lostfound/${id}/resolve`, { method: "PATCH" });
      await Promise.all([loadLostFound(), loadStats()]);
    } catch (error) { alert(error.message || "Could not update the item."); }
    finally { button.disabled = false; button.textContent = "Mark as Resolved"; }
  });

  if (dom.openGamesModal) {
    dom.openGamesModal.addEventListener("click", () => {
      dom.gamesModal.classList.add("show");
      dom.gamesModal.classList.remove("hidden");
      document.body.style.overflow = "hidden"; 
    });
  }
  if (dom.closeGamesModal) {
    dom.closeGamesModal.addEventListener("click", () => {
      dom.gamesModal.classList.remove("show");
      document.body.style.overflow = "auto"; 
    });
  }
  if (dom.gamesModal) {
    dom.gamesModal.addEventListener("click", (event) => {
      if (event.target === dom.gamesModal) {
        dom.gamesModal.classList.remove("show");
        document.body.style.overflow = "auto";
      }
    });
  }
}

function initializeDate() {
  const dateInput = document.getElementById("lfDate");
  if (dateInput) dateInput.value = new Date().toISOString().split("T")[0];
}

async function initializeApp() {
  try { await Promise.all([loadStats(), loadLostFound(), loadCareers(), loadFeedback()]); } 
  catch (error) { console.error(error); }
}

async function api(url, options = {}) {
  const response = await fetch(url, { headers: { "Content-Type": "application/json" }, ...options });
  const data = response.headers.get("content-type")?.includes("application/json") ? await response.json() : await response.text();
  if (!response.ok) throw new Error(data.message || "Something went wrong.");
  return data;
}

async function loadStats() {
  const stats = await api("/api/stats");
  dom.statOpenCases.textContent = stats.openCases;
  dom.statFoundPosts.textContent = stats.foundPosts;
  dom.statCareerPaths.textContent = stats.careerPaths;
  dom.statFeedbackCount.textContent = stats.feedbackCount;
}

async function loadLostFound() {
  const params = new URLSearchParams({ search: dom.searchLostFound.value.trim(), type: dom.filterType.value, category: dom.filterCategory.value });
  state.lostFound = await api(`/api/lostfound?${params.toString()}`);
  renderLostFound(state.lostFound);
}

function renderLostFound(items) {
  dom.lostFoundCount.textContent = items.length;
  if (!items.length) { dom.lostFoundList.innerHTML = emptyState("No posts", "Try another search."); return; }
  dom.lostFoundList.innerHTML = items.map(item => `
    <article class="list-card">
      <div class="list-top">
        <div>
          <div class="badge-row">
            <span class="badge ${item.type === 'lost' ? 'badge-lost' : 'badge-found'}">${capitalize(item.type)}</span>
            <span class="badge ${item.status === 'resolved' ? 'badge-resolved' : 'badge-open'}">${capitalize(item.status)}</span>
            <span class="badge">${escapeHtml(item.category)}</span>
          </div>
          <h3 class="list-title">${escapeHtml(item.title)}</h3>
        </div>
      </div>
      <div class="meta-wrap">
        <span class="meta-row">📍 ${escapeHtml(item.location)}</span>
        <span class="meta-row">📅 ${formatDate(item.date)}</span>
      </div>
      <p class="card-description">${escapeHtml(item.description)}</p>
      <div class="list-actions">
        ${item.status === "open" ? `<button class="btn btn-ghost" data-resolve-id="${item.id}">Mark as Resolved</button>` : ""}
      </div>
    </article>`).join("");
}

async function handleLostFoundSubmit(event) {
  event.preventDefault(); setMessage(dom.lostFoundMessage, "Submitting...");
  try {
    await api("/api/lostfound", { method: "POST", body: JSON.stringify(Object.fromEntries(new FormData(dom.lostFoundForm))) });
    dom.lostFoundForm.reset(); initializeDate(); setMessage(dom.lostFoundMessage, "Success!");
    await Promise.all([loadLostFound(), loadStats()]);
  } catch (error) { setMessage(dom.lostFoundMessage, error.message, true); }
}

async function loadCareers() {
  state.careers = await api("/api/careers");
  dom.careerSelect.innerHTML = state.careers.map(career => `<option value="${career.id}">${escapeHtml(career.title)}</option>`).join("");
  if (state.careers.length) { dom.careerSelect.value = state.careers[0].id; await renderCareer(state.careers[0].id); }
}

async function renderSelectedCareer() { await renderCareer(dom.careerSelect.value); }

async function renderCareer(id) {
  const career = await api(`/api/careers/${id}`);
  dom.roadmapTitle.textContent = career.title; dom.roadmapIntro.textContent = career.intro;
  dom.roadmapTimeline.innerHTML = career.stages.map(stage => `
    <article class="timeline-card"><span class="timeline-phase">${escapeHtml(stage.phase)}</span><h4>${escapeHtml(stage.title)}</h4>
    <ul class="timeline-list">${stage.details.map(d => `<li>${escapeHtml(d)}</li>`).join("")}</ul></article>`).join("");
  renderTagList(dom.roadmapSkills, career.skills); renderTagList(dom.roadmapTools, career.tools);
  renderTagList(dom.roadmapCourses, career.courses); renderTagList(dom.roadmapRoles, career.roles);
}

function renderTagList(container, items = []) { container.innerHTML = items.map(item => `<span>${escapeHtml(item)}</span>`).join(""); }

async function loadFeedback() {
  const [feedback, summary] = await Promise.all([api("/api/feedback"), api("/api/feedback/summary")]);
  state.feedback = feedback; renderFeedback(feedback); renderFeedbackSummary(summary);
}

function renderFeedback(items) {
  if (!items.length) { dom.feedbackList.innerHTML = emptyState("No feedback", ""); return; }
  dom.feedbackList.innerHTML = items.slice(0, 8).map(item => `
    <article class="list-card">
      <div class="list-top">
        <div><div class="badge-row"><span class="badge badge-rating">⭐ ${item.rating}/5</span><span class="badge">${escapeHtml(item.department)}</span></div>
        <h3 class="list-title">${escapeHtml(item.courseCode)}</h3></div>
      </div>
      <p class="card-description">${escapeHtml(item.message)}</p>
    </article>`).join("");
}

function renderFeedbackSummary(summary) {
  dom.summaryAverage.textContent = summary.averageRating.toFixed(1); dom.summaryTotal.textContent = summary.totalFeedback;
  dom.summaryTopCourse.textContent = summary.topCourse ? `${summary.topCourse.label} (${summary.topCourse.average}/5)` : "No data yet";
}

async function handleFeedbackSubmit(event) {
  event.preventDefault(); setMessage(dom.feedbackMessage, "Submitting...");
  try {
    await api("/api/feedback", { method: "POST", body: JSON.stringify(Object.fromEntries(new FormData(dom.feedbackForm))) });
    dom.feedbackForm.reset(); setMessage(dom.feedbackMessage, "Success.");
    await Promise.all([loadFeedback(), loadStats()]);
  } catch (error) { setMessage(dom.feedbackMessage, error.message, true); }
}

function setMessage(el, msg, isErr = false) { el.textContent = msg; el.classList.toggle("error", isErr); }
function capitalize(val = "") { return val ? val.charAt(0).toUpperCase() + val.slice(1) : ""; }
function emptyState(title, desc) { return `<div class="empty-state"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(desc)}</p></div>`; }
function formatDate(dateStr) { return dateStr ? new Intl.DateTimeFormat("en-GB").format(new Date(dateStr)) : "N/A"; }
function debounce(fn, delay = 250) { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); }; }
function escapeHtml(val = "") { return String(val).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"); }