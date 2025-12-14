// Global variables
let encryptedImageData = null;
let imagePreviewUrl = null;

// Set today's date as default
window.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;
});

// Handle image file upload
async function handleImageUpload() {
  const fileInput = document.getElementById('imageFile');
  const file = fileInput.files[0];
  const previewDiv = document.getElementById('imagePreview');
  
  if (!file) {
    resetImagePreview();
    return;
  }
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('⚠️ Please select an image file');
    fileInput.value = '';
    resetImagePreview();
    return;
  }
  
  // Show loading
  previewDiv.innerHTML = `
    <div class="preview-placeholder">
      <p style="color: #ff8fab;">Loading image...</p>
    </div>
  `;
  
  // Read and display preview
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreviewUrl = e.target.result;
    previewDiv.innerHTML = `<img src="${imagePreviewUrl}" alt="Preview">`;
  };
  reader.readAsDataURL(file);
}

function resetImagePreview() {
  const previewDiv = document.getElementById('imagePreview');
  encryptedImageData = null;
  imagePreviewUrl = null;
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

async function savePost() {
  const fileInput = document.getElementById('imageFile');
  const passwordInput = document.getElementById('encryptPassword');
  const placeInput = document.getElementById('place');
  const dateInput = document.getElementById('date');
  const captionInput = document.getElementById('caption');
  const output = document.getElementById('output');
  const outputSection = document.getElementById('outputSection');
  
  // Validate inputs
  if (!fileInput.files || !fileInput.files[0]) {
    alert('⚠️ Please upload an image');
    fileInput.focus();
    return;
  }
  if (!passwordInput.value) {
    alert('⚠️ Please enter the encryption password');
    passwordInput.focus();
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
  
  // Show encrypting message
  output.textContent = '🔐 Encrypting image... Please wait...';
  outputSection.style.display = 'block';
  
  try {
    // Encrypt the image
    const file = fileInput.files[0];
    const password = passwordInput.value;
    
    encryptedImageData = await encryptImage(file, password);
    
    // Create the post object with encrypted image
    const post = {
      image: encryptedImageData,
      place: placeInput.value,
      date: dateInput.value,
      caption: captionInput.value,
      encrypted: true  // Flag to indicate this is encrypted
    };
    
    // Display the JSON
    output.textContent = JSON.stringify(post, null, 2);
    
    // Scroll to output
    outputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Show success message
    alert('✅ Image encrypted successfully! Copy the JSON below and add it to data/posts.json');
    
  } catch (error) {
    console.error('Encryption error:', error);
    alert('❌ Encryption failed! Please try again. Error: ' + error.message);
    output.textContent = 'Encryption failed: ' + error.message;
  }
}

function copyToClipboard() {
  const output = document.getElementById('output');
  const text = output.textContent;
  
  if (!text || text.includes('Encrypting') || text.includes('failed')) {
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