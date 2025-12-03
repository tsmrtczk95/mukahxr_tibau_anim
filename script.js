// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);

/*NEW*/
import { loadAudio, loadVideo, loadArticleText, loadPDF, loadExternalArticle, loadQuiz } from "./components/ui.js";

document.querySelectorAll("[data-open]").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.open;
    if (type === "audio") loadAudio();
    if (type === "video") loadVideo();
    if (type === "articles") loadArticleText(); // you can add menu later
    if (type === "pdf") loadPDF();
    if (type === "external") loadExternalArticle();
    if (type === "quiz") loadQuiz();
    if (type === "home") window.location.href = "index.html";
  });
});

// Mobile drawer
document.getElementById("mobile-menu-btn").onclick = () => {
  const drawer = document.getElementById("mobile-drawer");
  drawer.style.display = drawer.style.display === "flex" ? "none" : "flex";
};
