// ACT 6: 噪音与宽容 — 错误如何改变一切
import { nextSlide } from '../core/Slideshow.js';
import { text, button, appendAnimated, createSlider } from '../core/UI.js';
import { runEvolution, DEFAULT_PARAMS, MODERATE, OVERFISH } from '../sims/Commons.js';
import { Copyfish, Forgiving, Simpleton, Random, Greedy, Moderate, CORE_STRATEGIES, EXTENDED_STRATEGIES } from '../sims/Strategies.js';
import { createEvolutionChart } from '../core/Chart.js';

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
    title.textContent = '第六章：噪音与宽容';
    appendAnimated(content, title, 0);

    appendAnimated(content, text(
      '模仿号虽然厉害，但它有一个<strong style="color:#e74c3c">致命的弱点</strong>。'
    ), 400);

    appendAnimated(content, text(
      '想象两艘模仿号在同一片渔场。<br>正常情况下，它们会一直合作——永远和平。<br><br>但如果有一天，其中一艘<strong>不小心</strong>多捞了几条呢？<br>也许是看错了数量，也许是网太大了——总之，是个<strong>意外</strong>。'
    ), 800);

    appendAnimated(content, text(
      '模仿号的反应是什么？<strong>报复。</strong><br>然后对方也报复。然后你再报复……<br><br>一次意外，引发<strong>无限循环的报复战争</strong>。<br>这就是现实中<em>"世仇"</em>和<em>"螺旋升级"</em>的原因。'
    ), 1400);

    appendAnimated(content, text(
      '在真实世界中，"噪音"——误解、意外、信息不完全——<br>是无法避免的。<br><br>试试调节噪音率，看看对进化的影响：'
    ), 2000);

    const noiseSlider = createSlider('噪音率（误操作概率）', 0, 50, 0, 1, (val) => {
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
        infoText.innerHTML = '零噪音——<strong style="color:#3498db">模仿号</strong>表现最好。完美的世界。';
      } else if (noisePercent <= 5) {
        infoText.innerHTML = `${noisePercent}% 噪音——<strong style="color:#9b59b6">宽容号</strong>开始超越模仿号。<br>偶尔的误解需要宽容来化解。`;
      } else if (noisePercent <= 15) {
        infoText.innerHTML = `${noisePercent}% 噪音——模仿号陷入报复螺旋，<br><strong style="color:#9b59b6">宽容号</strong>和<strong style="color:#bdc3c7">憨憨号</strong>更有优势。`;
      } else {
        infoText.innerHTML = `${noisePercent}% 噪音——世界一片混乱。<br>当误解太多时，<strong style="color:#e74c3c">谁都无法建立稳定的合作</strong>。`;
      }
    };

    setTimeout(() => runNoiseSim(0), 2800);

    setTimeout(() => {
      appendAnimated(content, text(
        '<strong>关键发现：</strong><br>' +
        '零噪音 → 模仿号赢（精确报复有效）<br>' +
        '低噪音 → <strong style="color:#9b59b6">宽容号</strong>赢（宽容化解误会）<br>' +
        '高噪音 → 一切崩溃（合作无法建立）'
      ), 0);

      appendAnimated(content, text(
        '噪音会破坏合作。<br><strong>但是</strong>——现实世界中有些渔场却管理得很好！<br>它们是怎么做到的？'
      ), 600);

      const nextBtn = button('让我们看看解决方案 →', 'btn-primary', () => nextSlide());
      appendAnimated(content, nextBtn, 1200);
    }, 4500);
  },
};
