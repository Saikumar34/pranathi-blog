const PASSWORD = "pranathi@love";

function login() {
  const input = document.getElementById('password').value;
  if (input === PASSWORD) {
    sessionStorage.setItem('auth', 'true');
    window.location.href = 'feed.html';
  } else {
    alert('Wrong password');
  }
}

if (window.location.pathname.includes('feed') && !sessionStorage.getItem('auth')) {
  window.location.href = 'index.html';
}