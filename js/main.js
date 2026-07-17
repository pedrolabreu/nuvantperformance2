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
})();
