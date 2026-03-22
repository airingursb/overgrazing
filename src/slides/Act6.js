// ACT 6: 噪音与宽容 — 错误如何改变一切
import { nextSlide } from '../core/Slideshow.js';
import { text, button, appendAnimated, createSlider } from '../core/UI.js';
import { runEvolution, DEFAULT_PARAMS, MODERATE, OVERFISH } from '../sims/Commons.js';
import { Copyfish, Forgiving, Simpleton, Random, Greedy, Moderate, CORE_STRATEGIES, EXTENDED_STRATEGIES } from '../sims/Strategies.js';
import { createEvolutionChart } from '../core/Chart.js';
import { t } from '../core/I18n.js';

// Create noisy versions of strategies
function addNoise(strategy, noiseRate) {
  return {
    ...strategy,
    name: strategy.name,
    play(myH, theirH, pop, params) {
      const decision = strategy.play(myH, theirH, pop, params);
      if (Math.random() < noiseRate) {
        return decision === MODERATE ? OVERFISH : MODERATE;
      }
      return decision;
    },
  };
}

// Slide: Copyfish's fatal flaw
export const Act6_Noise = {
  id: 'act6-noise',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #1a1a2e 0%, #0d1b2a 100%)';

    const title = document.createElement('div');
    title.className = 'text-highlight';
    title.textContent = t('act6.title');
    appendAnimated(content, title, 0);

    appendAnimated(content, text(
      t('act6.intro1')
    ), 400);

    appendAnimated(content, text(
      t('act6.intro2')
    ), 800);

    appendAnimated(content, text(
      t('act6.intro3')
    ), 1400);

    appendAnimated(content, text(
      t('act6.intro4')
    ), 2000);

    const noiseSlider = createSlider(t('act6.slider'), 0, 50, 0, 1, (val) => {
      runNoiseSim(val / 100);
    });
    appendAnimated(content, noiseSlider, 2400);

    const chartArea = document.createElement('div');
    chartArea.style.cssText = 'width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;';
    content.appendChild(chartArea);

    const infoText = document.createElement('div');
    infoText.style.cssText = 'font-size:14px;color:rgba(255,255,255,0.5);text-align:center;';
    content.appendChild(infoText);

    const noisyStrategies = () => EXTENDED_STRATEGIES;

    const runNoiseSim = (noise) => {
      chartArea.innerHTML = '';

      const strategies = EXTENDED_STRATEGIES.map(s => addNoise(s, noise));
      const params = { ...DEFAULT_PARAMS, K: 40, moderateCatch: 3, overfishCatch: 6 };
      // Moderate, Greedy, Copyfish, Grudger, Detective, Forgiving, Simpleton, Random
      const initialPop = [5, 3, 4, 3, 2, 4, 3, 1];
      const result = runEvolution(strategies, initialPop, 12, 8, params);

      const chart = createEvolutionChart(result.history, EXTENDED_STRATEGIES);
      chartArea.appendChild(chart);
      chart._draw(result.history.length);

      const noisePercent = Math.round(noise * 100);
      if (noisePercent === 0) {
        infoText.innerHTML = t('act6.zero');
      } else if (noisePercent <= 5) {
        infoText.innerHTML = t('act6.low').replace('{n}', noisePercent);
      } else if (noisePercent <= 15) {
        infoText.innerHTML = t('act6.mid').replace('{n}', noisePercent);
      } else {
        infoText.innerHTML = t('act6.high').replace('{n}', noisePercent);
      }
    };

    setTimeout(() => runNoiseSim(0), 2800);

    setTimeout(() => {
      appendAnimated(content, text(
        t('act6.findings')
      ), 0);

      appendAnimated(content, text(
        t('act6.transition')
      ), 600);

      const nextBtn = button(t('act6.next'), 'btn-primary', () => nextSlide());
      appendAnimated(content, nextBtn, 1200);
    }, 4500);
  },
};
