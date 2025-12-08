// =================hamburger=================================
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





// ===================== CAROUSEL =====================

//  klasslar tartibi
let classes = [
    "hero__image",
    "hero__image-one",
    "hero__image-two",
    "hero__image-three",
    "hero__image-four",
    "hero__image-five",
    "hero__image-six"
];
const images = [
    { id: 1, url: "../image/photo_2025-12-07_12-22-42.png" },
    { id: 2, url: "../image/photo_2025-12-07_19-15-05.jpg" },
    { id: 3, url: "../image/photo_2025-12-07_19-15-04.jpg" },
    { id: 4, url: "../image/photo_2025-12-07_19-15-02.jpg" },
    { id: 5, url: "../image/photo_2025-12-07_19-15-00.jpg" },
    { id: 6, url: "../image/photo_2025-12-07_19-14-59.jpg" },
    { id: 7, url: "../image/photo_2025-12-07_19-14-57.jpg" }
];

const container = document.querySelector(".hero__images");

// Rasm chizish
function renderCarousel() {
    container.innerHTML = "";
// images degan massiv aylanb chiqvoti 
    images.forEach((img, i) => {
        const div = document.createElement("div"); //div degan elemet qoshvoti va osha div ichda image scr qoshvoti active qilib
        div.className = classes[i]; // tartib bo‘yicha joy beramiz
        if (classes[i] === "hero__image") div.classList.add("active");

        div.innerHTML = `<img src="${img.url}" alt="image ${img.id}">`;
        container.appendChild(div);//hero__images bu container ichiga div ni oxriga bola element sifatida qoshish Appendchild
    });

    // Prev/Next tugmalari qayta qo‘shiladi
    container.innerHTML += `
        <div class="prev__next">
            <div class="prev" id="prev"><i class="fa-solid fa-chevron-left"></i></div>
            <div class="next" id="next"><i class="fa-solid fa-chevron-right"></i></div>
        </div>
    `;

    document.getElementById("prev").onclick = handlePrev;
    document.getElementById("next").onclick = handleNext;
}

// Prev
function handlePrev() {
    let last = classes.pop();
    classes.unshift(last);   // Klasslar o‘ngga siljiydi
    renderCarousel();
}

// Next
function handleNext() {
    let first = classes.shift();
    classes.push(first);     // Klasslar chapga siljiydi
    renderCarousel();
}

// Sahifa yuklanganda
document.addEventListener("DOMContentLoaded", renderCarousel);



// === Counterlar ===
function animateCounter(id, target, speed = 500) {
  const el = document.getElementById(id);
  let count = 0;
  const step = Math.ceil(target / speed);

  const interval = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(interval);
    }
    el.textContent = count;
  }, 50);
}

window.addEventListener("load", () => {
  animateCounter("counterOne", 500);
  animateCounter("counterTwo", 50);
});






/* ======================================= */
        const mockTestimonials = [
            {
                quote: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
                name: "Guy Hawkins",
                details: "32 Tahun, Karyawan",
                image: "./image/user1.svg"
            },
            {
                quote: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
                name: "Brooklyn Simmons",
                details: "20 Tahun, Mahasiswa",
                image: "./image/user2.svg"
            },
            {
                quote: "Eiusmod velit ullamco labore in est sit aliqua dolor do amet sint. Nostrud laboris deserunt et excepteur ipsum reprehenderit est. Occaecat velit sunt amet.",
                name: "Najwa Shihab",
                details: "Duta Membaca",
                image: "./image/user3.svg"
            },
            {
                quote: "Tempor mollit aliqua dolore do amet sint. Laboris deserunt et excepteur ipsum reprehenderit est. Occaecat velit sunt amet. Ut sint ullamco excepteur minim.",
                name: "Leslie Alexander",
                details: "28 Tahun, Manager",
                image: "./image/user4.svg"
            },
            {
                quote: "Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
                name: "Eleanor Pena",
                details: "45 Tahun, Wirausaha",
                image: "./image/user1.svg"
            }
        ];


        /* ======================================= */
        /* SLIDER LOGIC & DATA INJECTION */
        /* ======================================= */
        document.addEventListener('DOMContentLoaded', () => {
            const list = document.querySelector('.testimonials__list');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            const dotsContainer = document.querySelector('.slider-dots');
            
            // --- 0. Mock datani HTML ga joylash ---
            function renderTestimonials() {
                list.innerHTML = mockTestimonials.map(item => `
                    <li class="testimonials__items">
                        <div class="content-wrapper">
                            <h3>${item.quote}</h3>
                            <div class="user-details-box">
                                <img src="${item.image}" alt="${item.name}">
                                <div>
                                    <h4>${item.name}</h4>
                                    <p>${item.details}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg"></div>
                        <div class="blob"></div>
                    </li>
                `).join('');
            }
            
            renderTestimonials(); 
            const totalItems = mockTestimonials.length;
            const itemsPerView = 2;
            const totalSlides = totalItems - itemsPerView + 1; 

            let currentSlide = 0;

            // --- 1. Nuqtalarni yaratish ---
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === 0) {
                    dot.classList.add('active');
                }
                dot.dataset.slideIndex = i;
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
            const dots = Array.from(dotsContainer.querySelectorAll('.dot'));

            // --- 2. Slayderni yangilash funksiyasi ---
            function updateSlider() {
                // Har bir slaydda 33.333% ga siljiymiz (1 ta elementning kengligi)
                const translateX = -(100 / 3) * currentSlide; 
                
                list.style.transform = `translateX(${translateX}%)`;
                
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
                
                prevBtn.disabled = currentSlide === 0;
                nextBtn.disabled = currentSlide === totalSlides - 1;
            }
            
            // --- 3. Navigatsiya funksiyalari ---
            function nextSlide() {
                if (currentSlide < totalSlides - 1) {
                    currentSlide++;
                    updateSlider();
                }
            }

            function prevSlide() {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlider();
                }
            }

            function goToSlide(index) {
                if (index >= 0 && index < totalSlides) {
                    currentSlide = index;
                    updateSlider();
                }
            }

            // --- 4. Event Litsenerlar va Boshlash ---
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);

            list.style.transition = 'transform 0.5s ease-in-out';
            updateSlider(); 
        });