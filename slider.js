const slider = document.getElementById('slider');
const images = slider.querySelectorAll('img');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let index = 0;
let isPaused = false;

function showSlide(i) {
  if (i < 0) i = images.length - 1;
  if (i >= images.length) i = 0;
  slider.style.transform = `translateX(-${i * 100}%)`;
  index = i;
}

function nextSlide() {
  if (!isPaused) showSlide(index + 1);
}

let autoSlide = setInterval(nextSlide, 4000);

prev.addEventListener('click', () => showSlide(index - 1));
next.addEventListener('click', () => showSlide(index + 1));

const sliderContainer = document.getElementById('slider-container');
sliderContainer.addEventListener('mousedown', () => isPaused = true);
sliderContainer.addEventListener('mouseup', () => isPaused = false);
sliderContainer.addEventListener('mouseleave', () => isPaused = false);
