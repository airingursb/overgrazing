// ACT 1: 捕鱼的博弈 — 单轮决策
import { nextSlide } from '../core/Slideshow.js';
import { text, button, buttonGroup, appendAnimated, createPond, createBoat, createResultPanel, wait } from '../core/UI.js';
import { t } from '../core/I18n.js';

// Slide 1.1: Setup
export const Act1_Setup = {
  id: 'act1-setup',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';

    const title = document.createElement('div');
    title.className = 'text-highlight';
    title.textContent = t('act1.title');
    appendAnimated(content, title, 0);

    appendAnimated(content, text(t('act1.setup.1')), 400);

    // Show pond
    const pond = createPond(20);
    appendAnimated(content, pond, 800);

    appendAnimated(content, text(t('act1.setup.2')), 1200);

    // Boats
    const boats = document.createElement('div');
    boats.className = 'boats-container';
    boats.appendChild(createBoat(t('act1.setup.you'), '⛵', true));
    boats.appendChild(createBoat(t('act1.setup.boat') + ' A', '🚤'));
    boats.appendChild(createBoat(t('act1.setup.boat') + ' B', '🚤'));
    boats.appendChild(createBoat(t('act1.setup.boat') + ' C', '🚤'));
    appendAnimated(content, boats, 1600);

    setTimeout(() => {
      const nextBtn = button(t('act1.setup.start'), 'btn-next', () => nextSlide());
      appendAnimated(content, nextBtn, 0);
    }, 2000);
  },
};

// Slide 1.2: First choice — others overfish
export const Act1_Choice1 = {
  id: 'act1-choice1',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';

    appendAnimated(content, text(t('act1.c1.premise')), 0);
    appendAnimated(content, text(t('act1.c1.question')), 500);

    const pond = createPond(20);
    appendAnimated(content, pond, 300);

    const btns = buttonGroup(
      button(t('act1.btn.moderate'), 'btn-choice btn-moderate', () => handleChoice(false)),
      button(t('act1.btn.overfish'), 'btn-choice btn-overfish', () => handleChoice(true)),
    );
    appendAnimated(content, btns, 1000);

    const handleChoice = (overfish) => {
      btns.querySelectorAll('.btn').forEach(b => b.disabled = true);

      const playerCatch = overfish ? 5 : 2;
      const othersCatch = 15; // 3 boats × 5
      const totalCatch = playerCatch + othersCatch;
      const remaining = Math.max(0, 20 - totalCatch);
      const playerProfit = playerCatch - 2; // cost = 2

      pond._update(remaining);

      setTimeout(() => {
        if (overfish) {
          appendAnimated(content, text(t('act1.c1.overfish')), 0);
        } else {
          appendAnimated(content, text(t('act1.c1.moderate')), 0);
        }

        const panel = createResultPanel([
          { label: t('act1.label.your_catch'), value: playerCatch + ' ' + t('act1.unit.fish'), type: overfish ? 'warning' : '' },
          { label: t('act1.label.your_profit'), value: playerProfit + ' ' + t('act1.unit.coin'), type: playerProfit > 0 ? 'positive' : 'negative' },
          { label: t('act1.label.others_catch'), value: '15 ' + t('act1.unit.fish') + ' (5 ' + t('act1.unit.per_boat') + ')', type: 'negative' },
          { label: t('act1.label.remaining'), value: remaining + ' ' + t('act1.unit.fish'), type: remaining <= 5 ? 'negative' : 'warning' },
        ]);
        appendAnimated(content, panel, 400);

        setTimeout(() => {
          appendAnimated(content, text(t('act1.c1.lesson')), 0);
          const nextBtn = button(t('act1.c1.next'), 'btn-next', () => nextSlide());
          appendAnimated(content, nextBtn, 600);
        }, 800);
      }, 800);
    };
  },
};

// Slide 1.3: Second choice — others moderate
export const Act1_Choice2 = {
  id: 'act1-choice2',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';

    appendAnimated(content, text(t('act1.c2.premise')), 0);
    appendAnimated(content, text(t('act1.c1.question')), 500);

    const pond = createPond(20);
    appendAnimated(content, pond, 300);

    const btns = buttonGroup(
      button(t('act1.btn.moderate'), 'btn-choice btn-moderate', () => handleChoice(false)),
      button(t('act1.btn.overfish'), 'btn-choice btn-overfish', () => handleChoice(true)),
    );
    appendAnimated(content, btns, 1000);

    const handleChoice = (overfish) => {
      btns.querySelectorAll('.btn').forEach(b => b.disabled = true);

      const playerCatch = overfish ? 5 : 2;
      const othersCatch = 6; // 3 boats × 2
      const totalCatch = playerCatch + othersCatch;
      const remaining = 20 - totalCatch;
      const playerProfit = playerCatch - 2;

      pond._update(remaining);

      setTimeout(() => {
        if (overfish) {
          appendAnimated(content, text(t('act1.c2.overfish')), 0);
        } else {
          appendAnimated(content, text(t('act1.c2.moderate')), 0);
        }

        const panel = createResultPanel([
          { label: t('act1.label.your_catch'), value: playerCatch + ' ' + t('act1.unit.fish'), type: overfish ? 'warning' : '' },
          { label: t('act1.label.your_profit'), value: playerProfit + ' ' + t('act1.unit.coin'), type: playerProfit > 0 ? 'positive' : '' },
          { label: t('act1.label.others_catch'), value: '6 ' + t('act1.unit.fish') + ' (2 ' + t('act1.unit.per_boat') + ')', type: 'positive' },
          { label: t('act1.label.remaining'), value: remaining + ' ' + t('act1.unit.fish'), type: remaining > 10 ? 'positive' : 'warning' },
        ]);
        appendAnimated(content, panel, 400);

        setTimeout(() => {
          appendAnimated(content, text(
            overfish
              ? t('act1.c2.lesson_overfish')
              : t('act1.c2.lesson_moderate')
          ), 0);
          appendAnimated(content, text(t('act1.c2.conclusion')), 600);
          const nextBtn = button(t('act1.c2.next'), 'btn-next', () => nextSlide());
          appendAnimated(content, nextBtn, 1200);
        }, 800);
      }, 800);
    };
  },
};

// Slide 1.4: Reveal the dilemma
export const Act1_Reveal = {
  id: 'act1-reveal',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #1a1a2e 0%, #0d1b2a 100%)';

    const title = document.createElement('div');
    title.className = 'text-highlight';
    title.textContent = t('act1.reveal.title');
    appendAnimated(content, title, 0);

    appendAnimated(content, text(t('act1.reveal.1')), 500);

    appendAnimated(content, text(t('act1.reveal.2')), 1000);

    // Animated collapse
    const pond = createPond(20);
    appendAnimated(content, pond, 1400);

    setTimeout(() => {
      // Animate fish disappearing
      let count = 20;
      const interval = setInterval(() => {
        count = Math.max(0, count - 2);
        pond._update(count);
        if (count <= 0) {
          clearInterval(interval);
          setTimeout(() => {
            appendAnimated(content, text(t('act1.reveal.3')), 0);
            appendAnimated(content, text(t('act1.reveal.4')), 600);
            appendAnimated(content, text(t('act1.reveal.5')), 1200);
            setTimeout(() => {
              appendAnimated(content, text(t('act1.reveal.6')), 0);
              const nextBtn = button(t('act1.reveal.next'), 'btn-primary', () => nextSlide());
              nextBtn.style.marginTop = '8px';
              appendAnimated(content, nextBtn, 600);
            }, 1800);
          }, 400);
        }
      }, 150);
    }, 2000);
  },
};
