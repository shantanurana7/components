# Profile Card Component

A responsive, accessible **profile card grid** built with vanilla HTML, CSS (compiled from SCSS), and JavaScript — no external libraries or frameworks.

![Profile Card Preview](https://via.placeholder.com/900x300/f0f2f8/00338d?text=Profile+Card+Component)

---

## ✨ Features

- **Responsive grid** — 3 columns on desktop, 2 on tablet, 1 on mobile
- **Horizontal carousel** on mobile with snap-scroll and animated pagination dots
- **12 candidate cards** with 6 status types, each colour-coded
- **Per-card message modal** — clicking *Message* opens the exact card's modal
- **BEM SCSS** — fully maintainable with partials for colours, typography, and breakpoints
- **No external dependencies** — zero runtime libraries; just HTML + CSS + JS
- **Accessible** — ARIA roles, keyboard (Escape) dismiss, focus management

---

## 📁 Project Structure

```
profile-card/
├── index.html              ← Entry point
├── css/
│   └── main.css            ← Compiled CSS (from SCSS)
├── js/
│   └── main.js             ← All logic (cards, modals, carousel)
├── scss/
│   ├── main.scss           ← Root SCSS — imports partials, builds BEM styles
│   └── partials/
│       ├── _colors.scss    ← All colour tokens & $status-colors map
│       ├── _typography.scss← Font tokens
│       └── _breakpoints.scss ← Responsive mixins (mobile / tablet / desktop)
├── scripts/
│   └── build.js            ← Build script — outputs dist/ with 3 flat files
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16+

### Install

```bash
npm install
```

### Development

Compile SCSS once:

```bash
npm run sass:build
```

Watch SCSS for changes (live compile):

```bash
npm run sass:watch
```

Then open `index.html` directly in your browser — no dev server needed.

---

## 📦 Build for Distribution

To package the component into a self-contained **`dist/`** folder containing exactly three files:

```bash
npm run build
```

Output:

```
dist/
├── index.html   ← ready to open in any browser
├── main.css     ← minified, compiled CSS
└── main.js      ← component logic
```

Share the `dist/` folder as-is — no build tooling required on the receiving end.

---

## 🎨 Status Types & Colours

| Status Class | Label | Colour |
|---|---|---|
| `profile-card--to-action` | To-action | `#00338d` |
| `profile-card--successful` | Successful | `#269924` |
| `profile-card--unsuccessful` | Unsuccessful | `#ED2124` |
| `profile-card--link-list` | Long-list | `#FD349C` |
| `profile-card--short-list` | Short-list | `#00C0AE` |
| `profile-card--interviewed` | Interviewed | `#7213EA` |

Each status affects:
- The **coloured dot** inside the status badge
- The **bottom border** strip on the card
- The **bottom border** strip on the modal

---

## 🗂️ SCSS Architecture (BEM)

All styles are namespaced under `.custom-profile-section` (root) and `.profile-card` / `.profile-modal` (standalone blocks).

```
.custom-profile-section          ← root; max-width 1120px
  ├── __header
  ├── __grid-wrapper
  ├── __grid                     ← CSS Grid (3 / 2 / 1 col)
  ├── __card-item
  ├── __pagination
  └── __dot / __dot--active

.profile-card
  ├── __top-row                  ← avatar (left) + status badge (right)
  ├── __avatar-area / __avatar
  ├── __status-bar / __status-badge / __status-dot
  ├── __info / __name / __location
  ├── __actions / __icon-btn / __btn-group
  ├── __btn / __btn--message / __btn--profile
  └── __bottom-border
  Modifiers: --to-action | --successful | --unsuccessful | --link-list | --short-list | --interviewed

.profile-modal
  ├── __overlay
  ├── __dialog
  │   ├── __dialog-header
  │   │   ├── __dialog-avatar
  │   │   ├── __dialog-identity / __dialog-name / __dialog-location / __dialog-icons
  │   │   └── __close
  │   ├── __dialog-body / __message-label / __message-text
  │   └── __bottom-border
  Modifiers: same status set as .profile-card
```

---

## 📐 Responsive Behaviour

| Viewport | Grid | Row limit | Extra cards |
|---|---|---|---|
| Desktop (≥ 900px) | 3 columns | 2 rows | vertical scroll inside grid |
| Tablet (481–899px) | 2 columns | 2 rows | vertical scroll inside grid |
| Mobile (≤ 480px) | 1 column | — | horizontal carousel + pagination dots |

---

## 🧩 Adding a New Card

Edit the `profiles` array in `js/main.js`:

```js
{
  id: 13,
  name: "Jane Doe",
  location: "Australia",
  status: "short-list",        // one of the 6 status keys
  statusLabel: "Short-list",
  avatar: "https://...",
  message: `Your message text here.`
}
```

The card and its modal are generated automatically.

---

## 📜 License

MIT © Shantanu Rana
