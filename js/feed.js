fetch('/data/posts.json')
  .then(res => res.json())
  .then(posts => {
    const feed = document.getElementById('feed');
    
    if (!posts || posts.length === 0) {
      feed.innerHTML = `
        <div class="loading">
          <p style="font-size: 18px; margin-bottom: 12px;">📝 No posts yet</p>
          <p>Start creating beautiful memories by clicking "New Post" above</p>
        </div>
      `;
      return;
    }
    
    feed.innerHTML = '';
    
    // Show posts in reverse chronological order (newest first)
    [...posts].reverse().forEach(p => {
      const postDiv = document.createElement('div');
      postDiv.className = 'post';
      
      // Format date nicely
      const date = new Date(p.date);
      const formattedDate = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      
      postDiv.innerHTML = `
        <img src="${p.image}" alt="${p.place}" onerror="this.src='https://via.placeholder.com/800x600/1a1a2e/ff5fa2?text=Image+Not+Found'">
        <div class="post-content">
          <div class="meta">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12.5 2.5h-9A1.5 1.5 0 002 4v9.5A1.5 1.5 0 003.5 15h9a1.5 1.5 0 001.5-1.5V4a1.5 1.5 0 00-1.5-1.5z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M10.5 1v3M5.5 1v3M2 6.5h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span>${formattedDate}</span>
            <span>·</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 13.5c3.314 0 6-4.5 6-4.5S11.314 4.5 8 4.5 2 9 2 9s2.686 4.5 6 4.5z" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="8" cy="9" r="2" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            <span>${p.place}</span>
          </div>
          <p class="caption">${p.caption}</p>
        </div>
      `;
      
      feed.appendChild(postDiv);
    });
  })
  .catch(err => {
    const feed = document.getElementById('feed');
    feed.innerHTML = `
      <div class="loading">
        <p style="color: #ff4444; font-size: 18px; margin-bottom: 12px;">⚠️ Error loading posts</p>
        <p>${err.message}</p>
      </div>
    `;
  });