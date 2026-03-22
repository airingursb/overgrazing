// ACT 5: 公地的崩溃 — 改变游戏规则
import { nextSlide } from '../core/Slideshow.js';
import { text, button, appendAnimated, createSlider } from '../core/UI.js';
import { runEvolution, DEFAULT_PARAMS } from '../sims/Commons.js';
import { CORE_STRATEGIES } from '../sims/Strategies.js';
import { createEvolutionChart } from '../core/Chart.js';
import { t } from '../core/I18n.js';

// Slide 5.1: Rounds matter
export const Act5_Rounds = {
  id: 'act5-rounds',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #1a1a2e 0%, #0d1b2a 100%)';

    const title = document.createElement('div');
    title.className = 'text-highlight';
    title.textContent = t('act5.title');
    appendAnimated(content, title, 0);

    appendAnimated(content, text(t('act5.r.intro')), 400);

    appendAnimated(content, text(t('act5.r.var1')), 800);

    appendAnimated(content, text(t('act5.r.try')), 1200);

    // Slider for rounds
    const roundSlider = createSlider(t('act5.r.slider'), 1, 15, 8, 1, (val) => {
      runSim(val);
    });
    appendAnimated(content, roundSlider, 1400);

    // Chart area
    const chartArea = document.createElement('div');
    chartArea.style.cssText = 'width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;';
    content.appendChild(chartArea);

    const infoText = document.createElement('div');
    infoText.style.cssText = 'font-size:14px;color:rgba(255,255,255,0.5);text-align:center;';
    content.appendChild(infoText);

    const runSim = (rounds) => {
      chartArea.innerHTML = '';
      const params = { ...DEFAULT_PARAMS, K: 40, moderateCatch: 3, overfishCatch: 6 };
      const initialPop = [5, 8, 5, 4, 3];
      const result = runEvolution(CORE_STRATEGIES, initialPop, 12, rounds, params);

      const chart = createEvolutionChart(result.history, CORE_STRATEGIES);
      chartArea.appendChild(chart);
      chart._draw(result.history.length);

      const greedyFinal = result.finalCounts[0];
      const total = result.finalCounts.reduce((a, b) => a + b, 0);
      const greedyPct = total > 0 ? Math.round(greedyFinal / total * 100) : 0;

      if (rounds <= 2) {
        infoText.innerHTML = t('act5.r.low').replace('{n}', rounds).replace('{pct}', greedyPct);
      } else if (rounds <= 4) {
        infoText.innerHTML = t('act5.r.mid').replace('{n}', rounds);
      } else {
        infoText.innerHTML = t('act5.r.high').replace('{n}', rounds);
      }
    };

    // Initial run
    setTimeout(() => runSim(8), 1800);

    setTimeout(() => {
      appendAnimated(content, text(t('act5.r.lesson')), 0);
      const nextBtn = button(t('act5.r.next'), 'btn-next', () => nextSlide());
      appendAnimated(content, nextBtn, 600);
    }, 3000);
  },
};

// Slide 5.2: Payoff structure matters
export const Act5_Payoff = {
  id: 'act5-payoff',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #1a1a2e 0%, #0d1b2a 100%)';

    appendAnimated(content, text(t('act5.p.var2')), 0);

    appendAnimated(content, text(t('act5.p.try')), 400);

    // Slider for scarcity bonus
    const scarcitySlider = createSlider(t('act5.p.slider'), 0, 3, 0.5, 0.1, (val) => {
      runSim2(val);
    });
    appendAnimated(content, scarcitySlider, 600);

    const chartArea = document.createElement('div');
    chartArea.style.cssText = 'width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;';
    content.appendChild(chartArea);

    const infoText = document.createElement('div');
    infoText.style.cssText = 'font-size:14px;color:rgba(255,255,255,0.5);text-align:center;';
    content.appendChild(infoText);

    const runSim2 = (scarcity) => {
      chartArea.innerHTML = '';
      const params = { ...DEFAULT_PARAMS, K: 40, moderateCatch: 3, overfishCatch: 6, scarcityBonus: scarcity };
      const initialPop = [5, 8, 5, 4, 3];
      const result = runEvolution(CORE_STRATEGIES, initialPop, 12, 8, params);

      const chart = createEvolutionChart(result.history, CORE_STRATEGIES);
      chartArea.appendChild(chart);
      chart._draw(result.history.length);

      if (scarcity >= 2) {
        infoText.innerHTML = t('act5.p.high').replace('{v}', scarcity);
      } else if (scarcity >= 1) {
        infoText.innerHTML = t('act5.p.mid').replace('{v}', scarcity);
      } else {
        infoText.innerHTML = t('act5.p.low').replace('{v}', scarcity);
      }
    };

    setTimeout(() => runSim2(0.5), 800);

    setTimeout(() => {
      appendAnimated(content, text(t('act5.p.subsidy')), 0);

      const quote = document.createElement('div');
      quote.className = 'text-quote';
      quote.innerHTML = t('act5.p.quote');
      appendAnimated(content, quote, 600);

      appendAnimated(content, text(t('act5.p.transition')), 1200);

      const nextBtn = button(t('act5.p.next'), 'btn-primary', () => nextSlide());
      appendAnimated(content, nextBtn, 1800);
    }, 2500);
  },
};
