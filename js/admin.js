// Set today's date as default
window.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;
  
  // Add image preview functionality
  const imageInput = document.getElementById('image');
  imageInput.addEventListener('input', updateImagePreview);
});

function updateImagePreview() {
  const imageUrl = document.getElementById('image').value;
  const previewDiv = document.getElementById('imagePreview');
  
  if (imageUrl) {
    const img = new Image();
    img.onload = function() {
      previewDiv.innerHTML = `<img src="${imageUrl}" alt="Preview">`;
    };
    img.onerror = function() {
      previewDiv.innerHTML = `
        <div class="preview-placeholder">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M24 24m-20 0a20 20 0 1 0 40 0a20 20 0 1 0 -40 0" stroke="#ff4444" stroke-width="2"/>
            <path d="M18 18l12 12M30 18l-12 12" stroke="#ff4444" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <p style="color: #ff4444;">Invalid image URL</p>
        </div>
      `;
    };
    img.src = imageUrl;
  } else {
    previewDiv.innerHTML = `
      <div class="preview-placeholder">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M40 38V10a2 2 0 00-2-2H10a2 2 0 00-2 2v28a2 2 0 002 2h28a2 2 0 002-2z" stroke="currentColor" stroke-width="2"/>
          <path d="M16 20a2 2 0 100-4 2 2 0 000 4zM8 38l12-12 4 4 8-8 8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>Image preview will appear here</p>
      </div>
    `;
  }
}

function savePost() {
  const imageInput = document.getElementById('image');
  const placeInput = document.getElementById('place');
  const dateInput = document.getElementById('date');
  const captionInput = document.getElementById('caption');
  
  // Validate inputs
  if (!imageInput.value) {
    alert('Please enter an image URL');
    imageInput.focus();
    return;
  }
  if (!placeInput.value) {
    alert('Please enter a location');
    placeInput.focus();
    return;
  }
  if (!dateInput.value) {
    alert('Please select a date');
    dateInput.focus();
    return;
  }
  if (!captionInput.value) {
    alert('Please write a caption');
    captionInput.focus();
    return;
  }
  
  const post = {
    image: imageInput.value,
    place: placeInput.value,
    date: dateInput.value,
    caption: captionInput.value
  };
  
  const output = document.getElementById('output');
  const outputSection = document.getElementById('outputSection');
  
  output.textContent = JSON.stringify(post, null, 2);
  outputSection.style.display = 'block';
  
  // Scroll to output
  outputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function copyToClipboard() {
  const output = document.getElementById('output');
  const text = output.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Copied!';
    btn.style.background = 'rgba(74, 222, 128, 0.2)';
    btn.style.borderColor = 'rgba(74, 222, 128, 0.3)';
    btn.style.color = '#4ade80';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
    }, 2000);
  }).catch(err => {
    alert('Failed to copy: ' + err);
  });
}