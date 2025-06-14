window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('main-content');
  if (!window.sections) return;
  sections.forEach(section => {
    fetch(`content/${section}.html`)
      .then(res => res.text())
      .then(html => {
        const div = document.createElement('div');
        div.innerHTML = html;
        container.appendChild(div);
      })
      .catch(err => console.error(`Error loading ${section}:`, err));
  });
});
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  addPageFade();
  loadSections();
  initBlogSearch();
});

function loadSections() {
  const container = document.getElementById('main-content');
  container.classList.add('fade');
  if (!window.sections) return;
  Promise.all(window.sections.map(sec =>
    fetch(`content/${sec}.html`).then(r=>r.text())
  )).then(htmlArr => {
    container.innerHTML = htmlArr.join('');
    container.classList.add('loaded');
  });
}

function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const current = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', current);
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

function addPageFade() {
  document.body.classList.add('fade');
  window.sections = window.sections || [];
  setTimeout(() => document.body.classList.add('loaded'), 20);
  document.querySelectorAll('a').forEach(a => {
    if(a.target || a.href.includes('#') || a.href.startsWith('mailto:')) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.remove('loaded');
      setTimeout(() => window.location = a.href, 300);
    });
  });
}

function initBlogSearch() {
  const input = document.getElementById('blog-search');
  if (!input) return;
  input.addEventListener('input', () => {
    document.querySelectorAll('.blog article').forEach(article => {
      const text = article.textContent.toLowerCase();
      article.style.display = text.includes(input.value.toLowerCase()) ? '' : 'none';
    });
  });
}

