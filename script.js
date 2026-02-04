// ========================================
// MY QUEEN AZRA - DÜZELTİLMİŞ FONKSİYONLAR
// ========================================

// Global değişkenler
let noClickCount = 0;
let musicPlaying = false;
const messages = [
    "Ama Kraliçem... 🥺",
    "Lütfen Azra... 💙",
    "Affet beni... 👑",
    "Son şansım... 🙏",
    "Yalvarırım... 🌹"
];

// ========================================
// SAYFA GEÇİŞLERİ - DÜZELTİLMİŞ
// ========================================
function showPage(pageId) {
    // Tüm sayfaları gizle
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Seçilen sayfayı göster
    document.getElementById(pageId).classList.add('active');
    
    // Mavi kalp yağmuru kontrolü
    const blueHeartsContainer = document.getElementById('blueHeartsContainer');
    if (pageId === 'cards') {
        blueHeartsContainer.style.display = 'block';
    } else {
        blueHeartsContainer.style.display = 'none';
    }
}    
    // Animasyon için kısa gecikme
    requestAnimationFrame(() => {
        targetPage.classList.add('active');
    });
    
    // Sayfayı en üste kaydır
    window.scrollTo({ top: 0, behavior: 'smooth' });

// ========================================
// HAYIR BUTONU - DÜZELTİLMİŞ
// ========================================
function handleNo() {
    noClickCount++;
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const message = document.getElementById('message');
    
    if (!noBtn || !yesBtn || !message) {
        console.error('Butonlar veya mesaj elementi bulunamadı!');
        return;
    }
    
    // Buton büyütme hesaplamaları
    const scale = 1 + (noClickCount * 0.4);
    const paddingV = 18 + (noClickCount * 12);
    const paddingH = 40 + (noClickCount * 20);
    const fontSize = 20 + (noClickCount * 6);
    
    // Stilleri uygula
    noBtn.style.transform = `scale(${scale})`;
    noBtn.style.padding = `${paddingV}px ${paddingH}px`;
    noBtn.style.fontSize = `${fontSize}px`;
    noBtn.style.zIndex = '1000';
    
    // Mesaj göster
    if (noClickCount <= messages.length) {
        message.textContent = messages[noClickCount - 1];
        message.style.opacity = '1';
        message.style.animation = 'none';
        
        // Animasyonu yeniden tetikle
        void message.offsetWidth;
        message.style.animation = 'bounceIn 0.5s ease';
    }
    
    // 5. tıklamada EVET'e dönüş
    if (noClickCount >= 5) {
        noBtn.textContent = "EVET 💙";
        noBtn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
        noBtn.style.boxShadow = "0 4px 20px rgba(16, 185, 129, 0.4)";
        
        // ÖNEMLİ: onclick yerine addEventListener kullan
        noBtn.onclick = null; // Eski onclick'i temizle
        noBtn.removeEventListener('click', handleNo); // Eski listener'ı kaldır
        noBtn.addEventListener('click', handleYes); // Yeni listener ekle
        
        message.textContent = "Seçim yok Kraliçem, EVET diyorsun! 😄";
        message.style.color = "#10b781";
        
        createConfetti();
    }
    
    // EVET butonunu salla
    yesBtn.style.animation = 'none';
    void yesBtn.offsetWidth;
    yesBtn.style.animation = "shake 0.5s ease";
    
    setTimeout(() => {
        yesBtn.style.animation = "";
    }, 500);
    
    createPetalBurst();
}

// ========================================
// EVET BUTONU - DÜZELTİLMİŞ
// ========================================
function handleYes() {
    createMassiveConfetti();
    
    const message = document.getElementById('message');
    if (message) {
        message.textContent = "TEŞEKKÜRLER KRALİÇEM! 👑💙";
        message.style.color = "#10b781";
        message.style.fontSize = "32px";
        message.style.textShadow = "0 0 20px rgba(16, 185, 129, 0.5)";
    }
    
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    // Butonları gizle
    if (yesBtn) {
        yesBtn.style.display = 'none';
        yesBtn.disabled = true;
    }
    if (noBtn) {
        noBtn.style.display = 'none';
        noBtn.disabled = true;
    }
    
    createHeartRain();
    
    // 2.5 saniye sonra kartlar sayfasına git
    setTimeout(() => {
        showPage('cards');
    }, 2500);
}

