/* ============================================================
   ZigoDev — Scroll Experience · js/app.js
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

// ── CONFIG ──────────────────────────────────────────────────
const FRAME_COUNT  = 240;
const FRAME_EXT    = 'jpg';
const FRAME_PATH   = 'frames/frame_';
const FRAME_SPEED  = 2.0;   // 1.8–2.2
const PRELOAD_FAST = 10;    // frames to load before showing site

// Dark overlay range (0–1 scroll progress)
const OVERLAY_ENTER = 0.47;  // overlay enters & stays BLACK permanently
const OVERLAY_LEAVE = 0.64;  // kept for counter ref only

// Marquee range
const MARQUEE_ENTER = 0.22;
const MARQUEE_LEAVE = 0.79;

// ── DOM REFS ────────────────────────────────────────────────
const loader        = document.getElementById('loader');
const loaderBar     = document.getElementById('loader-bar');
const loaderPct     = document.getElementById('loader-percent');
const canvasEl      = document.getElementById('canvas');
const canvasWrap    = document.getElementById('canvas-wrap');
const ctx           = canvasEl.getContext('2d');
const scrollCont    = document.getElementById('scroll-container');
const heroSection   = document.getElementById('hero-section');
const darkOverlay   = document.getElementById('dark-overlay');
const marqueeWrap   = document.getElementById('marquee');
const marqueeText   = marqueeWrap.querySelector('.marquee-text');

// ── FRAME STORE ─────────────────────────────────────────────
const frames      = new Array(FRAME_COUNT).fill(null);
let   currentFrame = 0;
let   bgColor      = '#0d0d0d';

// ── CANVAS RESIZE ───────────────────────────────────────────
const dpr = window.devicePixelRatio || 1;
function resizeCanvas() {
  canvasEl.width  = window.innerWidth  * dpr;
  canvasEl.height = window.innerHeight * dpr;
  canvasEl.style.width  = window.innerWidth  + 'px';
  canvasEl.style.height = window.innerHeight + 'px';
  ctx.scale(dpr, dpr);
  if (frames[currentFrame]) drawFrame(currentFrame);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function padNum(n, len) { return String(n).padStart(len, '0'); }

function frameSrc(i) {
  return `${FRAME_PATH}${padNum(i + 1, 4)}.${FRAME_EXT}`;
}

// ── BACKGROUND COLOR SAMPLING ───────────────────────────────
function sampleBgColor(img) {
  const w = img.naturalWidth, h = img.naturalHeight;
  const tmp = document.createElement('canvas');
  tmp.width = 4; tmp.height = 4;
  const tc = tmp.getContext('2d');
  tc.drawImage(img, 0, 0, w, h, 0, 0, 4, 4);
  const d = tc.getImageData(0, 0, 1, 1).data;
  bgColor = `rgb(${d[0]},${d[1]},${d[2]})`;
}

// ── DRAW FRAME ───────────────────────────────────────────────
const IMAGE_SCALE = 0.72; // pulled in to hide low-res borders
function drawFrame(index) {
  const img = frames[index];
  if (!img) return;
  const cw = canvasEl.width  / dpr;
  const ch = canvasEl.height / dpr;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE;
  const dw = iw * scale, dh = ih * scale;
  const dx = (cw - dw) / 2, dy = (ch - dh) / 2;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, cw, ch);
  ctx.drawImage(img, dx, dy, dw, dh);
}

// ── PRELOADER ───────────────────────────────────────────────
function loadImage(index) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload  = () => { frames[index] = img; resolve(); };
    img.onerror = () => resolve();
    img.src = frameSrc(index);
  });
}

async function preloadAll() {
  // Phase 1: first PRELOAD_FAST frames fast
  const fastBatch = [];
  for (let i = 0; i < PRELOAD_FAST; i++) fastBatch.push(loadImage(i));
  await Promise.all(fastBatch);
  if (frames[0]) { sampleBgColor(frames[0]); drawFrame(0); }

  // Phase 2: rest in background, update progress bar
  let loaded = PRELOAD_FAST;
  const updateProgress = () => {
    const pct = Math.round((loaded / FRAME_COUNT) * 100);
    loaderBar.style.width = pct + '%';
    loaderPct.textContent = pct + '%';
    if (loaded >= FRAME_COUNT) onAllLoaded();
  };

  updateProgress();

  for (let i = PRELOAD_FAST; i < FRAME_COUNT; i++) {
    loadImage(i).then(() => { loaded++; updateProgress(); });
  }
}

function onAllLoaded() {
  loader.classList.add('hidden');
  initLenis();
  initScrollAnimations();
  initHeroTransition();
  initFrameScroll();
  initSectionAnimations();
  initDarkOverlay();
  initMarquee();
  initCounters();
  positionSections();
}

// ── LENIS ───────────────────────────────────────────────────
function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// ── POSITION SECTIONS ────────────────────────────────────────
function positionSections() {
  const totalH = scrollCont.getBoundingClientRect().height;
  document.querySelectorAll('.scroll-section').forEach((sec) => {
    const enter = parseFloat(sec.dataset.enter) / 100;
    const leave = parseFloat(sec.dataset.leave) / 100;
    const mid   = (enter + leave) / 2;
    sec.style.top    = (mid * totalH) + 'px';
    sec.style.transform = 'translateY(-50%)';
  });
}

// ── HERO TRANSITION ──────────────────────────────────────────
function initHeroTransition() {
  ScrollTrigger.create({
    trigger: scrollCont,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;
      // Hero fades out fast
      heroSection.style.opacity = Math.max(0, 1 - p * 18);
      heroSection.style.pointerEvents = p > 0.05 ? 'none' : 'auto';
      // Canvas: wipe in early, then permanently collapse after overlay takes over
      if (p >= OVERLAY_ENTER) {
        canvasWrap.style.clipPath = 'circle(0% at 50% 50%)';
        canvasWrap.style.opacity = '0';
      } else {
        canvasWrap.style.opacity = '1';
        const wipe = Math.min(1, Math.max(0, (p - 0.01) / 0.07));
        const r = wipe * 80;
        canvasWrap.style.clipPath = `circle(${r}% at 50% 50%)`;
      }
    },
  });
}

// ── FRAME → SCROLL ───────────────────────────────────────────
function initFrameScroll() {
  ScrollTrigger.create({
    trigger: scrollCont,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const accelerated = Math.min(self.progress * FRAME_SPEED, 1);
      const index = Math.min(Math.floor(accelerated * FRAME_COUNT), FRAME_COUNT - 1);
      if (index !== currentFrame) {
        currentFrame = index;
        if (index % 20 === 0 && frames[index]) sampleBgColor(frames[index]);
        requestAnimationFrame(() => drawFrame(index));
      }
    },
  });
}

// ── SECTION ANIMATIONS ───────────────────────────────────────
function initScrollAnimations() {} // hook, see initSectionAnimations

function initSectionAnimations() {
  document.querySelectorAll('.scroll-section').forEach((sec) => {
    const type    = sec.dataset.animation;
    const persist = sec.dataset.persist === 'true';
    const enterPct = parseFloat(sec.dataset.enter) / 100;
    const leavePct = parseFloat(sec.dataset.leave) / 100;

    const children = Array.from(sec.querySelectorAll(
      '.section-label, .section-heading, .section-body, .cta-button, .stat, .section-image'
    ));

    // Build entrance timeline
    const tl = gsap.timeline({ paused: true });
    switch (type) {
      case 'slide-left':
        tl.from(children, { x: -80, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out' });
        break;
      case 'slide-right':
        tl.from(children, { x: 80, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out' });
        break;
      case 'scale-up':
        tl.from(children, { scale: 0.85, opacity: 0, stagger: 0.12, duration: 1.0, ease: 'power2.out' });
        break;
      case 'rotate-in':
        tl.from(children, { y: 40, rotation: 3, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out' });
        break;
      case 'stagger-up':
        tl.from(children, { y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out' });
        break;
      case 'clip-reveal':
        tl.from(children, { clipPath: 'inset(100% 0 0 0)', opacity: 0, stagger: 0.15, duration: 1.2, ease: 'power4.inOut' });
        break;
      default: // fade-up
        tl.from(children, { y: 50, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out' });
    }

    const FADE = 0.04;
    let played = false;

    ScrollTrigger.create({
      trigger: scrollCont,
      start: 'top top',
      end: 'bottom bottom',
      scrub: false,
      onUpdate: (self) => {
        const p = self.progress;

        // Opacity envelope
        let opacity = 0;
        if (p >= enterPct - FADE && p <= enterPct)       opacity = (p - (enterPct - FADE)) / FADE;
        else if (p > enterPct && p < leavePct)            opacity = 1;
        else if (!persist && p >= leavePct && p <= leavePct + FADE) opacity = 1 - (p - leavePct) / FADE;
        else if (persist && p >= leavePct)                opacity = 1;
        else                                              opacity = 0;

        sec.style.opacity = opacity;
        sec.classList.toggle('visible', opacity > 0);

        // Trigger entrance animation once
        if (p >= enterPct && !played) {
          played = true;
          tl.play(0);
        }
        // Reset if scrolled back before enter
        if (p < enterPct - FADE) {
          played = false;
          tl.pause(0, true);
        }
      },
    });
  });
}

// ── DARK OVERLAY ─────────────────────────────────────────────
function initDarkOverlay() {
  const FADE = 0.03;
  ScrollTrigger.create({
    trigger: scrollCont,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;
      // Fades in at OVERLAY_ENTER, then stays at 1 permanently — video never returns
      let opacity = 0;
      if (p >= OVERLAY_ENTER - FADE && p < OVERLAY_ENTER) {
        opacity = (p - (OVERLAY_ENTER - FADE)) / FADE;
      } else if (p >= OVERLAY_ENTER) {
        opacity = 1;
      }
      darkOverlay.style.opacity = opacity;
    },
  });
}

// ── MARQUEE ──────────────────────────────────────────────────
function initMarquee() {
  const speed = parseFloat(marqueeWrap.dataset.scrollSpeed) || -22;
  const FADE = 0.05;

  gsap.to(marqueeText, {
    xPercent: speed,
    ease: 'none',
    scrollTrigger: { trigger: scrollCont, start: 'top top', end: 'bottom bottom', scrub: true },
  });

  ScrollTrigger.create({
    trigger: scrollCont,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;
      let opacity = 0;
      if (p >= MARQUEE_ENTER && p <= MARQUEE_ENTER + FADE)       opacity = (p - MARQUEE_ENTER) / FADE;
      else if (p > MARQUEE_ENTER + FADE && p < MARQUEE_LEAVE - FADE) opacity = 1;
      else if (p >= MARQUEE_LEAVE - FADE && p <= MARQUEE_LEAVE)  opacity = 1 - (p - (MARQUEE_LEAVE - FADE)) / FADE;
      marqueeWrap.style.opacity = opacity;
    },
  });
}

// ── COUNTERS ─────────────────────────────────────────────────
function initCounters() {
  document.querySelectorAll('.stat-number').forEach((el) => {
    const target   = parseFloat(el.dataset.value);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const statSec  = el.closest('.scroll-section');

    gsap.from(el, {
      textContent: 0,
      duration: 2,
      ease: 'power1.out',
      snap: { textContent: decimals === 0 ? 1 : 0.01 },
      onUpdate() {
        el.textContent = parseFloat(el.textContent).toFixed(decimals);
      },
      scrollTrigger: {
        trigger: scrollCont,
        start: 'top top',
        end: 'bottom bottom',
        onEnterBack: () => { el.textContent = '0'; },
        toggleActions: 'play none none reverse',
        // Fire when stat section becomes visible (~52% progress)
        onUpdate: (self) => {
          if (self.progress >= OVERLAY_ENTER && el.textContent === '0') {
            gsap.to(el, {
              textContent: target,
              duration: 2,
              ease: 'power1.out',
              snap: { textContent: decimals === 0 ? 1 : 0.01 },
              onUpdate() {
                el.textContent = parseFloat(el.textContent).toFixed(decimals);
              },
            });
          }
        },
      },
    });
  });
}

// ── BOOT ─────────────────────────────────────────────────────
preloadAll();
