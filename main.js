/* ============================================================
   LIGHTHOUSE CHURCH — MAIN.JS
   Shared across all pages
   ============================================================ */

/* ── PAGE LOADER ────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('done');
  }, 1400);
});

/* ── SCROLL PROGRESS BAR ────────────────────────────────────── */
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = pct + '%';
  }, { passive: true });
}

/* ── CUSTOM CURSOR ──────────────────────────────────────────── */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
if (dot && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });
  function rafCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(rafCursor);
  }
  rafCursor();
  document.querySelectorAll('a, button, [data-prayer], .nav-icon-btn, .service-card, .feature-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ── THEME TOGGLE ────────────────────────────────────────────── */
const savedTheme = localStorage.getItem('lc-theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
function updateThemeIcons() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.querySelectorAll('.theme-moon').forEach(el => el.style.display = isDark ? 'block' : 'none');
  document.querySelectorAll('.theme-sun').forEach(el => el.style.display  = isDark ? 'none' : 'block');
}
updateThemeIcons();
document.querySelectorAll('.theme-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const curr = document.documentElement.getAttribute('data-theme');
    const next = curr === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('lc-theme', next);
    updateThemeIcons();
  });
});

/* ── NAVIGATION SCROLL ──────────────────────────────────────── */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── LOGO FALLBACK ──────────────────────────────────────────── */
document.querySelectorAll('.nav-logo-img').forEach(img => {
  img.addEventListener('error', function() {
    this.classList.add('hidden');
  });
});

/* ── MINISTRIES DROPDOWN ────────────────────────────────────── */
const ddBtn = document.getElementById('ministries-btn');
const ddMenu = document.getElementById('ministries-dropdown');
if (ddBtn && ddMenu) {
  ddBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    ddMenu.classList.toggle('open');
  });
  document.addEventListener('click', () => ddMenu.classList.remove('open'));
  ddMenu.addEventListener('click', e => e.stopPropagation());
}

/* ── MOBILE MENU ────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── SEARCH OVERLAY ─────────────────────────────────────────── */
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

const searchIndex = [
  { title: 'Home', url: 'index.html', excerpt: 'Welcome to Lighthouse Church in Oshawa, Ontario.' },
  { title: 'About — Mission & Vision', url: 'about.html', excerpt: 'Evangelism, Discipleship, Church Planting, Conversion, The Local Church.' },
  { title: "Women's Ministry", url: 'womens-ministry.html', excerpt: 'Community, Bible study, and events for women of all ages.' },
  { title: "Men's Ministry", url: 'mens-ministry.html', excerpt: 'Brotherhood, Bible study, and events for men.' },
  { title: "Children's Ministry", url: 'childrens-ministry.html', excerpt: 'Faith Foundation, Fun & Discovery, Family Partnership.' },
  { title: 'Give', url: 'giving.html', excerpt: 'Interac e-Transfer to giving@lhcoshawa.ca or mail a cheque.' },
  { title: 'Fellowship', url: 'fellowship.html', excerpt: 'Life is better together.' },
  { title: 'Service Times', url: 'index.html#times', excerpt: 'Sunday 11 AM & 7 PM — Wednesday 7:30 PM. Prayer one hour before.' },
  { title: 'Prayer Request', url: 'index.html#prayer', excerpt: 'Submit a prayer request — we are believing with you.' },
];

function openSearch() {
  if (searchOverlay) { searchOverlay.classList.add('open'); searchInput?.focus(); }
}
function closeSearch() {
  if (searchOverlay) { searchOverlay.classList.remove('open'); if (searchInput) searchInput.value = ''; if (searchResults) searchResults.innerHTML = ''; }
}
document.querySelectorAll('.search-open-btn').forEach(b => b.addEventListener('click', openSearch));
document.querySelectorAll('.search-close').forEach(b => b.addEventListener('click', closeSearch));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeSearch(); closePrayer(); } });
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!searchResults) return;
    if (!q) { searchResults.innerHTML = ''; return; }
    const hits = searchIndex.filter(i => i.title.toLowerCase().includes(q) || i.excerpt.toLowerCase().includes(q));
    searchResults.innerHTML = hits.length ? hits.map((h, i) =>
      `<a href="${h.url}" class="search-result-item">
        <span class="sr-num">0${i+1}</span>
        <div><div class="sr-title">${h.title}</div><div class="sr-excerpt">${h.excerpt}</div></div>
      </a>`).join('') : `<p style="color:var(--text-2);font-size:0.85rem;padding:1rem 0;">No results found for "<em>${q}</em>"</p>`;
  });
}

