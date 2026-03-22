// ACT 8: 沙盒模式 — 自由实验
import { nextSlide } from '../core/Slideshow.js';
import { text, button, appendAnimated, createSlider } from '../core/UI.js';
import { runEvolution, DEFAULT_PARAMS, MODERATE, OVERFISH } from '../sims/Commons.js';
import { ALL_STRATEGIES } from '../sims/Strategies.js';
import { createEvolutionChart } from '../core/Chart.js';
import { t } from '../core/I18n.js';

export const Act8_Sandbox = {
  id: 'act8-sandbox',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';
    content.style.maxWidth = '900px';

    const title = document.createElement('div');
    title.className = 'text-highlight';
    title.textContent = t('act8.title');
    content.appendChild(title);

    const subtitle = document.createElement('div');
    subtitle.style.cssText = 'font-size:14px;color:rgba(255,255,255,0.5);text-align:center;margin-bottom:8px;';
    subtitle.textContent = t('act8.subtitle');
    content.appendChild(subtitle);

    // Layout
    const layout = document.createElement('div');
    layout.className = 'sandbox-layout';
    content.appendChild(layout);

    // === LEFT: Controls ===
    const controls = document.createElement('div');
    controls.className = 'sandbox-controls';
    layout.appendChild(controls);

    // Population controls
    const popSection = document.createElement('div');
    popSection.className = 'control-section';
    popSection.innerHTML = `<h3>${t('act8.pop_title')}</h3>`;
    controls.appendChild(popSection);

    const popCounts = [3, 4, 4, 3, 2, 3, 2, 1, 3]; // Default counts for each strategy
    const popControls = document.createElement('div');
    popControls.style.cssText = 'display:flex;flex-direction:column;gap:6px;';
    popSection.appendChild(popControls);

    ALL_STRATEGIES.forEach((s, i) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:6px;';

      const icon = document.createElement('span');
      icon.style.cssText = `font-size:16px;min-width:24px;`;
      icon.textContent = s.emoji;
      row.appendChild(icon);

      const name = document.createElement('span');
      name.style.cssText = `font-size:11px;color:${s.color};flex:1;`;
      name.textContent = s.name;
      row.appendChild(name);

      const stepper = document.createElement('div');
      stepper.className = 'pop-stepper';

      const minus = document.createElement('button');
      minus.textContent = '−';
      minus.addEventListener('click', () => {
        if (popCounts[i] > 0) {
          popCounts[i]--;
          countEl.textContent = popCounts[i];
        }
      });

      const countEl = document.createElement('span');
      countEl.className = 'count';
      countEl.textContent = popCounts[i];

      const plus = document.createElement('button');
      plus.textContent = '+';
      plus.addEventListener('click', () => {
        if (popCounts[i] < 15) {
          popCounts[i]++;
          countEl.textContent = popCounts[i];
        }
      });

      stepper.appendChild(minus);
      stepper.appendChild(countEl);
      stepper.appendChild(plus);
      row.appendChild(stepper);

      popControls.appendChild(row);
    });

    // Parameters section
    const paramSection = document.createElement('div');
    paramSection.className = 'control-section';
    paramSection.innerHTML = `<h3>${t('act8.param_title')}</h3>`;
    controls.appendChild(paramSection);

    const roundsSlider = createSlider(t('act8.rounds'), 1, 20, 8, 1);
    paramSection.appendChild(roundsSlider);

    const genSlider = createSlider(t('act8.gens'), 5, 30, 15, 1);
    paramSection.appendChild(genSlider);

    const noiseSlider = createSlider(t('act8.noise'), 0, 50, 5, 1);
    paramSection.appendChild(noiseSlider);

    const scarcitySlider = createSlider(t('act8.scarcity'), 0, 3, 0.5, 0.1);
    paramSection.appendChild(scarcitySlider);

    // Run button
    const runBtn = button(t('act8.run'), 'btn-primary', runSimulation);
    runBtn.style.width = '100%';
    controls.appendChild(runBtn);

    // === RIGHT: Simulation area ===
    const simArea = document.createElement('div');
    simArea.className = 'sandbox-sim';
    layout.appendChild(simArea);

    const chartArea = document.createElement('div');
    chartArea.style.cssText = 'width:100%;';
    simArea.appendChild(chartArea);

    const resultText = document.createElement('div');
    resultText.style.cssText = 'font-size:14px;color:rgba(255,255,255,0.6);line-height:1.8;';
    simArea.appendChild(resultText);

    function runSimulation() {
      chartArea.innerHTML = '';
      resultText.innerHTML = `<em>${t('act8.running')}</em>`;
      runBtn.disabled = true;

      const noise = noiseSlider._getValue() / 100;
      const rounds = roundsSlider._getValue();
      const gens = genSlider._getValue();
      const scarcity = scarcitySlider._getValue();

      // Add noise to strategies
      const strategies = ALL_STRATEGIES.map(s => ({
        ...s,
        play(myH, theirH, pop, params) {
          const decision = s.play(myH, theirH, pop, params);
          if (Math.random() < noise) {
            return decision === MODERATE ? OVERFISH : MODERATE;
          }
          return decision;
        },
      }));

      const params = { ...DEFAULT_PARAMS, K: 40, moderateCatch: 3, overfishCatch: 6, scarcityBonus: scarcity };
      const result = runEvolution(strategies, [...popCounts], gens, rounds, params);

      const chart = createEvolutionChart(result.history, ALL_STRATEGIES, { width: 480, height: 260 });
      chartArea.appendChild(chart);

      // Animate
      chart._animate((frame, total) => {
        if (frame >= total) {
          runBtn.disabled = false;

          // Show results
          const finalCounts = result.finalCounts;
          const total = finalCounts.reduce((a, b) => a + b, 0);
          const winners = finalCounts
            .map((c, i) => ({ count: c, strategy: ALL_STRATEGIES[i] }))
            .filter(x => x.count > 0)
            .sort((a, b) => b.count - a.count);

          let html = `<strong>${t('act8.result_title')}</strong><br>`;
          winners.forEach(w => {
            const pct = Math.round(w.count / total * 100);
            html += `<span style="color:${w.strategy.color}">${w.strategy.emoji} ${w.strategy.name}: ${w.count} (${pct}%)</span><br>`;
          });

          if (winners[0]) {
            html += `<br>${t('act8.dominant').replace('{color}', winners[0].strategy.color).replace('{name}', winners[0].strategy.name)}`;
          }

          resultText.innerHTML = html;
        }
      });
    }

    // Skip button
    const skipArea = document.createElement('div');
    skipArea.style.cssText = 'width:100%;text-align:center;margin-top:16px;';
    content.appendChild(skipArea);

    const skipBtn = button(t('act8.skip'), 'btn-next', () => nextSlide());
    skipArea.appendChild(skipBtn);

    // Auto-run first simulation
    setTimeout(runSimulation, 500);
  },
};
