function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
  }

 // Toggle biodata
 function toggleMoreInfo() {
  const info = document.getElementById('moreInfo');
  const btn = event.target;
  const isVisible = info.style.display === 'block';
  info.style.display = isVisible ? 'none' : 'block';
  btn.textContent = isVisible ? 'Tampilkan Biodata Lengkap' : 'Sembunyikan Biodata';
}

// Komentar
document.getElementById('commentForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const comment = document.getElementById('comment').value.trim();

  if (!username || !comment) return;

  const commentBox = document.createElement('div');
  commentBox.style.marginBottom = '15px';
  commentBox.style.padding = '10px';
  commentBox.style.background = '#f0f0f0';
  commentBox.style.borderRadius = '5px';

  const nameEl = document.createElement('strong');
  nameEl.textContent = username;

  const textEl = document.createElement('p');
  textEl.textContent = comment;

  commentBox.appendChild(nameEl);
  commentBox.appendChild(textEl);

  document.getElementById('commentsList').prepend(commentBox);

  e.target.reset();
});

// Set year footer
document.getElementById('year').textContent = new Date().getFullYear();