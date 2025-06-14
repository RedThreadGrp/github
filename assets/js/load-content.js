window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('main-content');
  if (!window.sections || !container) {
    console.warn("Missing sections or main-content container");
    return;
  }

  console.log("🔎 Sections to load:", sections);

  sections.forEach(section => {
    const path = `content/${section}.html`;
    console.log(`📦 Fetching ${path}...`);

    fetch(path)
      .then(res => {
        if (!res.ok) {
          throw new Error(`❌ Failed to load ${path} (status: ${res.status})`);
        }
        return res.text();
      })
      .then(html => {
        const div = document.createElement('div');
        div.innerHTML = html;
        container.appendChild(div);
        console.log(`✅ Loaded ${path}`);
      })
      .catch(err => console.error(err));
  });
});


