function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
  }

  function changeImage(src) {
    document.getElementById("mainImage").src = src;
  }

  function changeImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = thumbnail.src;

    // Update thumbnail aktif
    document.querySelectorAll('.thumbnail').forEach(img => img.classList.remove('active-thumbnail'));
    thumbnail.classList.add('active-thumbnail');
  }

  