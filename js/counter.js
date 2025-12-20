// Animated Counter Interaktif untuk .count
// Efek: Angka naik, bounce, dan highlight saat selesai
window.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.count');
  const options = {
    threshold: 0.6
  };
  function animateCounter(counter) {
    const target = +counter.getAttribute('data-count');
    let current = 0;
    const duration = 1200 + Math.random()*600; // ms
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      let progress = Math.min(elapsed / duration, 1);
      // Animasi bounce
      progress = progress < 1 ? 1 - Math.pow(1 - progress, 2.5) : 1;
      const value = Math.floor(progress * target);
      counter.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
        counter.classList.add('count-bounce');
        setTimeout(()=>counter.classList.remove('count-bounce'), 700);
      }
    }
    requestAnimationFrame(update);
  }
  // Intersection Observer agar animasi hanya jalan saat muncul di viewport
  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, options);
  counters.forEach(counter => {
    observer.observe(counter);
  });
});


