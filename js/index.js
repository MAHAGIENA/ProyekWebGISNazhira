function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
  }

  let currentIndex = 0;
  const slide = document.getElementById('carouselSlide');
  const totalSlides = slide.children.length;

  function updateSlide() {
    slide.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function moveSlide(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = totalSlides - 1;
    if (currentIndex >= totalSlides) currentIndex = 0;
    updateSlide();
  }

  // Otomatis pindah slide
  setInterval(() => {
    moveSlide(1);
  }, 5000);

   // Script untuk menampilkan tahun saat ini secara otomatis
   document.getElementById('year').textContent = new Date().getFullYear();