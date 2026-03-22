// ACT 4: 策略的进化 — 重复锦标赛与种群演变
import { nextSlide } from '../core/Slideshow.js';
import { text, button, appendAnimated } from '../core/UI.js';
import { runEvolution, DEFAULT_PARAMS } from '../sims/Commons.js';
import { CORE_STRATEGIES } from '../sims/Strategies.js';
import { createEvolutionChart } from '../core/Chart.js';
import { t } from '../core/I18n.js';

export const Act4_Evolution = {
  id: 'act4-evolution',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';

    const title = document.createElement('div');
    title.className = 'text-highlight';
    title.textContent = t('act4.title');
    appendAnimated(content, title, 0);

    appendAnimated(content, text(t('act4.intro')), 400);

    appendAnimated(content, text(t('act4.pop')), 800);

    // Run evolution
    const params = { ...DEFAULT_PARAMS, K: 40, moderateCatch: 3, overfishCatch: 6 };
    const initialPop = [5, 8, 5, 4, 3]; // Greedy, Moderate, Copyfish, Grudger, Detective
    const evoResult = runEvolution(CORE_STRATEGIES, initialPop, 15, 8, params);

    // Create evolution chart
    const evoChart = createEvolutionChart(evoResult.history, CORE_STRATEGIES);
    appendAnimated(content, evoChart, 1200);

    const progressText = document.createElement('div');
    progressText.style.cssText = 'font-size:14px;color:rgba(255,255,255,0.5);text-align:center;';
    progressText.textContent = t('act4.ready');
    appendAnimated(content, progressText, 1400);

    const playBtn = button(t('act4.play'), 'btn-primary', () => {
      playBtn.style.display = 'none';
      evoChart._animate((frame, total) => {
        progressText.textContent = `${t('act4.gen')} ${frame - 1} / ${total - 1} ${t('act4.gen_suffix')}`;
        if (frame >= total) {
          showConclusion();
        }
      });
    });
    appendAnimated(content, playBtn, 1600);

    const conclusionArea = document.createElement('div');
    conclusionArea.style.cssText = 'width:100%;display:flex;flex-direction:column;align-items:center;gap:16px;';
    content.appendChild(conclusionArea);

    const showConclusion = () => {
      progressText.textContent = t('act4.done');

      // Find dominant strategy
      const finalCounts = evoResult.finalCounts;
      const maxCount = Math.max(...finalCounts);
      const dominantIdx = finalCounts.indexOf(maxCount);
      const dominant = CORE_STRATEGIES[dominantIdx];

      appendAnimated(conclusionArea, text(
        t('act4.dominant') + ` <strong style="color:${dominant.color}">${dominant.emoji} ${dominant.name}</strong> ` + t('act4.dominant2')
      ), 200);

      appendAnimated(conclusionArea, text(t('act4.analysis')), 600);

      appendAnimated(conclusionArea, text(t('act4.lesson')), 1200);

      appendAnimated(conclusionArea, text(t('act4.but')), 1800);

      const nextBtn = button(t('act4.next'), 'btn-primary', () => nextSlide());
      nextBtn.style.marginTop = '8px';
      appendAnimated(conclusionArea, nextBtn, 2400);
    };
  },
};
