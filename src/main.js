// Main entry point — The Evolution of the Commons
import './style.css';
import { initSlideshow, goToSlide, getCurrentIndex, getTotalSlides } from './core/Slideshow.js';
import { subscribe } from './core/PubSub.js';
import { t, getLang, setLang } from './core/I18n.js';
import { initAudio, toggleMute, isMuted, clickSound } from './core/Audio.js';

// Slides
import Cover from './slides/Cover.js';
import { Act0_Intro, Act0_Chart, Act0_Question } from './slides/Act0.js';
import { Act1_Setup, Act1_Choice1, Act1_Choice2, Act1_Reveal } from './slides/Act1.js';
import { Act2_Intro, Act2_Play } from './slides/Act2.js';
import { Act3_Tournament } from './slides/Act3.js';
import { Act4_Evolution } from './slides/Act4.js';
import { Act5_Rounds, Act5_Payoff } from './slides/Act5.js';
import { Act6_Noise } from './slides/Act6.js';
import { Act7_Ostrom } from './slides/Act7.js';
import { Act8_Sandbox } from './slides/Act8.js';
import { Act9_Conclusion } from './slides/Act9.js';

// All slides in order
const slides = [
  Cover,            // 0: Cover
  Act0_Intro,       // 1: Act 0 - Story
  Act0_Chart,       // 2: Act 0 - Data
  Act0_Question,    // 3: Act 0 - Question
  Act1_Setup,       // 4: Act 1 - Setup
  Act1_Choice1,     // 5: Act 1 - First choice
  Act1_Choice2,     // 6: Act 1 - Second choice
  Act1_Reveal,      // 7: Act 1 - Reveal
  Act2_Intro,       // 8: Act 2 - Intro
  Act2_Play,        // 9: Act 2 - Play
  Act3_Tournament,  // 10: Act 3 - Tournament
  Act4_Evolution,   // 11: Act 4 - Evolution
  Act5_Rounds,      // 12: Act 5 - Rounds
  Act5_Payoff,      // 13: Act 5 - Payoff
  Act6_Noise,       // 14: Act 6 - Noise
  Act7_Ostrom,      // 15: Act 7 - Ostrom
  Act8_Sandbox,     // 16: Act 8 - Sandbox
  Act9_Conclusion,  // 17: Act 9 - Conclusion
];

// Audio toggle (top-left)
function createAudioToggle() {
  const btn = document.createElement('button');
  btn.className = 'audio-toggle';
  btn.style.cssText = 'position:fixed;top:16px;left:16px;z-index:1000;background:transparent;border:1px solid rgba(255,255,255,0.2);border-radius:4px;padding:6px 8px;cursor:pointer;color:rgba(255,255,255,0.6);font-size:16px;line-height:1;transition:all 0.2s;';
  const updateIcon = () => {
    btn.innerHTML = isMuted()
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
  };
  updateIcon();
  btn.addEventListener('click', () => {
    toggleMute();
    updateIcon();
  });
  document.body.appendChild(btn);
}

// Language switcher
function createLangSwitcher() {
  const container = document.createElement('div');
  container.className = 'lang-switcher';
  container.style.cssText = 'position:fixed;top:16px;right:16px;z-index:1000;display:flex;gap:4px;';

  const currentLang = getLang();

  ['en', 'zh'].forEach(lang => {
    const btn = document.createElement('button');
    btn.textContent = lang.toUpperCase();
    btn.style.cssText = 'padding:4px 10px;border:1px solid rgba(255,255,255,0.2);background:transparent;color:rgba(255,255,255,0.5);border-radius:4px;cursor:pointer;font-size:12px;font-weight:700;font-family:sans-serif;';
    if (lang === currentLang) {
      btn.classList.add('active');
      btn.style.background = 'rgba(255,255,255,0.15)';
      btn.style.color = '#fff';
      btn.style.borderColor = 'rgba(255,255,255,0.4)';
    }
    btn.addEventListener('click', () => setLang(lang));
    container.appendChild(btn);
  });

  document.body.appendChild(container);
}

// Navigation dots
function createNavDots() {
  const nav = document.createElement('div');
  nav.className = 'nav-dots';

  const acts = [
    { label: t('nav.cover'), slide: 0 },
    { label: t('nav.prologue'), slide: 1 },
    { label: t('nav.ch1'), slide: 4 },
    { label: t('nav.ch2'), slide: 8 },
    { label: t('nav.ch3'), slide: 10 },
    { label: t('nav.ch4'), slide: 11 },
    { label: t('nav.ch5'), slide: 12 },
    { label: t('nav.ch6'), slide: 14 },
    { label: t('nav.ch7'), slide: 15 },
    { label: t('nav.sandbox'), slide: 16 },
    { label: t('nav.finale'), slide: 17 },
  ];

  acts.forEach(act => {
    const dot = document.createElement('div');
    dot.className = 'nav-dot';
    dot.title = act.label;
    dot.addEventListener('click', () => goToSlide(act.slide));
    nav.appendChild(dot);
  });

  document.body.appendChild(nav);

  // Update active dot
  subscribe('slide:change', ({ index }) => {
    const dots = nav.querySelectorAll('.nav-dot');
    dots.forEach((dot, i) => {
      const isActive = index >= acts[i].slide && (i === acts.length - 1 || index < acts[i + 1].slide);
      dot.classList.toggle('active', isActive);
    });
  });
}

// Initialize
function init() {
  const container = document.getElementById('slide-container');
  initSlideshow(container, slides);
  createAudioToggle();
  createLangSwitcher();
  createNavDots();
  initAudio();
  goToSlide(0);

  // Add click sound to all button clicks
  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn, .btn-choice, .bet-option, .rule-card, .nav-dot, .pop-stepper button')) {
      clickSound();
    }
  });
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