/* ── PRAYER MODAL ────────────────────────────────────────────── */
const prayerModal = document.getElementById('prayer-modal');
const prayerForm  = document.getElementById('prayer-form');
const prayerSucc  = document.getElementById('prayer-success');

function openPrayer() { if (prayerModal) prayerModal.classList.add('open'); }
function closePrayer() { if (prayerModal) { prayerModal.classList.remove('open'); setTimeout(resetPrayer, 400); } }
function resetPrayer() {
  if (prayerForm) prayerForm.classList.remove('hidden');
  if (prayerSucc) prayerSucc.classList.remove('show');
  if (prayerForm) prayerForm.reset?.();
}

document.querySelectorAll('[data-prayer]').forEach(b => b.addEventListener('click', openPrayer));
prayerModal?.addEventListener('click', e => { if (e.target === prayerModal) closePrayer(); });
document.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', closePrayer));

if (prayerForm) {
  prayerForm.addEventListener('submit', e => {
    e.preventDefault();
    const name  = prayerForm.querySelector('[name="name"]')?.value.trim();
    const email = prayerForm.querySelector('[name="email"]')?.value.trim();
    const req   = prayerForm.querySelector('[name="prayer"]')?.value.trim();
    if (!name || !email || !req) return;
    prayerForm.classList.add('hidden');
    if (prayerSucc) prayerSucc.classList.add('show');
  });
}

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .clip-line').forEach(el => revealObserver.observe(el));

/* ── EST TIME (DST-aware) ────────────────────────────────────── */
function getEST() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const jan = new Date(now.getFullYear(), 0, 1);
  const jul = new Date(now.getFullYear(), 6, 1);
  const dst = now.getTimezoneOffset() < Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  return new Date(utc + (dst ? -4 : -5) * 3600000);
}

/* ── SERVICE SCHEDULE ───────────────────────────────────────── */
const SERVICES = [
  { day: 0, h: 11, m: 0,  label: 'Sunday 11:00 AM Service' },
  { day: 0, h: 19, m: 0,  label: 'Sunday 7:00 PM Service' },
  { day: 3, h: 19, m: 30, label: 'Wednesday 7:30 PM Service' },
];

function isLive() {
  const now = getEST();
  const dayNow = now.getDay(), hNow = now.getHours(), mNow = now.getMinutes();
  return SERVICES.some(s => {
    if (s.day !== dayNow) return false;
    const startMin = s.h * 60 + s.m;
    const currMin  = hNow * 60 + mNow;
    return currMin >= startMin - 15 && currMin <= startMin + 75;
  });
}

function getNextService() {
  const now = getEST();
  const dayNow = now.getDay(), hNow = now.getHours(), mNow = now.getMinutes();
  const currMin = dayNow * 1440 + hNow * 60 + mNow;
  // Build sorted week array
  const weekServices = SERVICES.map(s => ({ ...s, wMin: s.day * 1440 + s.h * 60 + s.m }))
    .sort((a, b) => a.wMin - b.wMin);
  const next = weekServices.find(s => s.wMin > currMin) || weekServices[0];
  // Calculate ms to next
  let diffMin = next.wMin - currMin;
  if (diffMin <= 0) diffMin += 7 * 1440;
  const msToNext = diffMin * 60000;
  return { service: next, msToNext };
}

