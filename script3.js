const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
const indicators = document.querySelector("#indicator");
let locked = false;

slides.forEach((_, idx) => {
  const circle = document.createElement("div");
  circle.classList.add("circle");

  if (idx === currentSlide) circle.classList.add("active");
  circle.addEventListener("click", () => {
    const transformOrigin = currentSlide > idx ? "bottom" : "top";
    const delta = idx - currentSlide;
    switchSlide(delta, transformOrigin);
  });
  indicators.appendChild(circle);
});

// Modify the switchSlide function
function switchSlide(delta, transformOrigin) {
  currentSlide += delta;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  } else if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  // Acerta indicators
  const circles = document.querySelectorAll(".indicator .circle");
  circles.forEach((circle) => {
    circle.classList.remove("active");
  });

  indicators.children[currentSlide].classList.add("active");

  showSlide(currentSlide, transformOrigin);
}

function showSlide(slideIndex, transformOrigin) {
  slides.forEach((slide, index) => {
    const slideWrapper = slide.querySelector(".slide-wrapper");

    if (index === slideIndex) {
      setSlideTransform(slideWrapper, slide, 1, 0, transformOrigin, true);
    } else {
      setSlideTransform(slideWrapper, slide, 2.1, 1, transformOrigin, false);
    }
  });
}

function handleMouseWheel(event) {
  if (!locked) {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    const transformOrigin = delta > 0 ? "bottom" : "top";
    locked = true;
    if (delta > 0) {
      switchSlide(1, transformOrigin);
    } else {
      switchSlide(-1, transformOrigin);
    }
    setTimeout(() => {
      locked = false;
    }, 600);
  }
}

function setSlideTransform(
  slideWrapper,
  slide,
  scale,
  translateY,
  transformOrigin,
  isCurrentSlide
) {
  slideWrapper.style.transition = "transform 2.8s ease, clip-path 2.2s";
  if (isCurrentSlide) {
    slideWrapper.classList.add("activeSlide");
    slideWrapper.style.clipPath = "inset(0% 0% 0% 0%)";
    slide.style.zIndex = "1";
    slideWrapper.style.transform = `scale(1) translateY(${translateY}%)`;
  } else {
    slideWrapper.classList.remove("activeSlide");
    if (transformOrigin === "top") {
      slideWrapper.style.clipPath = "inset(100% 0% 0% 0%)";
    } else {
      slideWrapper.style.clipPath = "inset(0% 0% 100% 0%)";
    }
    slide.style.zIndex = "2";
    slideWrapper.style.transform = `scale(${scale}) translateY(${translateY}%)`;
  }
  slideWrapper.style.transformOrigin = transformOrigin;
}

window.addEventListener("wheel", handleMouseWheel);
showSlide(currentSlide, "top");
