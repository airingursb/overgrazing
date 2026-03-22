// Main entry point — The Evolution of the Commons
import './style.css';
import { initSlideshow, goToSlide, getCurrentIndex, getTotalSlides } from './core/Slideshow.js';
import { subscribe } from './core/PubSub.js';

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

// Navigation dots
function createNavDots() {
  const nav = document.createElement('div');
  nav.className = 'nav-dots';

  const acts = [
    { label: '封面', slide: 0 },
    { label: '序章', slide: 1 },
    { label: '第一章', slide: 4 },
    { label: '第二章', slide: 8 },
    { label: '第三章', slide: 10 },
    { label: '第四章', slide: 11 },
    { label: '第五章', slide: 12 },
    { label: '第六章', slide: 14 },
    { label: '第七章', slide: 15 },
    { label: '沙盒', slide: 16 },
    { label: '终章', slide: 17 },
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
  createNavDots();
  goToSlide(0);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
