// ACT 7: 奥斯特罗姆的八条 — 制度设计的力量
import { nextSlide } from '../core/Slideshow.js';
import { text, button, appendAnimated } from '../core/UI.js';
import { t, getOstromRules, getGameTerms } from '../core/I18n.js';

export const Act7_Ostrom = {
  id: 'act7-ostrom',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';

    const title = document.createElement('div');
    title.className = 'text-highlight';
    title.textContent = t('act7.title');
    appendAnimated(content, title, 0);

    appendAnimated(content, text(
      t('act7.intro1')
    ), 400);

    appendAnimated(content, text(
      t('act7.intro2')
    ), 1000);

    appendAnimated(content, text(
      t('act7.intro3')
    ), 1600);

    // Rule cards and drop zone
    const gameArea = document.createElement('div');
    gameArea.style.cssText = 'width:100%;display:flex;flex-direction:column;gap:16px;';
    appendAnimated(content, gameArea, 2200);

    // Rules as cards
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'rule-cards';
    gameArea.appendChild(cardsContainer);

    // Drop zone
    const dropZone = document.createElement('div');
    dropZone.className = 'rule-drop-zone';
    dropZone.innerHTML = t('act7.drop_hint');
    gameArea.appendChild(dropZone);

    // Applied rules list
    const appliedList = document.createElement('div');
    appliedList.style.cssText = 'display:flex;flex-direction:column;gap:8px;';
    gameArea.appendChild(appliedList);

    // Mapping explanation
    const mappingText = document.createElement('div');
    mappingText.style.cssText = 'font-size:14px;color:rgba(255,255,255,0.5);text-align:center;min-height:40px;';
    gameArea.appendChild(mappingText);

    let appliedCount = 0;
    const rules = getOstromRules();

    rules.forEach((rule, idx) => {
      const card = document.createElement('div');
      card.className = 'rule-card';
      card.innerHTML = `<strong>${idx + 1}. ${rules[idx].name}</strong><br><span style="font-size:12px;opacity:0.7">${rules[idx].desc}</span>`;
      card.dataset.ruleId = rule.id;

      card.addEventListener('click', () => {
        if (card.classList.contains('applied')) return;
        card.classList.add('applied');
        appliedCount++;

        // Show effect
        const effectEl = document.createElement('div');
        effectEl.style.cssText = `padding:10px 16px;background:rgba(39,174,96,0.15);border-left:3px solid #27ae60;border-radius:0 8px 8px 0;font-size:14px;color:rgba(255,255,255,0.8);`;
        effectEl.innerHTML = `✅ <strong>${rules[idx].name}</strong> → ${rules[idx].effect}`;
        appliedList.appendChild(effectEl);
        effectEl.style.opacity = '0';
        effectEl.style.transform = 'translateX(-10px)';
        requestAnimationFrame(() => {
          effectEl.style.transition = 'all 0.3s ease';
          effectEl.style.opacity = '1';
          effectEl.style.transform = 'translateX(0)';
        });

        // Update mapping text based on how many rules applied
        const gameTerms = getGameTerms();

        if (appliedCount <= gameTerms.length) {
          mappingText.innerHTML = `<em>${t('act7.game_term_prefix')}${gameTerms[appliedCount - 1]}</em>`;
        }

        if (appliedCount >= 4) {
          dropZone.innerHTML = t('act7.applied');
          dropZone.style.borderColor = '#27ae60';
          dropZone.style.background = 'rgba(39,174,96,0.1)';
        }

        if (appliedCount >= 6 && !gameArea.querySelector('.next-btn-area')) {
          const nextArea = document.createElement('div');
          nextArea.className = 'next-btn-area';
          nextArea.style.cssText = 'text-align:center;margin-top:12px;';
          gameArea.appendChild(nextArea);

          appendAnimated(nextArea, text(
            t('act7.conclusion1')
          ), 0);

          appendAnimated(nextArea, text(
            t('act7.conclusion2')
          ), 600);

          const nextBtn = button(t('act7.next'), 'btn-primary', () => nextSlide());
          appendAnimated(nextArea, nextBtn, 1200);
        }
      });

      cardsContainer.appendChild(card);
    });
  },
};
