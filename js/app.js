/* ============================================================
   ZigoDev — Scroll Experience · js/app.js
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

// ── CONFIG ──────────────────────────────────────────────────
const FRAME_COUNT  = 241;
const FRAME_EXT    = 'jpg';
const IS_TOUCH     = window.matchMedia('(pointer: coarse)').matches;
const USE_MOBILE_FRAMES = window.matchMedia('(max-width: 800px)').matches;
const FRAME_PATH   = `${USE_MOBILE_FRAMES ? 'frames-mobile' : 'frames'}/frame_`;
const FRAME_SPEED  = 1.0;   // 1 = full video over full scroll (before overlay)
const PRELOAD_FAST = IS_TOUCH ? 4 : 8; // frames to show before starting
const PRELOAD_AHEAD = IS_TOUCH ? 8 : 14;

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
const heroVideo   = document.querySelector('.hero-visual-media');

// ── FRAME STORE ─────────────────────────────────────────────
const frames     = new Array(FRAME_COUNT).fill(null);
const framePromises = new Array(FRAME_COUNT).fill(null);
let currentFrame = 0;
let bgColor      = '#0d0d0d';
let pendingFrame = null;
let drawRaf = 0;

// ── CANVAS RESIZE ───────────────────────────────────────────
let dpr = getCanvasDpr();

function getCanvasDpr() {
  const ratio = window.devicePixelRatio || 1;
  return Math.min(ratio, IS_TOUCH ? 2 : 2);
}

function resizeCanvas() {
  dpr = getCanvasDpr();
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvasEl.width        = Math.ceil(width * dpr);
  canvasEl.height       = Math.ceil(height * dpr);
  canvasEl.style.width  = width  + 'px';
  canvasEl.style.height = height + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  if (frames[currentFrame]) drawFrame(currentFrame);
}
let resizeRaf = 0;
window.addEventListener('resize', () => {
  cancelAnimationFrame(resizeRaf);
  resizeRaf = requestAnimationFrame(() => {
    resizeCanvas();
    positionSections();
    ScrollTrigger.refresh();
  });
});
resizeCanvas();

function padNum(n, len) { return String(n).padStart(len, '0'); }
function frameSrc(i)    { return `${FRAME_PATH}${padNum(i + 1, 4)}.${FRAME_EXT}`; }

function startHeroVideo() {
  if (!heroVideo) return;
  heroVideo.muted = true;
  heroVideo.play().catch(() => {});
}

startHeroVideo();

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

function scheduleFrameDraw(index) {
  pendingFrame = index;
  if (drawRaf) return;
  drawRaf = requestAnimationFrame(() => {
    drawRaf = 0;
    const next = pendingFrame;
    pendingFrame = null;
    drawFrame(next);
  });
}

// ── PRELOADER ───────────────────────────────────────────────
function loadImage(index, priority = 'auto') {
  if (index < 0 || index >= FRAME_COUNT) return Promise.resolve(null);
  if (frames[index]) return Promise.resolve(frames[index]);
  if (framePromises[index]) return framePromises[index];

  framePromises[index] = new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    if ('fetchPriority' in img) img.fetchPriority = priority;
    img.onload  = () => {
      frames[index] = img;
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = frameSrc(index);
  });

  return framePromises[index];
}

async function preloadAll() {
  let initialLoaded = 0;
  const initialFrames = Array.from({ length: PRELOAD_FAST }, (_, i) => i);
  const update = () => {
    const pct = Math.min(100, Math.round((initialLoaded / initialFrames.length) * 100));
    loaderBar.style.width = pct + '%';
    loaderPct.textContent = pct + '%';
  };

  update();
  await Promise.all(initialFrames.map((index) =>
    loadImage(index, index === 0 ? 'high' : 'auto').then(() => {
      initialLoaded++;
      update();
    })
  ));

  if (frames[0]) {
    sampleBgColor(frames[0]);
    drawFrame(0);
  }

  onReady();
  warmFrameWindow(0);
}

function runWhenIdle(callback) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout: 900 });
  } else {
    window.setTimeout(callback, 90);
  }
}

let lastWarmCenter = -999;
function warmFrameWindow(center) {
  if (Math.abs(center - lastWarmCenter) < 4) return;
  lastWarmCenter = center;

  runWhenIdle(() => {
    loadImage(center, 'high');
    for (let i = 1; i <= PRELOAD_AHEAD; i++) {
      loadImage(center + i);
      if (i <= 3) loadImage(center - i);
    }
  });
}

// ── BOOT ─────────────────────────────────────────────────────
function onReady() {
  loader.classList.add('hidden');
  initLenis();
  positionSections();
  initHeroTransition();
  initFrameScroll();
  initSectionAnimations();
  initDarkOverlay();
  initMarquee();
  initCounters();
  ScrollTrigger.refresh();
}

// ── LENIS ───────────────────────────────────────────────────
let lenisInstance = null;

function initLenis() {
  lenisInstance = new Lenis({
    duration: IS_TOUCH ? 0.9 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: IS_TOUCH ? 1 : 1.5,
  });
  lenisInstance.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenisInstance.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

}

// ── POSITION SECTIONS ────────────────────────────────────────
function positionSections() {
  const totalH = scrollCont.offsetHeight;
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
        if (frames[index]) {
          scheduleFrameDraw(index);
        } else {
          loadImage(index, 'high').then(() => {
            if (currentFrame === index) scheduleFrameDraw(index);
          });
        }
        warmFrameWindow(index);
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
    videos.forEach((video) => video.pause());

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
    let wasVisible = false;
    let lastOpacity = -1;

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

        if (Math.abs(opacity - lastOpacity) > 0.001) {
          sec.style.opacity = opacity;
          lastOpacity = opacity;
        }
        const isVisible = opacity > 0.05;
        if (isVisible !== wasVisible) {
          sec.classList.toggle('visible', isVisible);
          videos.forEach((video) => {
            if (isVisible && video.paused) video.play().catch(() => {});
            if (!isVisible && !video.paused) video.pause();
          });
          wasVisible = isVisible;
        }

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

// ── HAMBURGER MENU ───────────────────────────────────────────
const burger     = document.querySelector('.nav-burger');
const siteHeader = document.querySelector('.site-header');

burger.addEventListener('click', () => {
  const open = siteHeader.classList.toggle('nav-open');
  burger.setAttribute('aria-expanded', open);
  document.querySelector('.nav-drawer').setAttribute('aria-hidden', !open);
});

document.querySelectorAll('.nav-drawer a').forEach(link => {
  link.addEventListener('click', () => {
    siteHeader.classList.remove('nav-open');
    burger.setAttribute('aria-expanded', 'false');
    document.querySelector('.nav-drawer').setAttribute('aria-hidden', 'true');
  });
});
