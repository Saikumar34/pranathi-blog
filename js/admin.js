// Set today's date as default and load images
window.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;
  
  // Load images list
  loadImagesList();
});

// Load images from local list
async function loadImagesList() {
  const select = document.getElementById('imageFilename');
  
  try {
    const response = await fetch('../data/images-list.json');
    
    if (!response.ok) {
      throw new Error('Failed to load images list');
    }
    
    const imageFiles = await response.json();
    
    // Clear loading option
    select.innerHTML = '';
    
    if (imageFiles.length === 0) {
      select.innerHTML = '<option value="">No images in list - add to data/images-list.json</option>';
      return;
    }
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select an image --';
    select.appendChild(defaultOption);
    
    // Add image options (reverse order - newest first)
    imageFiles.reverse().forEach(filename => {
      const option = document.createElement('option');
      option.value = filename;
      option.textContent = filename;
      select.appendChild(option);
    });
    
  } catch (error) {
    console.error('Error loading images list:', error);
    select.innerHTML = '<option value="">Error loading images - check console</option>';
  }
}

// Preview image from GitHub
function previewImage() {
  const filename = document.getElementById('imageFilename').value.trim();
  const previewDiv = document.getElementById('imagePreview');
  
  if (!filename) {
    // Reset to placeholder
    previewDiv.innerHTML = `
      <div class="preview-placeholder">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M40 38V10a2 2 0 00-2-2H10a2 2 0 00-2 2v28a2 2 0 002 2h28a2 2 0 002-2z" stroke="currentColor" stroke-width="2"/>
          <path d="M16 20a2 2 0 100-4 2 2 0 000 4zM8 38l12-12 4 4 8-8 8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>Image preview will appear here</p>
      </div>
    `;
    return;
  }
  
  // Show loading state
  previewDiv.innerHTML = `
    <div class="preview-placeholder">
      <p style="color: #ff8fab;">Loading preview...</p>
    </div>
  `;
  
  // Try to load the image from GitHub/images folder
  const imagePath = `../images/${filename}`;
  const img = new Image();
  
  img.onload = function() {
    previewDiv.innerHTML = `<img src="${imagePath}" alt="Preview">`;
  };
  
  img.onerror = function() {
    previewDiv.innerHTML = `
      <div class="preview-placeholder">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 24m-20 0a20 20 0 1 0 40 0a20 20 0 1 0 -40 0" stroke="#ff4444" stroke-width="2"/>
          <path d="M18 18l12 12M30 18l-12 12" stroke="#ff4444" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p style="color: #ff4444;">Image not found!</p>
        <p style="color: #888; font-size: 12px;">Make sure "${filename}" is uploaded to GitHub images/ folder</p>
      </div>
    `;
  };
  
  img.src = imagePath;
}

function savePost() {
  const filenameInput = document.getElementById('imageFilename');
  const placeInput = document.getElementById('place');
  const dateInput = document.getElementById('date');
  const captionInput = document.getElementById('caption');
  
  // Validate inputs
  if (!filenameInput.value) {
    alert('⚠️ Please select an image');
    filenameInput.focus();
    return;
  }
  if (!placeInput.value) {
    alert('⚠️ Please enter a location');
    placeInput.focus();
    return;
  }
  if (!dateInput.value) {
    alert('⚠️ Please select a date');
    dateInput.focus();
    return;
  }
  if (!captionInput.value) {
    alert('⚠️ Please write a caption');
    captionInput.focus();
    return;
  }
  
  // Show under construction message
  alert('🚧 Feature Under Development\n\nThe ability to save and upload posts is currently being built.\n\nPlease check back soon! 🚀');
}

function copyToClipboard() {
  const output = document.getElementById('output');
  const text = output.textContent;
  
  if (!text || text.trim() === '') {
    alert('⚠️ Nothing to copy yet! Please save a post first.');
    return;
  }
  
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