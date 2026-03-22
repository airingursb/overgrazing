// Slideshow engine - manages slide progression
import { publish } from './PubSub.js';

let slides = [];
let currentIndex = -1;
let container = null;

export function initSlideshow(containerEl, slideModules) {
  container = containerEl;
  slides = slideModules;
  currentIndex = -1;
}

export function getCurrentIndex() {
  return currentIndex;
}

export function getTotalSlides() {
  return slides.length;
}

export function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;

  // End current slide
  if (currentIndex >= 0 && slides[currentIndex]) {
    const currentEl = container.querySelector(`.slide[data-index="${currentIndex}"]`);
    if (currentEl) {
      currentEl.classList.remove('active');
      if (slides[currentIndex].onend) slides[currentIndex].onend(currentEl);
    }
  }

  currentIndex = index;

  // Ensure slide element exists
  let slideEl = container.querySelector(`.slide[data-index="${index}"]`);
  if (!slideEl) {
    slideEl = document.createElement('div');
    slideEl.className = 'slide';
    slideEl.dataset.index = index;

    const content = document.createElement('div');
    content.className = 'slide-content';
    slideEl.appendChild(content);
    container.appendChild(slideEl);

    // Build slide
    if (slides[index].build) {
      slides[index].build(content, slideEl);
    }
  }

  // Start new slide
  requestAnimationFrame(() => {
    slideEl.classList.add('active');
    if (slides[index].onstart) slides[index].onstart(slideEl);
    publish('slide:change', { index, slide: slides[index] });
  });
}

export function nextSlide() {
  goToSlide(currentIndex + 1);
}

export function prevSlide() {
  goToSlide(currentIndex - 1);
}
