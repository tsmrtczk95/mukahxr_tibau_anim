// content-loader.js
import { createAudioCard, createVideoCard, createArticleCard, createPDFCard, createExternalArticleCard } from './ui-components.js';

// Add this helper (you can place at top or near imports)
async function loadQuizFromJSON(container, quizId = 'tibau') {
  try {
     const response = await fetch(`./content/quizzes/${quizId}.json`);
    if (!response.ok) throw new Error(`Quiz '${quizId}' not found.`);
    const quizData = await response.json();
          
    const form = document.createElement('form');
    form.id = 'quizForm';
    form.innerHTML = `
    <h3>${quizData.title}</h3>
    <p class="quiz-desc">${quizData.description}</p>
    `;
          
    quizData.questions.forEach((q, idx) => {
      const qDiv = document.createElement('div');
      qDiv.className = 'quiz-question';
      qDiv.innerHTML = `
      <p><strong>Q${q.id}:</strong> ${q.text}</p>
      ${q.options.map((opt, i) => `
      <label class="quiz-option">
      <input type="radio" name="q${q.id}" value="${i}" required>
      ${opt.replace(' ✅', '')} <!-- strip emoji for display -->
      </label>
      `).join('')}
      <div class="feedback" id="feedback-${q.id}" style="margin: 4px 0 12px; font-size: 0.9em;"></div>
      `;
      form.appendChild(qDiv);
      });
    form.innerHTML += `
    <button type="submit" class="btn-submit">Check Answers</button>
    <div id="quizResult" style="margin-top: 16px; font-weight: bold;"></div>
    `;
    
    container.innerHTML = '';
    container.appendChild(form);
          
    // Handle submission
    form.addEventListener('submit', (e) => {
    e.preventDefault();
      let score = 0;
      
      quizData.questions.forEach(q => {
        const selected = form.querySelector(`input[name="q${q.id}"]:checked`);
        const feedbackEl = document.getElementById(`feedback-${q.id}`);
        if (selected) {
          const answerIndex = parseInt(selected.value);
          if (answerIndex === q.correctIndex) {
            score++;
            feedbackEl.innerHTML = `<span style="color:green">✅ Correct!</span> ${q.explanation}`;
            } else {
            feedbackEl.innerHTML = `
            <span style="color:red">❌ Incorrect.</span> ${q.explanation}
            <br><em>Correct: ${q.options[q.correctIndex].replace(' ✅', '')}</em>
            `;
            }
          } else {
          feedbackEl.innerHTML = '<span style="color:orange">⚠️ No answer selected.</span>';
          }
        });
      const resultEl = document.getElementById('quizResult');
      const max = quizData.questions.length;
      resultEl.innerHTML = `
      <p>You scored <strong>${score} out of ${max}</strong>.</p>
      ${score === max ? '<p style="color:green">🌟 Well done! You know your Melanau culture!</p>' : ''}
      `;
      });
    } catch (err) {
    container.innerHTML = `<p style="color:red">⚠️ Error loading quiz: ${err.message}</p>`;
    }
  };

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
      loadQuizFromJSON(area, 'tibau'); // ← loads tibau.json
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
