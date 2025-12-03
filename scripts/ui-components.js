// ui-components.js
export function createAudioCard(src, title = "Audio") {
  const audio = document.createElement('audio');
  audio.controls = true;
  audio.src = src;
  return createMediaCard(title, audio);
}

export function createVideoCard(src, title = "Video") {
  const video = document.createElement('video');
  video.controls = true;
  video.src = src;
  video.style.width = '100%';
  return createMediaCard(title, video);
}

export function createArticleCard(title, content) {
  const div = document.createElement('div');
  div.innerHTML = `<h3>${title}</h3><div class="article-content">${content}</div>`;
  div.className = 'media-card';
  return div;
}

export function createPDFCard(pdfUrl, title = "Document") {
  const iframe = document.createElement('iframe');
  iframe.src = pdfUrl;
  iframe.style.width = '100%';
  iframe.style.height = '400px';
  return createMediaCard(title, iframe);
}

export function createExternalArticleCard(url, title = "External Article") {
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.sandbox = "allow-scripts allow-same-origin"; // security
  iframe.style.width = '100%';
  iframe.style.height = '500px';
  return createMediaCard(title, iframe);
}

function createMediaCard(title, element) {
  const card = document.createElement('div');
  card.className = 'media-card';
  card.innerHTML = `<h3>${title}</h3>`;
  card.appendChild(element);
  return card;
}
