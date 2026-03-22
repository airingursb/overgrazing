// ACT 4: 策略的进化 — 重复锦标赛与种群演变
import { nextSlide } from '../core/Slideshow.js';
import { text, button, appendAnimated } from '../core/UI.js';
import { runEvolution, DEFAULT_PARAMS } from '../sims/Commons.js';
import { CORE_STRATEGIES } from '../sims/Strategies.js';
import { createEvolutionChart } from '../core/Chart.js';

export const Act4_Evolution = {
  id: 'act4-evolution',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';

    const title = document.createElement('div');
    title.className = 'text-highlight';
    title.textContent = '第四章：策略的进化';
    appendAnimated(content, title, 0);

    appendAnimated(content, text(
      '现在我们模拟<strong>进化</strong>。<br>规则很简单：每一代进行锦标赛，<br>得分最低的被淘汰，得分最高的繁殖。'
    ), 400);

    appendAnimated(content, text(
      '初始种群：节制号 ×8、贪婪号 ×5、模仿号 ×5、记仇号 ×4、侦探号 ×3'
    ), 800);

    // Run evolution
    const params = { ...DEFAULT_PARAMS, K: 40, moderateCatch: 3, overfishCatch: 6 };
    const initialPop = [5, 8, 5, 4, 3]; // Greedy, Moderate, Copyfish, Grudger, Detective
    const evoResult = runEvolution(CORE_STRATEGIES, initialPop, 15, 8, params);

    // Create evolution chart
    const evoChart = createEvolutionChart(evoResult.history, CORE_STRATEGIES);
    appendAnimated(content, evoChart, 1200);

    const progressText = document.createElement('div');
    progressText.style.cssText = 'font-size:14px;color:rgba(255,255,255,0.5);text-align:center;';
    progressText.textContent = '准备播放……';
    appendAnimated(content, progressText, 1400);

    const playBtn = button('▶ 播放进化过程', 'btn-primary', () => {
      playBtn.style.display = 'none';
      evoChart._animate((frame, total) => {
        progressText.textContent = `第 ${frame - 1} / ${total - 1} 代`;
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
      progressText.textContent = '进化完成';

      // Find dominant strategy
      const finalCounts = evoResult.finalCounts;
      const maxCount = Math.max(...finalCounts);
      const dominantIdx = finalCounts.indexOf(maxCount);
      const dominant = CORE_STRATEGIES[dominantIdx];

      appendAnimated(conclusionArea, text(
        `经过 15 代进化，<strong style="color:${dominant.color}">${dominant.emoji} ${dominant.name}</strong> 成为了主导策略！`
      ), 200);

      appendAnimated(conclusionArea, text(
        '注意发生了什么：<br>' +
        '<strong style="color:#e74c3c">贪婪号</strong>一开始大量"收割"节制号——但很快，节制号消亡了。<br>' +
        '没有了可以剥削的对象，贪婪号也开始衰落。<br>' +
        '最终，<strong>能对合作者合作、对背叛者报复</strong>的策略存活了下来。'
      ), 600);

      appendAnimated(conclusionArea, text(
        '<em>合作不是因为善良，而是因为它在进化中更有优势。</em>'
      ), 1200);

      appendAnimated(conclusionArea, text(
        '看起来一切都很美好——合作最终胜出了！<br><br><strong>但是</strong>——如果真是这样，为什么现实中到处都是过度捕捞？<br>为什么纽芬兰的鳕鱼还是崩溃了？'
      ), 1800);

      const nextBtn = button('到底哪里出了问题？ →', 'btn-primary', () => nextSlide());
      nextBtn.style.marginTop = '8px';
      appendAnimated(conclusionArea, nextBtn, 2400);
    };
  },
};
