document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  hamburger?.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
  });

  // Contact Form Handling
  const form = document.getElementById("contact-form");
  const responseDiv = document.getElementById("form-response");

  if (form && responseDiv) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const action = form.getAttribute("action");

      if (!action || !action.startsWith("https://")) {
        responseDiv.textContent = "Form tidak dikonfigurasi dengan benar.";
        responseDiv.classList.add("show");
        return;
      }

      responseDiv.textContent = "Mengirim pesan...";
      responseDiv.classList.add("show");

      try {
        const response = await fetch(action, {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          responseDiv.textContent = "Pesan berhasil dikirim. Terima kasih!";
          form.reset();
        } else {
          const resJson = await response.json();
          responseDiv.textContent = resJson.message || "Terjadi kesalahan saat mengirim.";
        }
      } catch (error) {
        responseDiv.textContent = "Gagal mengirim pesan. Periksa koneksi internet Anda.";
      }
    });
  }

  // Hero Image Auto-Switch
  const heroImage = document.getElementById("hero-img");
  const heroImages = [
    "img/bgSwipe8.jpg",
    "img/bread1.jpg",
    "img/bgSwipe5.jpg",
    "img/black.jpg",
    "img/americano.jpg",
  ];
  let currentImage = 0;

  if (heroImage) {
    setInterval(() => {
      heroImage.style.opacity = 0;
      setTimeout(() => {
        currentImage = (currentImage + 1) % heroImages.length;
        heroImage.src = heroImages[currentImage];
        heroImage.style.opacity = 1;
      }, 300);
    }, 3000);
  }
});
