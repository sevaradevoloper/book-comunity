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