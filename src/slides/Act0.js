// ACT 0: 序章 — 真实的悲剧
import { nextSlide } from '../core/Slideshow.js';
import { text, button, appendAnimated, wait } from '../core/UI.js';
import { createScratchCard } from '../core/Scratch.js';
import { createLineChart } from '../core/Chart.js';
import { t } from '../core/I18n.js';

// Cod collapse data (approximate annual catch in 万吨)
const codData = [
  5, 5, 6, 6, 7, 7, 8, 8, 9, 10,    // 1850-1900 (slow growth)
  10, 11, 11, 12, 12, 13, 15, 18, 20, 22,  // 1900-1950
  25, 30, 35, 40, 50, 60, 70, 78, 81, 75,  // 1950-1968 (peak)
  65, 55, 45, 40, 38, 35, 30, 25, 20, 15,  // 1968-1985
  10, 5, 2, 1, 0.5, 0.2, 0.1, 0.1, 0.2, 0.5,  // 1985-2000 (collapse)
  0.8, 1, 1.2, 1.5, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, // 2000-2020
];

const codLabels = [];
for (let y = 1850; y <= 2020; y += (2020 - 1850) / (codData.length - 1)) {
  codLabels.push(Math.round(y).toString());
}

// Slide: Opening narrative
export const Act0_Intro = {
  id: 'act0-intro',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0a2540 0%, #0d1b2a 100%)';

    appendAnimated(content, text(t('act0.intro.1')), 0);
    appendAnimated(content, text(t('act0.intro.2')), 600);
    appendAnimated(content, text(t('act0.intro.3')), 1200);
    appendAnimated(content, text(t('act0.intro.4')), 1800);

    // Scratch card
    const scratch = createScratchCard(t('act0.scratch'));
    appendAnimated(content, scratch, 2400);

    // Wait for scratch, then show chart button
    scratch._promise.then(() => {
      const nextBtn = button(t('act0.chart.btn'), 'btn-next', () => nextSlide());
      appendAnimated(content, nextBtn, 200);
    });
  },
};

// Slide: Data visualization
export const Act0_Chart = {
  id: 'act0-chart',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #1a2a3a 0%, #0d1b2a 100%)';

    appendAnimated(content, text(t('act0.chart.intro')), 0);

    const chart = createLineChart(codData, {
      labels: codLabels,
      yLabel: t('act0.chart.ylabel'),
      color: '#4da8da',
      animate: true,
      annotations: [
        { index: 27, text: t('act0.chart.ann.peak'), color: '#f39c12' },
        { index: 18, text: t('act0.chart.ann.trawl'), color: '#95a5a6' },
        { index: 42, text: t('act0.chart.ann.ban'), color: '#e74c3c' },
      ],
    });
    appendAnimated(content, chart, 400);

    chart._promise.then(() => {
      appendAnimated(content, text(t('act0.chart.text1')), 200);
      appendAnimated(content, text(t('act0.chart.text2')), 800);

      setTimeout(() => {
        const nextBtn = button(t('act0.chart.next'), 'btn-next', () => nextSlide());
        appendAnimated(content, nextBtn, 0);
      }, 1400);
    });
  },
};

// Slide: Core question
export const Act0_Question = {
  id: 'act0-question',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #1a2a3a 0%, #0d1b2a 100%)';

    appendAnimated(content, text(t('act0.q.1')), 0);
    appendAnimated(content, text(t('act0.q.2')), 600);

    const quote = document.createElement('div');
    quote.className = 'text-quote';
    quote.innerHTML = t('act0.q.quote');
    appendAnimated(content, quote, 1200);

    appendAnimated(content, text(t('act0.q.3')), 1800);

    setTimeout(() => {
      appendAnimated(content, text(t('act0.q.4')), 0);
      appendAnimated(content, text(t('act0.q.5')), 600);
      appendAnimated(content, text(t('act0.q.6')), 1200);

      setTimeout(() => {
        const nextBtn = button(t('act0.q.next'), 'btn-primary', () => nextSlide());
        nextBtn.style.marginTop = '12px';
        appendAnimated(content, nextBtn, 0);
      }, 1800);
    }, 2400);
  },
};
