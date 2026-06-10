/**
 * profile-card/js/main.js
 *
 * Handles interactivity only:
 *  1. Modal open/close — per-card, precise targeting via data attributes
 *  2. Mobile carousel — scroll snapping + pagination dots
 *
 * All HTML (cards, modals, dots) is static in index.html.
 */

// =============================================================================
// Modal Controller
// =============================================================================
const ModalController = (() => {
  /** @type {HTMLElement|null} Currently open modal */
  let activeModal = null;
  /** @type {HTMLElement|null} Element that triggered the modal (for focus return) */
  let triggerElement = null;

  /**
   * Opens the modal with the given profile id.
   * @param {string|number} id
   * @param {HTMLElement} [trigger]
   */
  function open(id, trigger) {
    const modal = document.getElementById(`modal-${id}`);
    if (!modal) return;

    // Close any already-open modal silently first
    if (activeModal && activeModal !== modal) {
      activeModal.classList.remove('profile-modal--open');
    }

    activeModal = modal;
    triggerElement = trigger || null;

    modal.classList.add('profile-modal--open');
    document.body.style.overflow = 'hidden';

    // Focus the dialog for accessibility
    const dialog = modal.querySelector('.profile-modal__dialog');
    if (dialog) {
      dialog.setAttribute('tabindex', '-1');
      dialog.focus({ preventScroll: true });
    }
  }

  /**
   * Closes the modal with the given profile id.
   * @param {string|number} id
   */
  function close(id) {
    const modal = document.getElementById(`modal-${id}`);
    if (!modal) return;

    modal.classList.remove('profile-modal--open');
    document.body.style.overflow = '';

    if (activeModal === modal) {
      activeModal = null;
    }

    // Return focus to trigger
    if (triggerElement) {
      triggerElement.focus();
      triggerElement = null;
    }
  }

  /**
   * Closes any currently open modal.
   */
  function closeActive() {
    if (activeModal) {
      const id = activeModal.dataset.modalId;
      close(id);
    }
  }

  return { open, close, closeActive };
})();

// =============================================================================
// Mobile Carousel Pagination
// =============================================================================

/**
 * Wires up the pre-rendered pagination dots for mobile carousel.
 * @param {HTMLElement} grid - The grid element
 * @param {NodeListOf<HTMLElement>} dots - The pre-rendered dot buttons
 */
function setupCarouselPagination(grid, dots) {
  const count = dots.length;

  dots.forEach((dot, i) => {
    // Click on dot -> scroll to that card
    dot.addEventListener('click', () => {
      const cardWidth = grid.scrollWidth / count;
      grid.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
    });
  });

  // Update active dot on scroll
  let scrollTimeout;
  grid.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const cardWidth = grid.scrollWidth / count;
      const currentIndex = Math.round(grid.scrollLeft / cardWidth);

      dots.forEach((d, idx) => {
        d.classList.toggle(
          'custom-profile-section__dot--active',
          idx === currentIndex
        );
      });
    }, 60);
  }, { passive: true });
}

// =============================================================================
// Global Event Listeners
// =============================================================================

/**
 * Handles all click events via event delegation.
 * @param {MouseEvent} e
 */
function handleClick(e) {
  const target = e.target;

  // Open modal: [data-modal-open]
  const openTrigger = target.closest('[data-modal-open]');
  if (openTrigger) {
    const id = openTrigger.dataset.modalOpen;
    ModalController.open(id, openTrigger);
    return;
  }

  // Close modal: [data-modal-close] (overlay or close button)
  const closeTrigger = target.closest('[data-modal-close]');
  if (closeTrigger) {
    const id = closeTrigger.dataset.modalClose;
    ModalController.close(id);
    return;
  }
}

/**
 * Handles keyboard events (Escape closes modal).
 * @param {KeyboardEvent} e
 */
function handleKeydown(e) {
  if (e.key === 'Escape') {
    ModalController.closeActive();
  }
}

// =============================================================================
// Initialisation
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.custom-profile-section');
  const grid = section?.querySelector('.custom-profile-section__grid');
  const dots = section?.querySelectorAll('.custom-profile-section__dot');

  if (!grid || !dots?.length) {
    console.error('Profile card: Required DOM elements not found.');
    return;
  }

  // ---- Wire up mobile carousel pagination dots ----
  setupCarouselPagination(grid, dots);

  // ---- Event delegation for modal open/close ----
  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);
});
