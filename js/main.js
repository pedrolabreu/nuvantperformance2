/**
 * Nuvant Performance — Landing Page
 * Modal de contato e handlers de UI.
 */
(function () {
  'use strict';

  const modal = document.getElementById('contactModal');
  const openTriggers = document.querySelectorAll('[data-open-modal]');
  const closeTriggers = document.querySelectorAll('[data-close-modal]');
  const contactForm = document.getElementById('contactForm');

  function openContactModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeContactModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openTriggers.forEach((el) => el.addEventListener('click', openContactModal));
  closeTriggers.forEach((el) => el.addEventListener('click', closeContactModal));

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeContactModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeContactModal();
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      // TODO: conectar a um webhook/n8n antes de publicar.
      alert('Formulário de exemplo — conectar a um webhook/n8n antes de publicar.');
      closeContactModal();
      contactForm.reset();
    });
  }

  initDraggableMarquee();

  function initDraggableMarquee() {
    const marquee = document.querySelector('.marquee');
    const track = document.querySelector('.marquee-track');
    if (!marquee || !track) return;

    const SPEED = 40; // px por segundo do auto-scroll
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let sequenceWidth = 0;
    let position = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartPosition = 0;
    let lastTimestamp = null;

    function measure() {
      sequenceWidth = track.scrollWidth / 2;
    }

    function wrap(pos) {
      if (!sequenceWidth) return pos;
      let p = pos % sequenceWidth;
      if (p > 0) p -= sequenceWidth;
      return p;
    }

    function applyTransform() {
      track.style.transform = `translateX(${position}px)`;
    }

    function frame(timestamp) {
      if (!isDragging) {
        if (lastTimestamp !== null && !reduceMotion) {
          const dt = (timestamp - lastTimestamp) / 1000;
          position = wrap(position - SPEED * dt);
          applyTransform();
        }
        lastTimestamp = timestamp;
      } else {
        lastTimestamp = null;
      }
      requestAnimationFrame(frame);
    }

    function onPointerDown(event) {
      isDragging = true;
      marquee.classList.add('dragging');
      dragStartX = event.clientX;
      dragStartPosition = position;
      marquee.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event) {
      if (!isDragging) return;
      position = wrap(dragStartPosition + (event.clientX - dragStartX));
      applyTransform();
    }

    function endDrag() {
      isDragging = false;
      marquee.classList.remove('dragging');
    }

    marquee.addEventListener('pointerdown', onPointerDown);
    marquee.addEventListener('pointermove', onPointerMove);
    marquee.addEventListener('pointerup', endDrag);
    marquee.addEventListener('pointercancel', endDrag);
    marquee.addEventListener('pointerleave', endDrag);
    marquee.addEventListener('dragstart', (event) => event.preventDefault());

    window.addEventListener('resize', measure);

    measure();
    requestAnimationFrame(frame);
  }
})();
