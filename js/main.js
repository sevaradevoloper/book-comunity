// main.js

// 1. 🍔 HAMBURGER MENYU FUNKSIYASI
const menu = document.getElementById("menuHamburger");
const hamburger = document.getElementById("hamburger");

if (menu && hamburger) {
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("open");
    menu.classList.toggle("open");
  });
  
  document.querySelectorAll(".menu__link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      menu.classList.remove("open");
    });
  });
}

// ==========================================================
// 2. 🖼️ KARUSEL (SLIDER) FUNKSIYASI
// 📚 RASMLAR UCHUN MOCK DATA
// 🔥 DIQQAT: Agar ishlamasa, `./image/` qismini `../image/` ga o'zgartirib ko'ring!
const bookImages = [
    { id: 1, url: "./image/photo_2025-12-07_12-25-22-Photoroom.png", className: "hero__image" }, // Markaziy rasm
    { id: 2, url: "./image/photo_2025-12-07_12-22-34.png", className: "hero__image-one" },
    { id: 3, url: "./image/photo_2025-12-07_12-22-37.png", className: "hero__image-two" },
    { id: 4, url: "./image/photo_2025-12-07_12-22-39.png", className: "hero__image-three" },
    { id: 5, url: "./image/photo_2025-12-07_12-22-44.png", className: "hero__image-four" },
    { id: 6, url: "./image/photo_2025-12-07_12-22-42.png", className: "hero__image-five" },
    { id: 7, url: "./image/photo_2025-12-07_12-25-20-Photoroom.png", className: "hero__image-six" }
];

const imageContainer = document.querySelector('.hero__images');

const handlePrevClick = () => updateCarousel(1);  // Prev
const handleNextClick = () => updateCarousel(-1); // Next

function setupEventListeners() {
    const currentPrevBtn = document.getElementById('prev');
    const currentNextBtn = document.getElementById('next');
    
    if (currentPrevBtn && currentNextBtn) {
        currentPrevBtn.removeEventListener('click', handlePrevClick);
        currentNextBtn.removeEventListener('click', handleNextClick);
        
        currentPrevBtn.addEventListener('click', handlePrevClick);
        currentNextBtn.addEventListener('click', handleNextClick);
    }
}

/**
 * Rasmlar ro'yxatini aylantirish va DOMni yangilash (Slicing usuli)
 */
function updateCarousel(offset) {
    
    if (offset !== 0) {
        if (offset === 1) { // Prev (O'ngdan chapga)
            const last = bookImages.slice(-1); 
            const rest = bookImages.slice(0, -1);
            bookImages.splice(0, bookImages.length, ...last, ...rest);
        } 
        else if (offset === -1) { // Next (Chapdan o'ngga)
            const first = bookImages.slice(0, 1);
            const rest = bookImages.slice(1);
            bookImages.splice(0, bookImages.length, ...rest, ...first);
        }
    }

    // 2. DOM'ni yangilash
    if (!imageContainer) return;
    imageContainer.innerHTML = '';
    
    bookImages.forEach(image => {
        const div = document.createElement('div');
        div.className = image.className; 
        
        if (image.className === 'hero__image') {
            div.classList.add('active');
        }

        div.innerHTML = `<img src="${image.url}" alt="Book Cover ${image.id}">`;
        imageContainer.appendChild(div);
    });
    
    // 3. Prev/Next tugmalarini ID bilan qayta qo'shish
    const prevNextDiv = document.createElement('div');
    prevNextDiv.className = 'prev__next';
    prevNextDiv.innerHTML = `
        <div class="prev" id="prev"><i class="fa-solid fa-chevron-left"></i></div>
        <div class="next" id="next"><i class="fa-solid fa-chevron-right"></i></div>
    `;
    imageContainer.appendChild(prevNextDiv);

    // 4. Tugmalarga event listenerlarni qayta ulash
    setupEventListeners();
}

document.addEventListener('DOMContentLoaded', () => {
    if(imageContainer) {
        updateCarousel(0); // Boshlang'ich render
    }
});