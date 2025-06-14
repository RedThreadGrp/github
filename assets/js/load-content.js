const sections = [
  'hero',
  'features',
  'blog-section',
  'contact-form'
];

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('main-content');
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
