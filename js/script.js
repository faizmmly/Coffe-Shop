// === Weather Widget Real-time & Interaktif ===
// Ganti 'YOUR_API_KEY' dengan API key OpenWeatherMap milik Anda
const WEATHER_API_KEY = 'YOUR_API_KEY';
const WEATHER_CITY = 'Bandung';
const weatherWidget = document.getElementById('weather-widget');
if (weatherWidget && WEATHER_API_KEY !== 'YOUR_API_KEY') {
  weatherWidget.style.opacity = '0.5';
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CITY}&appid=${WEATHER_API_KEY}&units=metric&lang=id`)
    .then(res => res.json())
    .then(data => {
      if (data && data.weather && data.weather[0]) {
        const icon = data.weather[0].icon;
        const desc = data.weather[0].description;
        const temp = Math.round(data.main.temp);
        weatherWidget.innerHTML = `
          <img src='https://openweathermap.org/img/wn/${icon}@2x.png' alt='${desc}' style='width:2.2rem;vertical-align:middle;'>
          <div><strong>${WEATHER_CITY}</strong><br>${desc.charAt(0).toUpperCase() + desc.slice(1)}, ${temp}°C</div>
        `;
        weatherWidget.classList.add('weather-fade-in');
        setTimeout(() => weatherWidget.style.opacity = '0.92', 300);
      }
    })
    .catch(() => {
      weatherWidget.innerHTML = `<span style='font-size:1.7rem;'>☁️</span><div><strong>${WEATHER_CITY}</strong><br>Cuaca tidak tersedia</div>`;
      weatherWidget.style.opacity = '0.92';
    });
  // Hover effect interaktif
  weatherWidget.addEventListener('mouseenter', () => {
    weatherWidget.style.boxShadow = '0 6px 24px rgba(37,211,102,0.18)';
    weatherWidget.style.transform = 'scale(1.04)';
  });
  weatherWidget.addEventListener('mouseleave', () => {
    weatherWidget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.13)';
    weatherWidget.style.transform = 'scale(1)';
  });
}
//Toggle class active
const navbarNav = document.querySelector
('.navbar-nav');
// ketika hamburger menu di klik
document.querySelector('#hamburger-menu').
onclick = () => {
    navbarNav.classList.toggle('active');
};

// Klik di tempat lain
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function(e){
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }
});

// Contact Pesanan
    document.getElementById("form-wa").addEventListener("submit", function(e) {
      e.preventDefault(); // Mencegah reload halaman

      // Ambil nilai input dari form
      const nama = document.getElementById("nama").value;
      const email = document.getElementById("email").value;
      // Produk dan jumlah dari checkbox
      let produkList = [];
      document.querySelectorAll('.product-selection input[type="checkbox"]:checked').forEach(cb => {
        const prod = cb.value;
        const qty = cb.nextElementSibling.value || 1;
        produkList.push(`${prod} (${qty})`);
      });
      const produk = produkList.join(', ');
      const catatan = document.getElementById("catatan").value;

      const pesan = `Halo, saya ingin melakukan pemesanan kopi.\n\nNama: ${nama}\nEmail: ${email}\nProduk: ${produk}\nCatatan: ${catatan || '-'}\n\nMohon tunggu informasi lebih lanjut. Terima kasih!`;

      const noTujuan = "6281382770650";
      const urlWa = `https://wa.me/${noTujuan}?text=${encodeURIComponent(pesan)}`;
      window.open(urlWa, '_blank');
      if (typeof showToast === 'function') showToast('Pesanan berhasil dikirim ke WhatsApp!');
      // Reset form setelah submit
      e.target.reset();
      // Disable semua input jumlah
      document.querySelectorAll('.product-selection input[type="number"]').forEach(inp => {
        inp.disabled = true;
      });
    });

// Pilih pesanan
  const checkboxes = document.querySelectorAll('.product-selection input[type="checkbox"]');


  // Kalkulator harga otomatis
  function updateTotalHarga() {
    let total = 0;
    document.querySelectorAll('.product-selection label').forEach(label => {
      const cb = label.querySelector('input[type="checkbox"]');
      const qtyInput = label.querySelector('input[type="number"]');
      const harga = parseInt(cb.getAttribute('data-harga')) || 0;
      const qty = cb.checked ? (parseInt(qtyInput.value) || 1) : 0;
      if (cb.checked) total += harga * qty;
    });
    document.getElementById('total-harga').textContent = total > 0 ? 'Rp' + total.toLocaleString('id-ID') : 'Rp0';
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', function() {
      const qtyInput = this.nextElementSibling;
      qtyInput.disabled = !this.checked;
      if (!this.checked) qtyInput.value = '';
      updateTotalHarga();
    });
  });
  document.querySelectorAll('.product-selection input[type="number"]').forEach(inp => {
    inp.addEventListener('input', updateTotalHarga);
  });