/* ── COUNTDOWN TIMER ─────────────────────────────────────────── */
function initCountdown() {
  const cdDays = document.getElementById('cd-days');
  const cdHrs  = document.getElementById('cd-hrs');
  const cdMins = document.getElementById('cd-mins');
  const cdSecs = document.getElementById('cd-secs');
  const cdNext = document.getElementById('cd-next');
  if (!cdDays) return;

  function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }
  function tick() {
    const { service, msToNext } = getNextService();
    if (cdNext) cdNext.textContent = service.label;
    let rem = Math.floor(msToNext / 1000);
    const d = Math.floor(rem / 86400); rem %= 86400;
    const h = Math.floor(rem / 3600);  rem %= 3600;
    const mi = Math.floor(rem / 60);
    const s = rem % 60;
    if (cdDays) cdDays.textContent = pad(d);
    if (cdHrs)  cdHrs.textContent  = pad(h);
    if (cdMins) cdMins.textContent = pad(mi);
    if (cdSecs) cdSecs.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
}

/* ── LIVE STREAM LOGIC ──────────────────────────────────────── */
function initStream() {
  const liveSection  = document.getElementById('stream-live');
  const notLiveSection = document.getElementById('stream-not-live');
  const liveSticky   = document.getElementById('live-sticky');
  const nextServiceEl = document.getElementById('next-service-text');

  if (!liveSection && !notLiveSection) return;

  const live = isLive();
  if (live) {
    if (liveSection)    liveSection.style.display    = 'block';
    if (notLiveSection) notLiveSection.style.display = 'none';
  } else {
    if (liveSection)    liveSection.style.display    = 'none';
    if (notLiveSection) notLiveSection.style.display = 'block';
    if (nextServiceEl) {
      const { service } = getNextService();
      nextServiceEl.textContent = service.label.replace(' Service', '');
    }
  }

  // Sticky live pill
  if (liveSticky && live) {
    window.addEventListener('scroll', () => {
      const hero = document.querySelector('.page-hero');
      if (!hero) return;
      const below = window.scrollY > hero.offsetHeight;
      liveSticky.classList.toggle('show', below);
    }, { passive: true });
  }
}

/* ── CLIPBOARD COPY ──────────────────────────────────────────── */
document.querySelectorAll('[data-copy]').forEach(btn => {
  const orig = btn.textContent;
  const text = btn.getAttribute('data-copy');
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = '✓ Copied';
      btn.classList.add('btn-copied');
      setTimeout(() => { btn.textContent = orig; btn.classList.remove('btn-copied'); }, 2200);
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.textContent = '✓ Copied';
      btn.classList.add('btn-copied');
      setTimeout(() => { btn.textContent = orig; btn.classList.remove('btn-copied'); }, 2200);
    });
  });
});

/* ── ICS PARSER & EVENTS ────────────────────────────────────── */
const ICS_URL = 'https://raw.githubusercontent.com/LHCOshawa/Website/main/basic.ics';

const FALLBACK_EVENTS = [
  { title: 'Beauty & Grace', start: new Date(2024, 11, 13), time: '12:00 AM', location: 'Church Sanctuary', description: '' },
  { title: 'Sunday Service',    start: new Date(2024, 11, 14), time: '11:00 AM', location: 'Church Sanctuary', description: '' },
  { title: 'Wednesday Service', start: new Date(2024, 11, 18), time: '7:30 PM',  location: 'Church Sanctuary', description: '' },
  { title: 'Sunday Service',    start: new Date(2024, 11, 21), time: '11:00 AM', location: 'Church Sanctuary', description: '' },
  { title: 'New Year Service',  start: new Date(2025, 0, 12),  time: '11:00 AM', location: 'Church Sanctuary', description: '' },
];

function parseICS(text) {
  const events = [];
  const blocks = text.split('BEGIN:VEVENT');
  blocks.slice(1).forEach(block => {
    const get = (key) => {
      const match = block.match(new RegExp(`${key}[^:]*:([^\\r\\n]+)`));
      return match ? match[1].trim() : '';
    };
    const dtRaw = get('DTSTART') || get('DTSTART;VALUE=DATE') || '';
    let start = null;
    if (dtRaw) {
      const y = +dtRaw.slice(0,4), mo = +dtRaw.slice(4,6)-1, d = +dtRaw.slice(6,8);
      const h = dtRaw.length > 8 ? +dtRaw.slice(9,11) : 0;
      const mi = dtRaw.length > 8 ? +dtRaw.slice(11,13) : 0;
      start = new Date(y, mo, d, h, mi);
    }
    if (!start) return;
    const title = get('SUMMARY').replace(/\\n/g,' ').replace(/\\,/g,',') || 'Untitled Event';
    const desc  = get('DESCRIPTION').replace(/\\n/g,' ').replace(/\\,/g,',').slice(0,200);
    const loc   = get('LOCATION').replace(/\\n/g,' ');
    const hh = start.getHours(), mm = start.getMinutes();
    const ampm = hh >= 12 ? 'PM' : 'AM';
    const h12 = hh % 12 || 12;
    const time = `${h12}:${String(mm).padStart(2,'0')} ${ampm}`;
    events.push({ title, start, time, location: loc, description: desc });
  });
  return events.filter(e => e.start >= new Date()).sort((a,b) => a.start - b.start);
}


