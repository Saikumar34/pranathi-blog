const PASSWORD = "pranathi@love";

function login() {
  const input = document.getElementById('password').value;
  if (input === PASSWORD) {
    sessionStorage.setItem('auth', 'true');
    window.location.href = '/feed/';
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
  window.location.href = '/';
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
  window.location.href = '/';
}