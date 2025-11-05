// Robust multi-slideshow script — stops at first/last slide and hides arrows safely.
const slideshows = {};

// Initialize each slideshow
document.querySelectorAll('.slideshow-container').forEach(slideshow => {
  // ensure the slideshow has an id — if not, generate a unique one
  if (!slideshow.id) slideshow.id = 'slideshow-' + Math.random().toString(36).slice(2,9);
  slideshows[slideshow.id] = { index: 1 };
  showSlide(slideshows[slideshow.id].index, slideshow.id);
});

function changeSlide(n, id) {
  // guard: exist
  if (!slideshows[id]) return;
  slideshows[id].index += n;
  showSlide(slideshows[id].index, id);
}

function showSlide(n, id) {
  const container = document.getElementById(id);
  if (!container) return;

  const slides = container.querySelectorAll('.slide');
  const prev = container.querySelector('.prev');
  const next = container.querySelector('.next');

  if (!slides || slides.length === 0) return;

  // Clamp the slide index between 1 and the number of slides
  if (n < 1) slideshows[id].index = 1;
  else if (n > slides.length) slideshows[id].index = slides.length;
  else slideshows[id].index = n;

  // Hide all slides
  slides.forEach(slide => slide.style.display = 'none');

  // Show the current slide
  const current = slides[slideshows[id].index - 1];
  if (current) current.style.display = 'block';

  // Safely show/hide prev/next buttons (only if they exist)
  if (prev) {
    if (slideshows[id].index === 1) {
      prev.style.display = 'none';
      prev.setAttribute('aria-hidden', 'true');
      prev.style.pointerEvents = 'none';
    } else {
      prev.style.display = ''; // reset to CSS default
      prev.removeAttribute('aria-hidden');
      prev.style.pointerEvents = '';
    }
  }
  if (next) {
    if (slideshows[id].index === slides.length) {
      next.style.display = 'none';
      next.setAttribute('aria-hidden', 'true');
      next.style.pointerEvents = 'none';
    } else {
      next.style.display = ''; // reset
      next.removeAttribute('aria-hidden');
      next.style.pointerEvents = '';
    }
  }
}