/* ── EVENT IMAGE LOGIC (SMART MATCHING) ─────────────────────── */
const EVENT_IMAGES = {
  logo: 'https://lh3.googleusercontent.com/d/1vhiwXZNViO4mbnkXF1VzT7mFLdoLwfUL',
  men: 'https://lh3.googleusercontent.com/d/1sVvOnArlTJCR0BaW6XKBF_PcJV-X1nlJ',
  women: 'https://lh3.googleusercontent.com/d/10XjWVZGre_im94tHaI7ERDMnADVy2MtD'
};

function getEventImage(title) {
  const t = title.toLowerCase();

  if (t.includes('men') && !t.includes('women')) return EVENT_IMAGES.men;
  if (t.includes('women')) return EVENT_IMAGES.women;

  return EVENT_IMAGES.logo;
}

/* ── FILTER OUT RECURRING SERVICES ─────────────────────────── */
function isRecurringService(ev) {
  const t = ev.title.toLowerCase();

  return (
    t.includes('sunday') ||
    t.includes('wednesday')
    /* t.includes('service') ||
    t.includes('worship') */
  );
}
function formatEventHTML(ev, idx) {
  const MONTHS_LONG  = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const MONTHS_SHORT = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const DAYS         = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  const dow   = DAYS[ev.start.getDay()];
  const dayN  = ev.start.getDate();
  const monS  = MONTHS_SHORT[ev.start.getMonth()];

  // IMAGE LOGIC
  const imgSrc = getEventImage(ev.title);

  const descHTML = ev.description
    ? `<div class="evt-card-desc">${ev.description}</div>` : '';

  const locHTML = ev.location
    ? `<span class="evt-card-meta-sep">·</span><span>${ev.location}</span>` : '';

  return `
  <div class="evt-card" role="article" aria-label="${ev.title} on ${dow} ${monS} ${dayN}">
    <div class="evt-card-bg" style="background-image:url('${imgSrc}')"></div>
    <div class="evt-card-gradient"></div>
    <div class="evt-card-day-num" aria-hidden="true">${dayN}</div>
    <div class="evt-card-glow"></div>

    <div class="evt-card-glass">
      <div class="evt-card-label">
        <span class="evt-card-month">${monS} ${ev.start.getFullYear()}</span>
        <span class="evt-card-dot"></span>
        <span class="evt-card-dow">${dow}</span>
      </div>

      <div class="evt-card-title">${ev.title}</div>

      <div class="evt-card-meta">
        <span>${ev.time}</span>
        ${locHTML}
      </div>

      ${descHTML}
    </div>
  </div>`;
}

function emptyEventsHTML() {
  return `<div class="events-empty">
    <div class="empty-glyph">✦</div>
    <h3>No upcoming events</h3>
    <p>Events will appear here as they are scheduled. Stay connected with us on Instagram for the latest announcements.</p>
    <a href="https://www.instagram.com/lhcoshawa/" target="_blank" rel="noopener noreferrer" class="btn btn-dark"><span>Follow @lhcoshawa</span></a>
  </div>`;
}

function renderEvents(events, containerId, filter, limit) {
  const container = document.getElementById(containerId);
  if (!container) return;
let filtered = events.filter(ev => !isRecurringService(ev)); // remove recurring services
if (filter) {
  filtered = filtered.filter(filter);
}
  const visible = filtered.slice(0, limit || 8);
  if (!visible.length) { container.innerHTML = emptyEventsHTML(); return; }
  container.innerHTML = visible.map((ev, i) => formatEventHTML(ev, i)).join('');

  // Only init carousel if this is the main homepage carousel track
  if (containerId === 'events-container') {
    initEvtCarousel(container);
  }
}

