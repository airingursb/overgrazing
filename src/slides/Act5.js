// ACT 5: 公地的崩溃 — 改变游戏规则
import { nextSlide } from '../core/Slideshow.js';
import { text, button, appendAnimated, createSlider } from '../core/UI.js';
import { runEvolution, DEFAULT_PARAMS } from '../sims/Commons.js';
import { CORE_STRATEGIES } from '../sims/Strategies.js';
import { createEvolutionChart } from '../core/Chart.js';

// Slide 5.1: Rounds matter
export const Act5_Rounds = {
  id: 'act5-rounds',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #1a1a2e 0%, #0d1b2a 100%)';

    const title = document.createElement('div');
    title.className = 'text-highlight';
    title.textContent = '第五章：公地的崩溃';
    appendAnimated(content, title, 0);

    appendAnimated(content, text(
      '在之前的进化中，合作胜出了。<br>但那是因为博弈条件<strong>对合作有利</strong>。<br><br>如果我们改变游戏规则呢？'
    ), 400);

    appendAnimated(content, text(
      '<strong>第一个变量：博弈轮数。</strong><br><br>之前每场比赛 8 轮。如果渔民<strong>不需要长期留在同一渔场</strong>呢？<br>比如工业渔船——捞完就走，明天换个地方。'
    ), 800);

    appendAnimated(content, text('试试调低博弈轮数，看看会发生什么：'), 1200);

    // Slider for rounds
    const roundSlider = createSlider('每场比赛轮数', 1, 15, 8, 1, (val) => {
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
        infoText.innerHTML = `博弈只有 ${rounds} 轮时，<strong style="color:#e74c3c">贪婪号主导了世界</strong>（${greedyPct}%）。<br>来不及报复，合作根本无法建立。`;
      } else if (rounds <= 4) {
        infoText.innerHTML = `${rounds} 轮博弈——合作开始有点机会，但贪婪仍然很强。`;
      } else {
        infoText.innerHTML = `${rounds} 轮博弈——合作策略有足够时间建立信任和报复机制。`;
      }
    };

    // Initial run
    setTimeout(() => runSim(8), 1800);

    setTimeout(() => {
      appendAnimated(content, text(
        '当博弈轮数很少时，就像<strong>工业化捕捞</strong>——<br>渔船不需要和当地社区共存，捞完就走。<br>合作根本来不及建立。'
      ), 0);
      const nextBtn = button('还有另一个变量…… →', 'btn-next', () => nextSlide());
      appendAnimated(content, nextBtn, 600);
    }, 3000);
  },
};

// Slide 5.2: Payoff structure matters
export const Act5_Payoff = {
  id: 'act5-payoff',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #1a1a2e 0%, #0d1b2a 100%)';

    appendAnimated(content, text(
      '<strong>第二个变量：收益结构。</strong><br><br>当鱼变得稀缺时，价格会上涨。<br>这意味着——过度捕捞的诱惑<strong>变得更大</strong>。'
    ), 0);

    appendAnimated(content, text(
      '试试调高稀缺性溢价：'
    ), 400);

    // Slider for scarcity bonus
    const scarcitySlider = createSlider('稀缺性溢价', 0, 3, 0.5, 0.1, (val) => {
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
        infoText.innerHTML = `稀缺性溢价 ×${scarcity}——过度捕捞变得<strong style="color:#e74c3c">极其有利可图</strong>。<br>就像鱼翅贸易：鲨鱼越少，价格越高，捕杀动机越强。`;
      } else if (scarcity >= 1) {
        infoText.innerHTML = `稀缺性溢价 ×${scarcity}——过度捕捞的诱惑在增加。`;
      } else {
        infoText.innerHTML = `稀缺性溢价 ×${scarcity}——鱼价稳定，合作更容易维持。`;
      }
    };

    setTimeout(() => runSim2(0.5), 800);

    setTimeout(() => {
      appendAnimated(content, text(
        '现实中，政府补贴也会扭曲收益结构——<br>全球每年 <strong>350 亿美元</strong>的渔业补贴中，<br>大部分补贴了大型工业渔船，降低了过度捕捞的成本。'
      ), 0);

      const quote = document.createElement('div');
      quote.className = 'text-quote';
      quote.innerHTML = '不是人变坏了，是<strong>游戏规则</strong>变了。<br>当重复互动减少、双赢空间缩小时——<br>合作就会崩溃。';
      appendAnimated(content, quote, 600);

      appendAnimated(content, text(
        '重复博弈和双赢结构很重要。<br><strong>但是</strong>——还有一个致命的问题我一直没提……'
      ), 1200);

      const nextBtn = button('什么问题？ →', 'btn-primary', () => nextSlide());
      appendAnimated(content, nextBtn, 1800);
    }, 2500);
  },
};
