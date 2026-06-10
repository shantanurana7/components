/**
 * profile-card/js/main.js
 *
 * Handles interactivity only:
 *  1. Modal open/close — per-card, precise targeting via data attributes
 *  2. Mobile carousel — scroll snapping + pagination dots
 *  3. Status dropdown — updates card modifier class + CSS color variable on change
 *  4. Profile count — live heading counter
 */

// =============================================================================
// Status color map  (must match $status-colors in _colors.scss)
// =============================================================================
const STATUS_COLORS = {
  'link-list':    '#FD349C',   // pink
  'short-list':   '#00C0AE',   // teal
  'interviewed':  '#7213EA',   // purple
  'to-action':    '#00338d',   // primary blue
  'successful':   '#269924',   // green
  'unsuccessful': '#ED2124',   // red
};

/** All possible status modifier class names */
const STATUS_CLASSES = Object.keys(STATUS_COLORS).map(k => `profile-card--${k}`);

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
// Status Dropdown
// =============================================================================

/**
 * Applies the selected status to a card:
 *  - Swaps the profile-card--<status> modifier class on the card root
 *  - Sets the --status-color CSS custom property on the status-bar wrapper
 *    (drives the ::before coloured dot)
 * @param {HTMLSelectElement} select
 */
function applyStatus(select) {
  const newStatus = select.value;
  const card = select.closest('.profile-card');
  const statusBar = select.closest('.profile-card__status-bar');

  if (!card || !statusBar) return;

  // Swap modifier class
  STATUS_CLASSES.forEach(cls => card.classList.remove(cls));
  card.classList.add(`profile-card--${newStatus}`);

  // Update the CSS custom property so ::before dot + ::after arrow reflect the color
  const color = STATUS_COLORS[newStatus] || '';
  statusBar.style.setProperty('--status-color', color);
}

/**
 * Initialise all status selects: set initial color and wire up change listener.
 */
function initStatusSelects() {
  document.querySelectorAll('[data-status-select]').forEach(select => {
    // Apply the initial color from the pre-selected option
    applyStatus(select);

    select.addEventListener('change', () => {
      applyStatus(select);
    });
  });
}

// =============================================================================
// Profile Count
// =============================================================================

/**
 * Updates the heading counter to reflect total cards in the grid.
 */
function updateProfileCount() {
  const countEl = document.getElementById('profile-count');
  if (!countEl) return;

  const cards = document.querySelectorAll('.custom-profile-section__card-item');
  const n = cards.length;
  countEl.textContent = n > 0 ? `\u00a0(${n})` : '';   // \u00a0 = non-breaking space
}

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

  // ---- Update heading profile count ----
  updateProfileCount();

  // ---- Initialise status select dropdowns ----
  initStatusSelects();

  // ---- Wire up mobile carousel pagination dots ----
  setupCarouselPagination(grid, dots);

  // ---- Event delegation for modal open/close ----
  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);
});