/* ── CAROUSEL CONTROLLER ─────────────────────────────────────── */
function initEvtCarousel(track) {
  const wrap     = track.parentElement;
  const prevBtn  = document.getElementById('evt-prev');
  const nextBtn  = document.getElementById('evt-next');
  const dotsWrap = document.getElementById('evt-dots');
  const section  = document.querySelector('.evt-section');

  if (section) section.setAttribute('data-label', 'Events');

  const cards    = Array.from(track.querySelectorAll('.evt-card'));
  const total    = cards.length;
  let current    = 0;

  // Build dots
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    cards.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'evt-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Go to event ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    });
  }

  function getCardWidth() {
    const card = cards[0];
    if (!card) return 0;
    const style = getComputedStyle(card);
    return card.offsetWidth + parseInt(getComputedStyle(track).gap || '24');
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, total - 1));
    const offset = getCardWidth() * current;
    track.style.transform = `translateX(-${offset}px)`;
    // Dots
    if (dotsWrap) {
      dotsWrap.querySelectorAll('.evt-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }
    // Parallax depth on bg images
    cards.forEach((card, i) => {
      const bg = card.querySelector('.evt-card-bg');
      if (!bg) return;
      const diff = i - current;
      bg.style.transform = `scale(1.06) translateX(${diff * 6}px)`;
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Keyboard
  wrap.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  // Drag / swipe
  let startX = 0, dragging = false, dragDelta = 0;
  wrap.addEventListener('pointerdown', e => {
    startX = e.clientX;
    dragging = true;
    wrap.setPointerCapture(e.pointerId);
  });
  wrap.addEventListener('pointermove', e => {
    if (!dragging) return;
    dragDelta = e.clientX - startX;
    const offset = getCardWidth() * current - dragDelta;
    track.style.transition = 'none';
    track.style.transform = `translateX(-${offset}px)`;
  });
  wrap.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    track.style.transition = '';
    if (dragDelta < -60) goTo(current + 1);
    else if (dragDelta > 60) goTo(current - 1);
    else goTo(current);
    dragDelta = 0;
  });

  // Auto-advance every 5s
  let autoTimer = setInterval(() => goTo((current + 1) % total), 5000);
  wrap.addEventListener('pointerdown', () => clearInterval(autoTimer));

  // Fade-in entrance
  cards.forEach((c, i) => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(24px)';
    setTimeout(() => {
      c.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s';
      c.style.opacity = '1';
      c.style.transform = 'translateY(0)';
    }, 80 * i);
  });

  goTo(0);
}

window.fetchAndRenderEvents = function(containerId, filterFn, limit) {
  fetch(ICS_URL, { mode: 'no-cors' })
    .then(r => { if (!r.ok && r.type !== 'opaque') throw new Error('no-cors'); return r.text(); })
    .then(text => { if (!text) throw new Error('empty'); const evs = parseICS(text); renderEvents(evs, containerId, filterFn, limit); })
    .catch(() => renderEvents(FALLBACK_EVENTS, containerId, filterFn, limit));
};

