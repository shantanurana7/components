/**
 * profile-card/js/main.js
 *
 * Handles:
 *  1. Mobile carousel — scroll snapping + pagination dots
 *  2. Modal open/close — per-card, precise targeting via data attributes
 */

// =============================================================================
// Data: 12 Profile Cards
// =============================================================================
const profiles = [
  {
    id: 1,
    name: "Jessie Hessel",
    location: "Tajikistan",
    status: "link-list",
    statusLabel: "Long-list",
    avatar: "https://i.pravatar.cc/150?img=47",
    message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis nec tellus ac consectetur. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque aliquam sed lacus at venenatis.\n\nAliquam sed convallis elit, scelerisque condimentum nunc. Integer vehicula magna eros, sed euismod quam blandit ac.\n\nDonec eget ante quam. Suspendisse sed pretium massa, in varius mi. Vivamus quis mattis odio. Nullam bibendum lacus et arcu ullamcorper.`
  },
  {
    id: 2,
    name: "Monica Coakley",
    location: "Iraq",
    status: "short-list",
    statusLabel: "Short-list",
    avatar: "https://i.pravatar.cc/150?img=5",
    message: `Vestibulum eget interdum erat. Aliquam ullamcorper dui turpis, Quisque aliquam sed lacus at venenatis, eget fermentum turpis consectetur sed. Suspendisse quis libero non nisl varius dignissim.\n\nVitae eu dui. Etiam ultricies massa lacus. Proin iaculis nec tellus ac consectetur. Interdum et malesuada fames ac ante ipsum primis in faucibus.\n\nQuisque aliquam sed lacus at venenatis. Aliquam sed convallis elit, scelerisque condimentum nunc.`
  },
  {
    id: 3,
    name: "Clara Brekke",
    location: "Canada",
    status: "interviewed",
    statusLabel: "Interviewed",
    avatar: "https://i.pravatar.cc/150?img=9",
    message: `Integer eget erat nec ex fermentum ullamcorper. Quisque aliquam sed lacus at venenatis. Vestibulum eget interdum erat. Aliquam ullamcorper dui turpis.\n\nSuspendisse quis libero non nisl varius dignissim vitae eu dui. Etiam ultricies massa lacus. Proin iaculis nec tellus ac consectetur.\n\nInterdum et malesuada fames ac ante ipsum primis in faucibus.`
  },
  {
    id: 4,
    name: "Rashida Okafor",
    location: "Nigeria",
    status: "to-action",
    statusLabel: "To-action",
    avatar: "https://i.pravatar.cc/150?img=16",
    message: `Donec eget ante quam. Suspendisse sed pretium massa, in varius mi. Vivamus quis mattis odio. Nullam bibendum lacus et arcu ullamcorper, a molestie diam aliquet.\n\nNullam ut nisl metus. Integer eget erat nec ex fermentum ullamcorper. Quisque aliquam sed lacus at venenatis.\n\nVestibulum eget interdum erat. Aliquam ullamcorper dui turpis consectetur sed.`
  },
  {
    id: 5,
    name: "Vicki Champlin",
    location: "Kazakhstan",
    status: "successful",
    statusLabel: "Successful",
    avatar: "https://i.pravatar.cc/150?img=32",
    message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis nec tellus ac consectetur. Interdum et malesuada fames ac ante ipsum primis in faucibus.\n\nQuisque aliquam sed lacus at venenatis. Aliquam sed convallis elit, scelerisque condimentum nunc. Integer vehicula magna eros, sed euismod quam blandit ac.\n\nAliquam ullamcorper dui turpis, Quisque aliquam sed lacus at venenatis, eget fermentum turpis consectetur sed.`
  },
  {
    id: 6,
    name: "Leo Bernstein",
    location: "Brazil",
    status: "unsuccessful",
    statusLabel: "Unsuccessful",
    avatar: "https://i.pravatar.cc/150?img=52",
    message: `Vestibulum eget interdum erat. Aliquam ullamcorper dui turpis, Quisque aliquam sed lacus at venenatis, eget fermentum turpis consectetur sed.\n\nSuspendisse quis libero non nisl varius dignissim vitae eu dui. Etiam ultricies massa lacus.\n\nProin iaculis nec tellus ac consectetur. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque aliquam sed lacus at venenatis.`
  },
  {
    id: 7,
    name: "Amara Nwosu",
    location: "Ghana",
    status: "link-list",
    statusLabel: "Long-list",
    avatar: "https://i.pravatar.cc/150?img=44",
    message: `Integer vehicula magna eros, sed euismod quam blandit ac. Donec eget ante quam. Suspendisse sed pretium massa, in varius mi.\n\nVivamus quis mattis odio. Nullam bibendum lacus et arcu ullamcorper, a molestie diam aliquet. Nullam ut nisl metus.\n\nInteger eget erat nec ex fermentum ullamcorper. Quisque aliquam sed lacus at venenatis. Vestibulum eget interdum erat.`
  },
  {
    id: 8,
    name: "Carlos Mendez",
    location: "Mexico",
    status: "short-list",
    statusLabel: "Short-list",
    avatar: "https://i.pravatar.cc/150?img=60",
    message: `Aliquam ullamcorper dui turpis, Quisque aliquam sed lacus at venenatis, eget fermentum turpis consectetur sed. Suspendisse quis libero non nisl varius dignissim.\n\nVitae eu dui. Etiam ultricies massa lacus. Proin iaculis nec tellus ac consectetur.\n\nInterdum et malesuada fames ac ante ipsum primis in faucibus. Quisque aliquam sed lacus at venenatis. Aliquam sed convallis elit.`
  },
  {
    id: 9,
    name: "Priya Sharma",
    location: "India",
    status: "interviewed",
    statusLabel: "Interviewed",
    avatar: "https://i.pravatar.cc/150?img=38",
    message: `Scelerisque condimentum nunc. Integer vehicula magna eros, sed euismod quam blandit ac. Donec eget ante quam.\n\nSuspendisse sed pretium massa, in varius mi. Vivamus quis mattis odio. Nullam bibendum lacus et arcu ullamcorper, a molestie diam aliquet.\n\nNullam ut nisl metus. Integer eget erat nec ex fermentum ullamcorper. Quisque aliquam sed lacus at venenatis.`
  },
  {
    id: 10,
    name: "Yuki Tanaka",
    location: "Japan",
    status: "to-action",
    statusLabel: "To-action",
    avatar: "https://i.pravatar.cc/150?img=10",
    message: `Vestibulum eget interdum erat. Aliquam ullamcorper dui turpis, Quisque aliquam sed lacus at venenatis, eget fermentum turpis consectetur sed.\n\nSuspendisse quis libero non nisl varius dignissim vitae eu dui. Etiam ultricies massa lacus. Proin iaculis nec tellus ac consectetur.\n\nInterdum et malesuada fames ac ante ipsum primis in faucibus. Quisque aliquam sed lacus at venenatis.`
  },
  {
    id: 11,
    name: "Fatima Al-Rashid",
    location: "Saudi Arabia",
    status: "successful",
    statusLabel: "Successful",
    avatar: "https://i.pravatar.cc/150?img=25",
    message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis nec tellus ac consectetur. Interdum et malesuada fames ac ante ipsum primis in faucibus.\n\nQuisque aliquam sed lacus at venenatis. Aliquam sed convallis elit, scelerisque condimentum nunc.\n\nInteger vehicula magna eros, sed euismod quam blandit ac. Donec eget ante quam. Suspendisse sed pretium massa.`
  },
  {
    id: 12,
    name: "James Kowalski",
    location: "Poland",
    status: "unsuccessful",
    statusLabel: "Unsuccessful",
    avatar: "https://i.pravatar.cc/150?img=70",
    message: `In varius mi. Vivamus quis mattis odio. Nullam bibendum lacus et arcu ullamcorper, a molestie diam aliquet. Nullam ut nisl metus.\n\nInteger eget erat nec ex fermentum ullamcorper. Quisque aliquam sed lacus at venenatis. Vestibulum eget interdum erat.\n\nAliquam ullamcorper dui turpis, Quisque aliquam sed lacus at venenatis, eget fermentum turpis consectetur sed.`
  }
];

// =============================================================================
// SVG Icon Helpers
// =============================================================================
const icons = {
  pin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>`,

  email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>`,

  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>`,

  close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`,

  chevron: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>`
};

// =============================================================================
// Helpers
// =============================================================================

/**
 * Converts newlines in a string to <p> wrapped paragraphs.
 * @param {string} text
 * @returns {string} HTML string
 */
function textToParagraphs(text) {
  return text
    .split('\n\n')
    .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

// =============================================================================
// Card Builder
// =============================================================================

/**
 * Creates a single profile card DOM element.
 * @param {Object} profile - profile data object
 * @returns {HTMLElement}
 */
function createCardElement(profile) {
  const item = document.createElement('div');
  item.className = 'custom-profile-section__card-item';

  const card = document.createElement('div');
  card.className = `profile-card profile-card--${profile.status}`;
  card.dataset.cardId = profile.id;

  card.innerHTML = `
    <div class="profile-card__top-row">
      <div class="profile-card__avatar-area">
        <img
          class="profile-card__avatar"
          src="${profile.avatar}"
          alt="Photo of ${profile.name}"
          loading="lazy"
          onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=C9D3F8&color=00338d&size=150'"
        />
      </div>
      <div class="profile-card__status-bar">
        <button class="profile-card__status-badge" aria-label="Status: ${profile.statusLabel}">
          <span class="profile-card__status-dot"></span>
          ${profile.statusLabel}
          ${icons.chevron}
        </button>
      </div>
    </div>

    <div class="profile-card__info">
      <h3 class="profile-card__name">${profile.name}</h3>
      <div class="profile-card__location">
        ${icons.pin}
        <span>${profile.location}</span>
      </div>
    </div>

    <div class="profile-card__actions">
      <button class="profile-card__icon-btn" title="Send email" aria-label="Send email to ${profile.name}">
        ${icons.email}
      </button>
      <button class="profile-card__icon-btn" title="LinkedIn profile" aria-label="${profile.name} LinkedIn">
        ${icons.linkedin}
      </button>

      <div class="profile-card__btn-group">
        <button
          class="profile-card__btn profile-card__btn--message"
          data-modal-open="${profile.id}"
          aria-haspopup="dialog"
          aria-controls="modal-${profile.id}"
        >
          Message
        </button>
        <button class="profile-card__btn profile-card__btn--profile">
          Profile
        </button>
      </div>
    </div>

    <div class="profile-card__bottom-border" aria-hidden="true"></div>
  `;

  item.appendChild(card);
  return item;
}

// =============================================================================
// Modal Builder
// =============================================================================

/**
 * Creates the modal DOM element for a given profile.
 * @param {Object} profile
 * @returns {HTMLElement}
 */
function createModalElement(profile) {
  const modal = document.createElement('div');
  modal.className = `profile-modal profile-modal--${profile.status}`;
  modal.id = `modal-${profile.id}`;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', `modal-name-${profile.id}`);
  modal.dataset.modalId = profile.id;

  modal.innerHTML = `
    <div class="profile-modal__overlay" data-modal-close="${profile.id}" aria-hidden="true"></div>
    <div class="profile-modal__dialog">
      <div class="profile-modal__dialog-header">
        <img
          class="profile-modal__dialog-avatar"
          src="${profile.avatar}"
          alt="Photo of ${profile.name}"
          onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=C9D3F8&color=00338d&size=150'"
        />
        <div class="profile-modal__dialog-identity">
          <h2 class="profile-modal__dialog-name" id="modal-name-${profile.id}">${profile.name}</h2>
          <div class="profile-modal__dialog-location">
            ${icons.pin}
            <span>${profile.location}</span>
          </div>
          <div class="profile-modal__dialog-icons">
            <button class="profile-modal__dialog-icon-btn" title="Send email" aria-label="Email ${profile.name}">
              ${icons.email}
            </button>
            <button class="profile-modal__dialog-icon-btn" title="LinkedIn" aria-label="${profile.name} LinkedIn">
              ${icons.linkedin}
            </button>
          </div>
        </div>
        <button
          class="profile-modal__close"
          data-modal-close="${profile.id}"
          aria-label="Close message modal"
          title="Close"
        >
          ${icons.close}
        </button>
      </div>

      <div class="profile-modal__dialog-body">
        <p class="profile-modal__message-label">Message</p>
        <div class="profile-modal__message-text">
          ${textToParagraphs(profile.message)}
        </div>
      </div>

      <div class="profile-modal__bottom-border" aria-hidden="true"></div>
    </div>
  `;

  return modal;
}

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
 * Sets up the pagination dots for mobile carousel.
 * @param {HTMLElement} grid - The grid element
 * @param {HTMLElement} paginationContainer - The dots container
 * @param {number} count - Number of cards
 */
function setupCarouselPagination(grid, paginationContainer, count) {
  // Create dots
  paginationContainer.innerHTML = '';
  const dots = [];

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('button');
    dot.className = 'custom-profile-section__dot';
    dot.setAttribute('aria-label', `Go to card ${i + 1}`);
    if (i === 0) dot.classList.add('custom-profile-section__dot--active');
    dots.push(dot);
    paginationContainer.appendChild(dot);

    // Click on dot -> scroll to that card
    dot.addEventListener('click', () => {
      const cardWidth = grid.scrollWidth / count;
      grid.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
    });
  }

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
  const pagination = section?.querySelector('.custom-profile-section__pagination');

  if (!grid || !pagination) {
    console.error('Profile card: Required DOM elements not found.');
    return;
  }

  // ---- Render cards ----
  profiles.forEach(profile => {
    const cardEl = createCardElement(profile);
    grid.appendChild(cardEl);
  });

  // ---- Render modals (appended to body for stacking context) ----
  profiles.forEach(profile => {
    const modalEl = createModalElement(profile);
    document.body.appendChild(modalEl);
  });

  // ---- Mobile pagination ----
  setupCarouselPagination(grid, pagination, profiles.length);

  // ---- Event delegation ----
  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);
});