// ========================================
// ANİMASYON STİLLERİ
// ========================================
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-15px) rotate(-5deg); }
        75% { transform: translateX(15px) rotate(5deg); }
    }
    
    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 1;
        }
        25% {
            transform: translateY(25vh) rotate(90deg) translateX(20px);
        }
        50% {
            transform: translateY(50vh) rotate(180deg) translateX(-20px);
        }
        75% {
            transform: translateY(75vh) rotate(270deg) translateX(15px);
            opacity: 0.8;
        }
        100% {
            transform: translateY(100vh) rotate(360deg) translateX(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(shakeStyle);

// ========================================
// GÜL YAPRAĞI PATLAMASI
// ========================================
function createPetalBurst() {
    const container = document.querySelector('.rose-petals-container');
    if (!container) return;
    
    for (let i = 0; i < 10; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = Math.random() > 0.5 ? '🌹' : '🥀';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.top = '-50px';
        petal.style.fontSize = (Math.random() * 15 + 20) + 'px';
        petal.style.animationDuration = (Math.random() * 3 + 5) + 's';
        petal.style.animationDelay = '0s';
        petal.style.position = 'absolute';
        petal.style.pointerEvents = 'none';
        
        container.appendChild(petal);
        
        setTimeout(() => {
            if (petal.parentNode) petal.remove();
        }, 8000);
    }
}

// ========================================
// KONFETİ EFEKTİ
// ========================================
function createConfetti() {
    const canvas = document.getElementById('confetti');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#fbbf24', '#1e3a8a', '#10b981', '#f43f5e', '#ffffff', '#60a5fa'];
    
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            vx: Math.random() * 4 - 2,
            vy: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 10 + 5,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 4 - 2
        });
    }
    
    let animationId;
    let startTime = Date.now();
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            ctx.restore();
            
            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        });
        
        // 4 saniye sonra durdur
        if (Date.now() - startTime < 4000) {
            animationId = requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animate();
}

// ========================================
// BÜYÜK KONFETİ PATLAMASI
// ========================================
function createMassiveConfetti() {
    const canvas = document.getElementById('confetti');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#fbbf24', '#1e3a8a', '#10b981', '#f43f5e', '#ffffff', '#60a5fa', '#f59e0b'];
    const shapes = ['square', 'circle', 'heart'];
    
    for (let i = 0; i < 200; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            vx: Math.random() * 6 - 3,
            vy: Math.random() * 5 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 12 + 8,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 6 - 3,
            shape: shapes[Math.floor(Math.random() * shapes.length)]
        });
    }
    
    let animationId;
    let startTime = Date.now();
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            
            if (p.shape === 'square') {
                ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            } else if (p.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, p.size/2, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.shape === 'heart') {
                ctx.font = `${p.size}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('💙', 0, 0);
            }
            
            ctx.restore();
            
            if (p.y > canvas.height) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
        });
        
        // 5 saniye sonra durdur
        if (Date.now() - startTime < 5000) {
            animationId = requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animate();
}

// ========================================
// KALP YAĞMURU
// ========================================
function createHeartRain() {
    const container = document.querySelector('.rose-petals-container');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '💙';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-50px';
            heart.style.fontSize = (Math.random() * 20 + 25) + 'px';
            heart.style.animation = `fall ${Math.random() * 3 + 4}s linear forwards`;
            heart.style.zIndex = '1000';
            heart.style.filter = 'drop-shadow(0 0 10px #3b82f6)';
            heart.style.pointerEvents = 'none';
            
            container.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) heart.remove();
            }, 7000);
        }, i * 100);
    }
}

// ========================================
// MÜZİK FONKSİYONLARI
// ========================================
function toggleMusic() {
    const audio = document.getElementById('audioPlayer');
    const btn = document.querySelector('.btn-music');
    
    if (!audio || !btn) {
        console.error("Audio elementi veya buton bulunamadı!");
        return;
    }
    
    console.log("Müzik butonuna tıklandı! Mevcut durum:", musicPlaying);
    
    if (!musicPlaying) {
        audio.volume = 0.5;
        
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                btn.textContent = '⏸ Müziği Durdur';
                btn.classList.add('playing');
                musicPlaying = true;
                console.log("Müzik çalıyor!");
            }).catch(e => {
                console.error("Ses açılamadı:", e);
                alert("Ses açmak için siteye izin vermelisiniz! Lütfen adres çubuğundaki kilit ikonuna tıklayıp ses iznini açın.");
            });
        }
    } else {
        audio.pause();
        btn.textContent = '🎵 Let It Happen - Dinle';
        btn.classList.remove('playing');
        musicPlaying = false;
        console.log("Müzik durdu!");
    }
}

function pauseMusic() {
    if (musicPlaying) {
        toggleMusic();
    }
}

// ========================================
// BAŞLANGIÇ VE EVENT LISTENERS
// ========================================

// Pencere boyutu değiştiğinde
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// DOM yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM yüklendi, başlatılıyor...');
    
    // İlk sayfayı göster
    showPage('landing');
    
    // Periyodik gül yaprağı efekti
    setInterval(() => {
        if (Math.random() > 0.7) {
            createPetalBurst();
        }
    }, 3000);
    
    // Kartları gözlemle (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Kartları seç ve gözlemle
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Buton event listener'ları
    const musicBtn = document.querySelector('.btn-music');
    if (musicBtn) {
        musicBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMusic();
        });
    }
    
    const yesBtn = document.getElementById('yesBtn');
    if (yesBtn) {
        yesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleYes();
        });
    }
    
    const noBtn = document.getElementById('noBtn');
    if (noBtn) {
        noBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleNo();
        });
    }
    
    console.log('Event listenerlar eklendi');
});
