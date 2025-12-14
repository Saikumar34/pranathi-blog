// GitHub repository details
const GITHUB_REPO = 'Saikumar34/pranathi-blog';
const GITHUB_API = `https://api.github.com/repos/${GITHUB_REPO}/contents/images`;

// Set today's date as default and load images
window.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;
  
  // Load images from GitHub
  loadImagesFromGitHub();
});

// Fetch images from GitHub repository
async function loadImagesFromGitHub() {
  const select = document.getElementById('imageFilename');
  
  try {
    const response = await fetch(GITHUB_API);
    
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    
    const files = await response.json();
    
    // Filter only image files
    const imageFiles = files.filter(file => 
      file.type === 'file' && 
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name)
    );
    
    // Clear loading option
    select.innerHTML = '';
    
    if (imageFiles.length === 0) {
      select.innerHTML = '<option value="">No images found - upload some to GitHub!</option>';
      return;
    }
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select an image --';
    select.appendChild(defaultOption);
    
    // Add image options (sorted by name)
    imageFiles
      .sort((a, b) => b.name.localeCompare(a.name)) // Newest first
      .forEach(file => {
        const option = document.createElement('option');
        option.value = file.name;
        option.textContent = file.name;
        select.appendChild(option);
      });
    
  } catch (error) {
    console.error('Error loading images:', error);
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
  const output = document.getElementById('output');
  const outputSection = document.getElementById('outputSection');
  
  // Validate inputs
  if (!filenameInput.value) {
    alert('⚠️ Please enter image filename');
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
  
  const filename = filenameInput.value.trim();
  const imagePath = `../images/${filename}`;
  
  // Create the post object
  const post = {
    image: imagePath,
    place: placeInput.value,
    date: dateInput.value,
    caption: captionInput.value
  };
  
  // Display the JSON
  output.textContent = JSON.stringify(post, null, 2);
  outputSection.style.display = 'block';
  
  // Scroll to output
  outputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Show success message
  alert('✅ Post JSON generated! Copy it and add to data/posts.json on GitHub');
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