// Cover slide — game title, author, links
import { nextSlide } from '../core/Slideshow.js';
import { button, appendAnimated } from '../core/UI.js';

export default {
  id: 'cover',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0a2540 0%, #0d1b2a 60%, #1a1a2e 100%)';

    // Floating fish background
    const bgFish = document.createElement('div');
    bgFish.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;pointer-events:none;z-index:0;';
    for (let i = 0; i < 15; i++) {
      const f = document.createElement('div');
      f.textContent = '🐟';
      f.style.cssText = `position:absolute;font-size:${12 + Math.random() * 16}px;opacity:${0.05 + Math.random() * 0.1};left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation:swim ${3 + Math.random() * 4}s ease-in-out infinite;animation-delay:${Math.random() * 3}s;`;
      bgFish.appendChild(f);
    }
    slide.appendChild(bgFish);

    content.style.zIndex = '1';
    content.style.gap = '20px';

    // Title
    const title = document.createElement('div');
    title.className = 'text-title';
    title.style.fontSize = '56px';
    title.style.letterSpacing = '12px';
    title.style.lineHeight = '1.4';
    title.innerHTML = '公地的进化';
    content.appendChild(title);

    // Subtitle
    const subtitle = document.createElement('div');
    subtitle.className = 'text-subtitle';
    subtitle.style.marginTop = '-8px';
    subtitle.innerHTML = 'The Evolution of the Commons';
    content.appendChild(subtitle);

    // Divider
    const divider = document.createElement('div');
    divider.style.cssText = 'width:60px;height:2px;background:rgba(77,168,218,0.5);margin:8px 0;';
    content.appendChild(divider);

    // Description
    const desc = document.createElement('div');
    desc.className = 'text-subtitle';
    desc.style.maxWidth = '400px';
    desc.style.lineHeight = '1.8';
    desc.innerHTML = '一个关于"公地悲剧"的互动式可探索解释<br>游玩时间约 25 分钟';
    content.appendChild(desc);

    // Start button
    const startBtn = button('开始 →', 'btn-primary', () => nextSlide());
    startBtn.style.marginTop = '20px';
    startBtn.style.padding = '16px 48px';
    startBtn.style.fontSize = '18px';
    content.appendChild(startBtn);

    // Credits
    const credits = document.createElement('div');
    credits.className = 'cover-credits';
    credits.style.marginTop = '32px';
    credits.innerHTML = `
      灵感来源于 Nicky Case 的 <a href="https://ncase.me/trust/" target="_blank">The Evolution of Trust</a><br>
      Made by <a href="https://ursb.me" target="_blank">Airing</a> ·
      <a href="https://github.com/airingursb/overgrazing" target="_blank">GitHub</a>
    `;
    content.appendChild(credits);
  },

  onstart(slide) {
    const title = slide.querySelector('.text-title');
    const els = slide.querySelectorAll('.slide-content > *');
    els.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(15px)';
      el.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`;
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  },
};
