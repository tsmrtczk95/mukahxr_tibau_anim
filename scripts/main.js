// main.js
import { loadContent } from './content-loader.js';

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle (mobile)
  const toggle = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('uiSidebar');

  toggle?.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    // Lock body scroll when sidebar open (mobile)
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    });
  
  if (toggle) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }

  // Navigation buttons
  document.querySelectorAll('.btn-nav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = e.target.dataset.content;
      loadContent(type);
      // Close sidebar on mobile after selection
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
      }
    });
  });
});

document.getElementById('forceArBtn')?.addEventListener('click', () => {
  const modelViewer = document.querySelector('model-viewer');
  modelViewer.activateAR();
});
