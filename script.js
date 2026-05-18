/* ==============================================
   AGALAR PETSHOP — SCRIPT.JS
   ============================================== */

/* ---- Elementleri seç ---- */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitBtn');

/* ---- Navbar: Scroll'da arka plan / gölge ---- */
function handleNavScroll() {
    if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/* ---- Yukarı çık butonu: görünürlük ---- */
function handleBackToTop() {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

/* ---- Aktif nav linki: scroll pozisyonuna göre ---- */
const sections   = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top    = section.offsetTop;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinkEls.forEach(el => el.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

/* Scroll event'i — tek listener ile üç işlevi çağır */
window.addEventListener('scroll', () => {
    handleNavScroll();
    handleBackToTop();
    updateActiveNavLink();
}, { passive: true });

/* ---- Hamburger menü ---- */
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

/* Nav linkine tıklanınca mobil menüyü kapat */
navLinkEls.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

/* Menü dışına tıklanınca kapat */
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    }
});

/* ---- Yukarı çık butonu: tıklama ---- */
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- Scroll animasyonları — Intersection Observer ---- */
const animateEls = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    }
);

animateEls.forEach(el => observer.observe(el));

/* ---- İletişim Formu ---- */
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    /* Zorunlu alan kontrolü */
    if (!name || !message) {
        /* Boş alanı kırmızıyla işaretle */
        if (!name)    document.getElementById('name').style.borderColor    = '#EF4444';
        if (!message) document.getElementById('message').style.borderColor = '#EF4444';
        return;
    }

    /* Butonu yükleme durumuna al */
    submitBtn.textContent = 'Gönderiliyor...';
    submitBtn.disabled    = true;

    /* Simüle edilmiş gönderim (1 sn gecikme) */
    setTimeout(() => {
        contactForm.reset();

        /* Başarı mesajını göster */
        formSuccess.classList.add('show');

        /* Butonu sıfırla */
        submitBtn.textContent = 'Mesaj Gönder →';
        submitBtn.disabled    = false;

        /* Sınır renklerini sıfırla */
        document.getElementById('name').style.borderColor    = '';
        document.getElementById('message').style.borderColor = '';

        /* 5 saniye sonra başarı mesajını gizle */
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1000);
});

/* Form inputları tekrar yazılmaya başlayınca kırmızı kenarlığı kaldır */
['name', 'phone', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('input', () => {
            el.style.borderColor = '';
        });
    }
});

/* ---- Smooth scroll: tüm iç linklere (güvence) ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
