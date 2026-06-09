/**
 * scripts/build.js
 *
 * Packages the profile-card component into a self-contained dist/ folder
 * containing exactly three files:
 *
 *   dist/
 *   ├── index.html   (asset paths rewritten to flat structure)
 *   ├── main.css     (compiled from SCSS)
 *   └── main.js
 *
 * Usage:
 *   npm run build
 */

import { execSync }  from 'child_process';
import { mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve('.');            // project root
const DIST = join(ROOT, 'dist');      // output folder

// ─── 1. Clean & recreate dist/ ────────────────────────────────────────────────
console.log('🧹  Cleaning dist/…');
rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

// ─── 2. Compile SCSS → CSS (compressed for distribution) ──────────────────────
console.log('🎨  Compiling SCSS…');
try {
  execSync(
    'npx sass scss/main.scss css/main.css --style=compressed --no-source-map',
    { cwd: ROOT, stdio: 'inherit' }
  );
} catch (err) {
  console.error('❌  SCSS compilation failed:', err.message);
  process.exit(1);
}

// ─── 3. Copy CSS ──────────────────────────────────────────────────────────────
console.log('📋  Copying main.css…');
copyFileSync(join(ROOT, 'css', 'main.css'), join(DIST, 'main.css'));

// ─── 4. Copy JS ───────────────────────────────────────────────────────────────
console.log('📋  Copying main.js…');
copyFileSync(join(ROOT, 'js', 'main.js'), join(DIST, 'main.js'));

// ─── 5. Rewrite HTML asset paths & copy ───────────────────────────────────────
console.log('📋  Rewriting & copying index.html…');
let html = readFileSync(join(ROOT, 'index.html'), 'utf8');

// Rewrite stylesheet link: css/main.css → main.css
html = html.replace(
  /href="css\/main\.css"/g,
  'href="main.css"'
);

// Rewrite script src: js/main.js → main.js
html = html.replace(
  /src="js\/main\.js"/g,
  'src="main.js"'
);

writeFileSync(join(DIST, 'index.html'), html, 'utf8');

// ─── 6. Done ─────────────────────────────────────────────────────────────────
console.log('\n✅  Build complete!  dist/ contains:');
console.log('    📄 index.html');
console.log('    🎨 main.css');
console.log('    ⚡ main.js');
console.log('\n    Share the dist/ folder — it is self-contained and needs no build tool.\n');