// Stats
  const counters = document.querySelectorAll('.count');
  counters.forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute('data-count');
      const current = +counter.innerText;
      const increment = target / 100;
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(update, 30);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });

    // WhatsApp Chat Bubble Animation - show on icon click
    document.addEventListener('DOMContentLoaded', function() {
      const bubble = document.getElementById('wa-bubble');
      const waFloat = document.getElementById('wa-chat-float');
      const waLink = waFloat.querySelector('a');
      let bubbleTimeout;

      // Show bubble on icon click
      waLink.addEventListener('click', function(e) {
        // Show bubble and prevent link for a moment
        bubble.classList.add('show');
        clearTimeout(bubbleTimeout);
        bubbleTimeout = setTimeout(() => {
          bubble.classList.remove('show');
        }, 2500);
        // Allow link to open WhatsApp after short delay
        setTimeout(() => {
          window.open(waLink.href, '_blank');
        }, 300);
        e.preventDefault();
      });

      // Hide bubble if click outside
      document.addEventListener('click', function(e) {
        if (!waFloat.contains(e.target)) {
          bubble.classList.remove('show');
        }
      });
    });

    // Toast Notification
    function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (toast) {
        toastMsg.textContent = msg;
        toast.style.display = 'flex';
        setTimeout(() => toast.style.display = 'none', 2500);
    }
}

// Ripple effect for all .ripple-btn
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('.ripple-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
          const circle = document.createElement('span');
          circle.className = 'ripple';
          const rect = btn.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          circle.style.width = circle.style.height = size + 'px';
          circle.style.left = (e.clientX - rect.left - size/2) + 'px';
          circle.style.top = (e.clientY - rect.top - size/2) + 'px';
          btn.appendChild(circle);
          setTimeout(() => circle.remove(), 600);
        });
      });
    });


//Weather Widget (real-time with OpenWeatherMap API)
    
      // Menu search filter
      document.addEventListener('DOMContentLoaded', function() {
        const searchInput = document.getElementById('menu-search');
        if (searchInput) {
          searchInput.addEventListener('input', function() {
            const keyword = this.value.toLowerCase();
            document.querySelectorAll('.menu-card').forEach(card => {
              const title = card.querySelector('.menu-card-title').textContent.toLowerCase();
              if (title.includes(keyword)) {
                card.style.display = '';
              } else {
                card.style.display = 'none';
              }
            });
          });
        }
      });

  //Parallax effect
document.addEventListener('DOMContentLoaded', function() {
    const bg = document.getElementById('parallax-bg');
    
    if (bg && window.innerWidth > 900) {
        // Fungsi tunggal agar sinkron antara scroll dan mouse
        function applyTransform(x = 0, y = 0) {
            const scrolled = window.pageYOffset;
            const scrollMove = scrolled * 0.3; // Kecepatan scroll
            
            // scale(1.3) harus lebih besar dari top/left minus di CSS tadi
            bg.style.transform = `translateY(${scrollMove}px) scale(1.3) translate(${x}px, ${y}px)`;
        }
        // Jalankan saat scroll
        window.addEventListener('scroll', () => applyTransform());

        // Jalankan saat mouse gerak (hanya desktop)
        window.addEventListener('mousemove', (e) => {
              const xMove = (e.clientX / window.innerWidth - 0.5) * 20;
              const yMove = (e.clientY / window.innerHeight - 0.5) * 20;
              applyTransform(xMove, yMove);
        });
    } else if(bg) {
        bg.style.transform = 'none';
    }
});

// Mouse move effect (desktop)
bg.addEventListener('mousemove', function(e) {
  // Kurangi angkanya (misal dari 12 jadi 5) agar gesernya halus dan tidak keluar frame
  const x = (e.clientX / window.innerWidth - 0.5) * 5; 
  const y = (e.clientY / window.innerHeight - 0.5) * 5;
  bg.style.transform = `translateY(${window.scrollY * 0.28}px) scale(1.1) translate(${x}px,${y}px)`;
});

// newsletter form responsive

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('news-email').value;
    
    // Simulasi pengiriman
    const btn = this.querySelector('.btn-subscribe');
    btn.innerHTML = 'Mengirim...';
    btn.disabled = true;

    setTimeout(() => {
        // Tampilkan pesan sukses yang interaktif
        const content = document.querySelector('.newsletter-content');
        content.innerHTML = `
            <div style="animation: fadeZoomIn 0.5s both">
                <i data-feather="gift" style="width: 50px; height: 50px; color: #c09468; margin-bottom: 1rem;"></i>
                <h3 style="color: #fff">Selamat! Kupon Kamu Aktif</h3>
                <p>Gunakan kode: <strong style="color: #c09468; font-size: 1.5rem; border: 2px dashed #c09468; padding: 5px 15px; border-radius: 10px; margin: 10px 0; display: inline-block;">KOPIKENANGAN20</strong></p>
                <p>Kode telah dikirim ke ${email}. Silahkan tunjukan saat pembayaran!</p>
            </div>
        `;
        feather.replace(); // Refresh icons
    }, 1500);
});
