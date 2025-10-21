(async function(){
  const url = '/gallery-images.json'; // adjust path if needed
  let data = [];
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error('Fetch failed ' + res.status);
    data = await res.json();
  } catch (e) {
    console.error('Could not load gallery JSON:', e);
    return;
  }

  const container = document.createElement('div');
  container.className = 'rt-container';
  const colRtDiv = document.createElement('div');
  colRtDiv.className = 'col-rt-12';
  const scriptContent =document.createElement('div');
  scriptContent.className = 'Scriptcontent';

  // Insert each section
  data.forEach(section => {
    const sec = document.createElement('section');
    const h4 = document.createElement('h4'); h4.textContent = section.sectionTitle;
    sec.appendChild(h4);

    const gallery = document.createElement('div');
    gallery.className = 'gallery';

    (section.items || []).forEach(item => {
      const wrap = document.createElement('div');
      wrap.className = 'gallery-item ' + (item.sizeClass || 'item-1x1');

      const img = document.createElement('img');
      img.className = 'thumb placeholder';
      img.src = item.src;
      img.setAttribute('data-src', item.src);
      img.setAttribute('data-image', item.src);
      if (item.longTitle) img.setAttribute('data-title', item.longTitle);
      if (item.alt) img.alt = item.alt;
      if (item.title) {
        const cap = document.createElement('div');
        cap.className = 'caption';
        const span = document.createElement('span');
        span.textContent = item.title;
        cap.appendChild(span);
        wrap.appendChild(cap);
      }

      wrap.appendChild(img);
      gallery.appendChild(wrap);
    });

    sec.appendChild(gallery);
    scriptContent.appendChild(sec);
  });
  colRtDiv.appendChild(scriptContent);
  container.appendChild(colRtDiv);
  document.body.appendChild(container);
})();