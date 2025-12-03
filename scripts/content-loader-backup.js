// content-loader.js
import { createAudioCard, createVideoCard, createArticleCard, createPDFCard, createExternalArticleCard } from './ui-components.js';

export async function loadContent(type) {
  const area = document.getElementById('contentArea');
  area.innerHTML = '<p>Loading...</p>';

  switch(type) {
    case 'audio':
      area.innerHTML = '';
      area.appendChild(createAudioCard('./assets/audio/guide.mp3', 'Audio Guide'));
      break;

    case 'video':
      area.innerHTML = '';
      area.appendChild(createVideoCard('./assets/video/tour.mp4', 'Video Tour'));
      break;

    case 'articles':
      area.innerHTML = '';
      // Local text
      const txt = await fetch('./assets/articles/intro.txt').then(r => r.text());
      area.appendChild(createArticleCard('Introduction', marked.parse?.(txt) || txt.replace(/\n/g, '<br>')));

      // Local PDF
      area.appendChild(createPDFCard('./assets/articles/specs.pdf', 'Technical Specs'));

      // External article (e.g., Wikipedia)
      area.appendChild(createExternalArticleCard('https://en.wikipedia.org/wiki/Ironwood', 'About Ironwood'));
      break;

    case 'quiz':
      loadQuiz(area);
      break;

    default:
      area.innerHTML = '<p>Select a content type.</p>';
  }
}

// Optional: Use marked.js for Markdown (add CDN if needed)
// <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

function loadQuiz(container) {
  container.innerHTML = `
    <h3>Quick Quiz</h3>
    <form id="quizForm">
      <p>What is Ironwood known for?</p>
      <label><input type="radio" name="q1" value="a"> Soft texture</label><br>
      <label><input type="radio" name="q1" value="b"> Extreme hardness ✅</label><br>
      <label><input type="radio" name="q1" value="c"> Low density</label><br>
      <button type="submit">Check Answer</button>
    </form>
    <div id="quizResult"></div>
  `;

  document.getElementById('quizForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const answer = document.querySelector('input[name="q1"]:checked')?.value;
    const result = document.getElementById('quizResult');
    if (answer === 'b') {
      result.innerHTML = '<p style="color:green">✅ Correct!</p>';
    } else {
      result.innerHTML = '<p style="color:red">❌ Try again!</p>';
    }
  });
}
