fetch('data/posts.json')
  .then(res => res.json())
  .then(posts => {
    const feed = document.getElementById('feed');
    posts.reverse().forEach(p => {
      feed.innerHTML += `
        <div class="post">
          <img src="${p.image}">
          <div class="meta">${p.date} · ${p.place}</div>
          <p>${p.caption}</p>
        </div>`;
    });
  });