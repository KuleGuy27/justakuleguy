document.addEventListener('DOMContentLoaded', function () {
  // Grabs every image inside <article> (main post images + slideshow images)
  const images = Array.from(document.querySelectorAll('article img'));
  if (images.length === 0) return;

  let currentIndex = 0;
  let isZoomed = false;
  let isDragging = false;
  let dragMoved = false;
  let offsetX = 0;
  let offsetY = 0;
  let startX = 0;
  let startY = 0;
  let startOffsetX = 0;
  let startOffsetY = 0;

  // Build the overlay once and append it to the page
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <span class="lightbox-close" aria-label="Close">&times;</span>
    <span class="lightbox-prev" aria-label="Previous">&#10094;</span>
    <img class="lightbox-content" src="" alt="">
    <span class="lightbox-next" aria-label="Next">&#10095;</span>
    <div class="lightbox-counter"></div>
    <div class="lightbox-thumbs"></div>
  `;
  document.body.appendChild(overlay);

  const lightboxImg = overlay.querySelector('.lightbox-content');
  const closeBtn = overlay.querySelector('.lightbox-close');
  const prevBtn = overlay.querySelector('.lightbox-prev');
  const nextBtn = overlay.querySelector('.lightbox-next');
  const counter = overlay.querySelector('.lightbox-counter');
  const thumbsContainer = overlay.querySelector('.lightbox-thumbs');

  // Build one thumbnail per image, once
  const thumbEls = images.map((img, i) => {
    const thumb = document.createElement('img');
    thumb.src = img.src;
    thumb.alt = img.alt || '';
    thumb.addEventListener('click', () => showImage(i));
    thumbsContainer.appendChild(thumb);
    return thumb;
  });

  function setZoom(zoomed) {
    isZoomed = zoomed;
    offsetX = 0;
    offsetY = 0;
    lightboxImg.classList.toggle('zoomed', isZoomed);
    lightboxImg.style.transform = isZoomed ? 'translate(0px, 0px) scale(2)' : '';
  }

  function clampNum(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  function getMaxOffsets() {
    const scaledWidth = lightboxImg.offsetWidth * 2;
    const scaledHeight = lightboxImg.offsetHeight * 2;
    return {
      maxX: Math.max(0, (scaledWidth - window.innerWidth) / 2),
      maxY: Math.max(0, (scaledHeight - window.innerHeight) / 2)
    };
  }

  function panTo(clientX, clientY) {
    const dx = clientX - startX;
    const dy = clientY - startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragMoved = true;
    const { maxX, maxY } = getMaxOffsets();
    offsetX = clampNum(startOffsetX + dx, -maxX, maxX);
    offsetY = clampNum(startOffsetY + dy, -maxY, maxY);
    lightboxImg.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(2)`;
  }

  function startDrag(clientX, clientY) {
    if (!isZoomed) return;
    isDragging = true;
    dragMoved = false;
    startX = clientX;
    startY = clientY;
    startOffsetX = offsetX;
    startOffsetY = offsetY;
    lightboxImg.classList.add('dragging');
    lightboxImg.style.transition = 'none'; // no lag while actively dragging
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    lightboxImg.classList.remove('dragging');
    lightboxImg.style.transition = ''; // restore smooth transition for zoom toggles
  }

  function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt || '';
    counter.textContent = (currentIndex + 1) + ' / ' + images.length;
    setZoom(false); // reset zoom on every image change

    thumbEls.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === currentIndex);
    });
    thumbEls[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  function openLightbox(index) {
    showImage(index);
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // stop background scroll
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    setZoom(false);
  }

  // Open on click of any article image
  images.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox(i));
  });

  // Controls
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
  nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

  // Click the image to zoom in; click again to zoom out (unless it was a drag)
  lightboxImg.addEventListener('click', function (e) {
    e.stopPropagation(); // don't let this bubble up and close the lightbox
    if (dragMoved) {
      dragMoved = false;
      return;
    }
    setZoom(!isZoomed);
  });

  // Prevent the browser's native "ghost image" drag
  lightboxImg.addEventListener('dragstart', function (e) {
    e.preventDefault();
  });

  // Mouse dragging (desktop)
  lightboxImg.addEventListener('mousedown', function (e) {
    if (!isZoomed) return;
    startDrag(e.clientX, e.clientY);
    e.preventDefault();
  });

  document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    panTo(e.clientX, e.clientY);
  });

  document.addEventListener('mouseup', endDrag);

  // Touch dragging (mobile)
  lightboxImg.addEventListener('touchstart', function (e) {
    if (!isZoomed || e.touches.length !== 1) return;
    startDrag(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  lightboxImg.addEventListener('touchmove', function (e) {
    if (!isDragging || e.touches.length !== 1) return;
    e.preventDefault(); // stop the page from scrolling while panning
    panTo(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });

  lightboxImg.addEventListener('touchend', endDrag);

  // Click outside the image (on the dark backdrop) closes it
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  // Keyboard support: Esc to close, arrows to navigate
  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
});
