const panel = document.getElementById("contentPanel");
const panelTitle = document.getElementById("panelTitle");
const panelBody = document.getElementById("contentBody");
const closePanel = document.getElementById("closePanel");

function openPanel(title, contentHTML) {
  panelTitle.textContent = title;
  panelBody.innerHTML = contentHTML;
  panel.classList.add("open");
}

closePanel.addEventListener("click", () => {
  panel.classList.remove("open");
});

/* -------------------------
   Content Loader Functions
-------------------------- */

// Load local audio
export function loadAudio() {
  openPanel("Audio", `
    <audio controls style="width: 100%;">
      <source src="./assets/audio/audio1.mp3" type="audio/mpeg">
    </audio>
  `);
}

// Load local video
export function loadVideo() {
  openPanel("Video", `
    <video controls style="width:100%;max-height:55vh;">
      <source src="./assets/video/video1.mp4" type="video/mp4">
    </video>
  `);
}

// Load text article
export async function loadArticleText() {
  const text = await fetch("./assets/articles/article1.txt").then(r => r.text());
  openPanel("Article", `<pre style="white-space:pre-wrap">${text}</pre>`);
}

// Load PDF
export function loadPDF() {
  openPanel("PDF Document", `
    <iframe src="./assets/articles/article2.pdf" style="width:100%;height:70vh;"></iframe>
  `);
}

// Load external webpage article
export function loadExternalArticle() {
  openPanel("External Article", `
    <iframe src="https://example.com/article" style="width:100%;height:70vh;"></iframe>
  `);
}

// Load quiz from JSON
export async function loadQuiz() {
  const quiz = await fetch("./assets/quiz/quiz1.json").then(r => r.json());
  openPanel("Quiz", buildQuizHTML(quiz));
}

function buildQuizHTML(q) {
  return `
    <h3>${q.title}</h3>
    ${q.questions.map((qs, i)=>`
      <div class="question">
        <p>${qs.q}</p>
        ${qs.options.map(opt => `
          <label><input type="radio" name="q${i}">${opt}</label><br>
        `).join("")}
      </div>
    `).join("")}
  `;
}