/* ── HERO IMAGE LOAD ─────────────────────────────────────────── */
document.querySelectorAll('.hero-bg').forEach(el => {
  const bgUrl = el.style.backgroundImage.replace(/url\(['"]?|['"]?\)/g, '');
  if (!bgUrl) { el.classList.add('loaded'); return; }
  const img = new Image();
  img.onload = () => el.classList.add('loaded');
  img.src = bgUrl;
});

/* ── ACTIVE NAV ──────────────────────────────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage || (currentPage === '' && a.getAttribute('href') === 'index.html')) {
    a.classList.add('active');
  }
});

/* ── INIT ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initStream();
});

/* ── CONNECT MODAL ───────────────────────────────────────────── */
const connectModal = document.getElementById('connect-modal');
const connectForm  = document.getElementById('connect-form');
const connectSucc  = document.getElementById('connect-success');

function openConnect() { if (connectModal) connectModal.classList.add('open'); }
function closeConnect() { if (connectModal) { connectModal.classList.remove('open'); setTimeout(resetConnect, 400); } }
function resetConnect() {
  if (connectForm) connectForm.classList.remove('hidden');
  if (connectSucc) connectSucc.classList.remove('show');
  if (connectForm) connectForm.reset?.();
}

document.querySelectorAll('[data-connect]').forEach(b => b.addEventListener('click', openConnect));
connectModal?.addEventListener('click', e => { if (e.target === connectModal) closeConnect(); });
document.querySelectorAll('.connect-close').forEach(b => b.addEventListener('click', closeConnect));

if (connectForm) {
  connectForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = connectForm.querySelector('[name="name"]')?.value.trim();
    const email = connectForm.querySelector('[name="email"]')?.value.trim();
    const msg   = connectForm.querySelector('[name="message"]')?.value.trim();
    if (!name || !email || !msg) return;
    // Send via Formsubmit
    try {
      await fetch('https://formsubmit.co/ajax/followup@lhcoshawa.ca', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name, email,
          phone: connectForm.querySelector('[name="phone"]')?.value.trim() || '',
          message: msg,
          source: connectForm.querySelector('[name="source"]')?.value || '',
          _subject: `Connect With Us — ${name}`,
          _captcha: false
        })
      });
    } catch (_) {}
    connectForm.classList.add('hidden');
    if (connectSucc) connectSucc.classList.add('show');
  });
}

/* ── PRAYER FORM EMAIL SUBMISSION ───────────────────────────── */
// Update existing prayer form to actually send email
const prayerFormEl = document.getElementById('prayer-form');
if (prayerFormEl) {
  // Re-attach submit to also send real email
  prayerFormEl.addEventListener('submit', async function prayerSend(e) {
    // The existing handler calls preventDefault first; this piggybacks on it
    const name  = prayerFormEl.querySelector('[name="name"]')?.value.trim();
    const email = prayerFormEl.querySelector('[name="email"]')?.value.trim();
    const req   = prayerFormEl.querySelector('[name="prayer"]')?.value.trim();
    if (!name || !email || !req) return;
    try {
      await fetch('https://formsubmit.co/ajax/followup@lhcoshawa.ca', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name, email,
          'prayer-request': req,
          _subject: `Prayer Request — ${name}`,
          _captcha: false
        })
      });
    } catch (_) {}
  });
}

/* ================================================================
   LIGHTHOUSE CHURCH — ENHANCED ANIMATIONS MODULE
   ================================================================ */

