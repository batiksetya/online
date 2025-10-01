// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');

// Toggle menu on mobile
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Mencegah event menyebar ke document
    nav.classList.toggle('active');
});

// Menutup menu saat user mengklik di luar area menu
document.addEventListener('click', (e) => {
    const isClickInsideNav = nav.contains(e.target);
    const isClickOnToggle = menuToggle.contains(e.target);
    
    if (nav.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
        nav.classList.remove('active');
    }
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Set active link on scroll dengan offset yang lebih baik untuk mobile
window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + window.innerHeight * 0.3; // Menggunakan persentase tinggi viewport
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for anchor links dengan penyesuaian untuk perangkat mobile
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // Penyesuaian offset berdasarkan ukuran layar
        const navHeight = document.querySelector('.navbar').offsetHeight;
        let additionalOffset = 0;
        
        if (window.innerWidth <= 768) {
            additionalOffset = 10; // Offset lebih kecil untuk mobile
        } else {
            additionalOffset = 20; // Offset lebih besar untuk desktop
        }
        
        const targetPosition = targetElement.offsetTop - navHeight - additionalOffset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Menangani orientasi perangkat
window.addEventListener('orientationchange', () => {
    // Setel ulang navigasi aktif setelah perubahan orientasi
    setTimeout(() => {
        const scrollEvent = new Event('scroll');
        window.dispatchEvent(scrollEvent);
    }, 300);
});

// Menangani resize window
window.addEventListener('resize', () => {
    // Jika navbar terbuka dan layar lebih besar dari 768px, tutup navbar
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
        nav.classList.remove('active');
    }
});