// SHA-256 hash of the password - actual password is never stored in code!
// This is the hash of "pranathi@love"
const PASSWORD_HASH = "82db84d60b386fb95e79bdb22d16d8399a86afd5e4d18c380329d224633c1f14";

// Function to hash password using SHA-256
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function login() {
  const input = document.getElementById('password').value;
  const inputHash = await hashPassword(input);
  
  if (inputHash === PASSWORD_HASH) {
    sessionStorage.setItem('auth', 'true');
    window.location.href = 'feed/';
  } else {
    const inputElement = document.getElementById('password');
    inputElement.style.borderColor = '#ff4444';
    inputElement.value = '';
    inputElement.placeholder = 'Wrong password, try again...';
    setTimeout(() => {
      inputElement.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      inputElement.placeholder = 'Enter password';
    }, 2000);
  }
}

function logout() {
  sessionStorage.removeItem('auth');
  window.location.href = '../';
}

// Handle Enter key on password input
if (document.getElementById('password')) {
  document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      login();
    }
  });
}

// Protect feed and admin pages
if ((window.location.pathname.includes('/feed') || window.location.pathname.includes('/admin')) && !sessionStorage.getItem('auth')) {
  window.location.href = '../';
}