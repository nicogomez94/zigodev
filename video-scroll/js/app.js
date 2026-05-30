/* ============================================================
   ZigoDev — Scroll Experience · js/app.js
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

// ── CONFIG ──────────────────────────────────────────────────
const FRAME_COUNT  = 241;
const FRAME_EXT    = 'jpg';
const FRAME_PATH   = 'frames/frame_';
const FRAME_SPEED  = 1.0;   // 1 = full video over full scroll (before overlay)
const PRELOAD_FAST = 12;    // frames to show before starting

// Dark overlay range (0–1 scroll progress)
const OVERLAY_ENTER = 0.59;

// Marquee range
const MARQUEE_ENTER = 0.08;
const MARQUEE_LEAVE = 0.59;

// ── DOM REFS ────────────────────────────────────────────────
const loader      = document.getElementById('loader');
const loaderBar   = document.getElementById('loader-bar');
const loaderPct   = document.getElementById('loader-percent');
const canvasEl    = document.getElementById('canvas');
const canvasWrap  = document.getElementById('canvas-wrap');
const ctx         = canvasEl.getContext('2d');
const scrollCont  = document.getElementById('scroll-container');
const heroSection = document.getElementById('hero-section');
const darkOverlay = document.getElementById('dark-overlay');
const marqueeWrap = document.getElementById('marquee');
const marqueeText = marqueeWrap.querySelector('.marquee-text');

// ── FRAME STORE ─────────────────────────────────────────────
const frames     = new Array(FRAME_COUNT).fill(null);
let currentFrame = 0;
let bgColor      = '#0d0d0d';

// ── CANVAS RESIZE ───────────────────────────────────────────
const dpr = window.devicePixelRatio || 1;
function resizeCanvas() {
  canvasEl.width        = window.innerWidth  * dpr;
  canvasEl.height       = window.innerHeight * dpr;
  canvasEl.style.width  = window.innerWidth  + 'px';
  canvasEl.style.height = window.innerHeight + 'px';
  ctx.scale(dpr, dpr);
  if (frames[currentFrame]) drawFrame(currentFrame);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function padNum(n, len) { return String(n).padStart(len, '0'); }
function frameSrc(i)    { return `${FRAME_PATH}${padNum(i + 1, 4)}.${FRAME_EXT}`; }

// ── BACKGROUND COLOR SAMPLING ───────────────────────────────
function sampleBgColor(img) {
  try {
    const tmp = document.createElement('canvas');
    tmp.width = 4; tmp.height = 4;
    const tc = tmp.getContext('2d');
    tc.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, 4, 4);
    const d = tc.getImageData(0, 0, 1, 1).data;
    bgColor = `rgb(${d[0]},${d[1]},${d[2]})`;
  } catch (e) {
    // Safari file:// protocol taints canvas — skip color sampling
  }
}

// ── DRAW FRAME ───────────────────────────────────────────────
function drawFrame(index) {
  const img = frames[index];
  if (!img) return;
  const cw = canvasEl.width  / dpr;
  const ch = canvasEl.height / dpr;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(cw / iw, ch / ih);
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
  const fast = [];
  for (let i = 0; i < PRELOAD_FAST; i++) fast.push(loadImage(i));
  await Promise.all(fast);
  if (frames[0]) { sampleBgColor(frames[0]); drawFrame(0); }

  // Phase 2: rest in background, update progress bar
  let loaded = PRELOAD_FAST;
  const update = () => {
    const pct = Math.round((loaded / FRAME_COUNT) * 100);
    loaderBar.style.width = pct + '%';
    loaderPct.textContent = pct + '%';
    if (loaded >= FRAME_COUNT) onReady();
  };
  update();
  for (let i = PRELOAD_FAST; i < FRAME_COUNT; i++) {
    loadImage(i).then(() => { loaded++; update(); });
  }
}

// ── BOOT ─────────────────────────────────────────────────────
function onReady() {
  loader.classList.add('hidden');
  initLenis();
  initHeroTransition();
  initFrameScroll();
  initSectionAnimations();
  initDarkOverlay();
  initMarquee();
  initCounters();
  positionSections();
}

// ── LENIS ───────────────────────────────────────────────────
let lenisInstance = null;

function initLenis() {
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: true,        // use native touch scroll on mobile
    touchMultiplier: 1.5,
  });
  lenisInstance.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenisInstance.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

}

// ── POSITION SECTIONS ────────────────────────────────────────
function positionSections() {
  const totalH = scrollCont.getBoundingClientRect().height;
  document.querySelectorAll('.scroll-section').forEach((sec) => {
    const enter = parseFloat(sec.dataset.enter) / 100;
    const leave = parseFloat(sec.dataset.leave) / 100;
    const mid   = (enter + leave) / 2;
    sec.style.top       = (mid * totalH) + 'px';
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
      heroSection.style.opacity       = Math.max(0, 1 - p * 18);
      heroSection.style.pointerEvents = p > 0.05 ? 'none' : 'auto';
      // Canvas: circle wipe in early, collapse when overlay takes over
      if (p >= OVERLAY_ENTER) {
        canvasWrap.style.clipPath = 'circle(0% at 50% 50%)';
        canvasWrap.style.opacity  = '0';
      } else {
        canvasWrap.style.opacity = '.6';
        const wipe = Math.min(1, Math.max(0, (p - 0.002) / 0.035));
        canvasWrap.style.clipPath = `circle(${wipe * 90}% at 50% 50%)`;
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
      // Map scroll 0 → OVERLAY_ENTER to full 240 frames
      const accelerated = Math.min((self.progress / OVERLAY_ENTER) * FRAME_SPEED, 1);
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
function initSectionAnimations() {
  document.querySelectorAll('.scroll-section').forEach((sec) => {
    const type     = sec.dataset.animation;
    const persist  = sec.dataset.persist === 'true';
    const enterPct = parseFloat(sec.dataset.enter) / 100;
    const leavePct = parseFloat(sec.dataset.leave) / 100;
    const videos   = Array.from(sec.querySelectorAll('video'));

    // Animate the card container (.section-inner) + image as units so the
    // black background and text both appear at the same time.
    const children = Array.from(sec.querySelectorAll(
      '.section-inner, .section-image, .portfolio-col-header, .pf-item, .feat-image, .feat-overline, .feat-title, .feat-desc, .feat-tech, .feat-links'
    ));

    const tl = gsap.timeline({ paused: true });
    switch (type) {
      case 'slide-left':
        tl.from(children, { x: -60, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' }); break;
      case 'slide-right':
        tl.from(children, { x: 60, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' }); break;
      case 'scale-up':
        tl.from(children, { scale: 0.88, opacity: 0, stagger: 0.08, duration: 0.75, ease: 'power2.out' }); break;
      case 'rotate-in':
        tl.from(children, { y: 30, rotation: 2, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' }); break;
      case 'stagger-up':
        tl.from(children, { y: 50, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out' }); break;
      case 'clip-reveal':
        tl.from(children, { clipPath: 'inset(100% 0 0 0)', opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power4.inOut' }); break;
      default:
        tl.from(children, { y: 40, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' });
    }

    const FADE = 0.04;
    let played = false;

    ScrollTrigger.create({
      trigger: scrollCont,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress;
        let opacity = 0;
        if      (p >= enterPct - FADE && p <= enterPct)             opacity = (p - (enterPct - FADE)) / FADE;
        else if (p > enterPct && p < leavePct)                       opacity = 1;
        else if (!persist && p >= leavePct && p <= leavePct + FADE) opacity = 1 - (p - leavePct) / FADE;
        else if (persist  && p >= leavePct)                          opacity = 1;

        sec.style.opacity = opacity;
        const isVisible = opacity > 0.05;
        sec.classList.toggle('visible', isVisible);
        videos.forEach((video) => {
          if (isVisible && video.paused) video.play().catch(() => {});
          if (!isVisible && !video.paused) video.pause();
        });

        if (p >= enterPct && !played) { played = true; tl.play(0); }
        if (p < enterPct - FADE)      { played = false; tl.pause(0, true); }
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
      let o = 0;
      if (p >= OVERLAY_ENTER - FADE && p < OVERLAY_ENTER) o = (p - (OVERLAY_ENTER - FADE)) / FADE;
      else if (p >= OVERLAY_ENTER)                         o = 1;
      darkOverlay.style.opacity = o;
    },
  });
}

// ── MARQUEE ──────────────────────────────────────────────────
function initMarquee() {
  const speed = parseFloat(marqueeWrap.dataset.scrollSpeed) || -22;
  const FADE  = 0.05;

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
      let o = 0;
      if      (p >= MARQUEE_ENTER && p <= MARQUEE_ENTER + FADE)          o = (p - MARQUEE_ENTER) / FADE;
      else if (p > MARQUEE_ENTER + FADE && p < MARQUEE_LEAVE - FADE)     o = 1;
      else if (p >= MARQUEE_LEAVE - FADE && p <= MARQUEE_LEAVE)          o = 1 - (p - (MARQUEE_LEAVE - FADE)) / FADE;
      marqueeWrap.style.opacity = o;
    },
  });
}

// ── COUNTERS ─────────────────────────────────────────────────
function initCounters() {
  document.querySelectorAll('.stat-number').forEach((el) => {
    const target   = parseFloat(el.dataset.value);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    let fired = false;

    ScrollTrigger.create({
      trigger: scrollCont,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (self.progress >= OVERLAY_ENTER && !fired) {
          fired = true;
          gsap.to(el, {
            textContent: target,
            duration: 2,
            ease: 'power1.out',
            snap: { textContent: decimals === 0 ? 1 : 0.01 },
            onUpdate() { el.textContent = parseFloat(el.textContent).toFixed(decimals); },
          });
        }
        if (self.progress < OVERLAY_ENTER - 0.05) {
          fired = false;
          el.textContent = '0';
        }
      },
    });
  });
}

// ── START ────────────────────────────────────────────────────
preloadAll();