/* ── HERO PARTICLE CANVAS ────────────────────────────────────── */
function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], raf;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.reset = function() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.2 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.18;
      this.vy = -Math.random() * 0.22 - 0.06;
      this.alpha = 0;
      this.maxAlpha = Math.random() * 0.45 + 0.15;
      this.life = 0;
      this.maxLife = Math.random() * 300 + 200;
    };
    this.reset();
    this.life = Math.random() * this.maxLife; // stagger initial
  }

  Particle.prototype.update = function() {
    this.life++;
    if (this.life > this.maxLife) { this.reset(); return; }
    const progress = this.life / this.maxLife;
    this.alpha = progress < 0.2
      ? (progress / 0.2) * this.maxAlpha
      : progress > 0.8
        ? ((1 - progress) / 0.2) * this.maxAlpha
        : this.maxAlpha;
    this.x += this.vx;
    this.y += this.vy;
  };

  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(201,169,110,${this.alpha})`;
    ctx.fill();
  };

  function init() {
    resize();
    const count = Math.min(80, Math.floor((W * H) / 14000));
    particles = Array.from({ length: count }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    raf = requestAnimationFrame(loop);
  }

  init();
  loop();
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); init(); loop(); });
}

/* ── COUNTDOWN WITH FLIP ANIMATION ──────────────────────────── */
(function patchCountdown() {
  const origInit = window.initCountdown || (() => {});
  // Override tick to add flip class
  const _origFn = initCountdown;
  window.initCountdown = function() {
    const cdDays = document.getElementById('cd-days');
    const cdHrs  = document.getElementById('cd-hrs');
    const cdMins = document.getElementById('cd-mins');
    const cdSecs = document.getElementById('cd-secs');
    const cdNext = document.getElementById('cd-next');
    if (!cdDays) return;

    const prev = { d: null, h: null, mi: null, s: null };

    function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

    function flip(el, val) {
      if (!el) return;
      const v = pad(val);
      if (el.textContent !== v) {
        el.classList.remove('flipping');
        void el.offsetWidth; // reflow
        el.textContent = v;
        el.classList.add('flipping');
      }
    }

    function tick() {
      const { service, msToNext } = getNextService();
      if (cdNext) cdNext.textContent = service.label;
      let rem = Math.floor(msToNext / 1000);
      const d  = Math.floor(rem / 86400); rem %= 86400;
      const h  = Math.floor(rem / 3600);  rem %= 3600;
      const mi = Math.floor(rem / 60);
      const s  = rem % 60;
      flip(cdDays, d);
      flip(cdHrs,  h);
      flip(cdMins, mi);
      flip(cdSecs, s);
    }
    tick();
    setInterval(tick, 1000);
  };
})();

/* ── MAGNETIC BUTTONS ────────────────────────────────────────── */
function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return; // skip touch devices
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * 0.18;
      const dy = (e.clientY - cy) * 0.18;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
      const span = btn.querySelector('span');
      if (span) span.style.transform = `translate(${dx * 0.5}px, ${dy * 0.5}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      const span = btn.querySelector('span');
      if (span) span.style.transform = '';
    });
  });
}

/* ── RIPPLE CLICK EFFECT ─────────────────────────────────────── */
function initRippleButtons() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.classList.add('btn-ripple');
    btn.addEventListener('click', e => {
      const rect = btn.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      circle.className = 'ripple-circle';
      circle.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top  - size / 2}px;
      `;
      btn.appendChild(circle);
      circle.addEventListener('animationend', () => circle.remove());
    });
  });
}

/* ── PARALLAX SCROLL ─────────────────────────────────────────── */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        // Subtle parallax on hero bg (supplement the CSS fixed attachment)
        const heroSection = heroBg.parentElement;
        if (heroSection) {
          const heroH = heroSection.offsetHeight;
          if (scrolled < heroH) {
            const pct = scrolled / heroH;
            heroBg.style.transform = `scale(1) translateY(${pct * 30}px)`;
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ── ENHANCED SCROLL REVEALS ─────────────────────────────────── */
function initEnhancedReveals() {
  const opts = { threshold: 0.06, rootMargin: '0px 0px -40px 0px' };
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        obs.unobserve(e.target);
      }
    });
  }, opts);

  document.querySelectorAll('.reveal-blur, .reveal-up, .section-fade-in, .stagger-children, .pull-quote-line').forEach(el => {
    obs.observe(el);
  });

  // Eyebrow lines
  document.querySelectorAll('.eyebrow').forEach(el => obs.observe(el));
}

/* ── TILT EFFECT ON CARDS ────────────────────────────────────── */
function initTiltCards() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.feature-card, .service-card').forEach(card => {
    card.classList.add('tilt-card');
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
      card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ── COUNTER ANIMATION ───────────────────────────────────────── */
function initCounterAnimations() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.getAttribute('data-count') || '0', 10);
      const duration = 1800;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + (el.getAttribute('data-suffix') || '');
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
}

/* ── ENHANCED MOBILE MENU ────────────────────────────────────── */
function initEnhancedMobileMenu() {
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
  mobileLinks.forEach((a, i) => {
    a.style.transitionDelay = `${0.05 + i * 0.05}s`;
  });
}

/* ── SMOOTH SEARCH OVERLAY ───────────────────────────────────── */
(function patchSearch() {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  // Override with improved styles
  overlay.style.backdropFilter = 'blur(24px) saturate(150%)';
})();

/* ── INIT ALL ENHANCEMENTS ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHeroParticles();
  initMagneticButtons();
  initRippleButtons();
  initParallax();
  initEnhancedReveals();
  initTiltCards();
  initCounterAnimations();
  initEnhancedMobileMenu();
});
