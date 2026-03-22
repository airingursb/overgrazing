// ACT 3: 渔场锦标赛 — 策略对抗
import { nextSlide } from '../core/Slideshow.js';
import { text, button, appendAnimated } from '../core/UI.js';
import { runTournament, DEFAULT_PARAMS } from '../sims/Commons.js';
import { CORE_STRATEGIES } from '../sims/Strategies.js';
import { createBarChart } from '../core/Chart.js';

// Slide: Bet and tournament
export const Act3_Tournament = {
  id: 'act3-tournament',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';

    const title = document.createElement('div');
    title.className = 'text-highlight';
    title.textContent = '第三章：渔场锦标赛';
    appendAnimated(content, title, 0);

    appendAnimated(content, text(
      '现在，让 5 种策略互相对战。<br>每对选手进行 <strong>10 轮</strong>比赛，共 10 场配对赛。<br>统计每个角色的<strong>总收益</strong>。'
    ), 400);

    appendAnimated(content, text('<em>在开始之前——你觉得谁会赢？</em>'), 800);

    // Betting
    const betArea = document.createElement('div');
    betArea.className = 'bet-options';
    let selectedBet = null;

    CORE_STRATEGIES.forEach(s => {
      const opt = document.createElement('div');
      opt.className = 'bet-option';
      opt.innerHTML = `${s.emoji} ${s.name}`;
      opt.style.borderColor = s.color + '40';
      opt.addEventListener('click', () => {
        betArea.querySelectorAll('.bet-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        opt.style.borderColor = s.color;
        selectedBet = s.name;
        startBtn.style.display = 'inline-flex';
      });
      betArea.appendChild(opt);
    });
    appendAnimated(content, betArea, 1200);

    const startBtn = button('开始锦标赛 →', 'btn-primary', () => runTournamentAnim());
    startBtn.style.display = 'none';
    appendAnimated(content, startBtn, 1400);

    const resultArea = document.createElement('div');
    resultArea.style.cssText = 'width:100%;display:flex;flex-direction:column;gap:16px;align-items:center;';
    content.appendChild(resultArea);

    const runTournamentAnim = () => {
      startBtn.style.display = 'none';
      betArea.style.pointerEvents = 'none';
      betArea.style.opacity = '0.5';

      // Run tournament
      const params = { ...DEFAULT_PARAMS, K: 40, moderateCatch: 3, overfishCatch: 6 };
      const result = runTournament(CORE_STRATEGIES, 10, params);

      appendAnimated(resultArea, text('锦标赛进行中……'), 0);

      setTimeout(() => {
        resultArea.innerHTML = '';

        // Show bar chart
        const bars = createBarChart(
          result.ranking.map(r => ({
            name: CORE_STRATEGIES[r.index].name,
            icon: CORE_STRATEGIES[r.index].emoji,
            score: r.score,
            color: CORE_STRATEGIES[r.index].color,
          }))
        );
        appendAnimated(resultArea, bars, 0);

        // Winner announcement
        const winner = CORE_STRATEGIES[result.ranking[0].index];
        setTimeout(() => {
          const betCorrect = selectedBet === winner.name;
          appendAnimated(resultArea, text(
            `🏆 冠军是 <strong style="color:${winner.color}">${winner.emoji} ${winner.name}</strong>！` +
            (betCorrect ? '<br><span style="color:#27ae60">你猜对了！</span>' : `<br><span style="color:#e74c3c">你选的是 ${selectedBet}——没关系。</span>`)
          ), 0);

          appendAnimated(resultArea, text(
            winner.name === '模仿号'
              ? '<strong>模仿号</strong>赢了！它不是最聪明的，<br>但"以牙还牙"在重复博弈中是最稳定的策略。<br>它对合作者合作，对贪婪者报复——简单而有效。'
              : `<strong>${winner.name}</strong>赢了这次锦标赛！<br>在不同参数下，结果可能不同。`
          ), 600);

          appendAnimated(resultArea, text(
            '模仿号赢了一次锦标赛。<br>但如果我们<strong>反复进行</strong>锦标赛呢？<br>让赢家繁殖，让输家淘汰——就像<em>自然选择</em>一样。'
          ), 1200);

          const nextBtn = button('看看进化会发生什么 →', 'btn-primary', () => nextSlide());
          nextBtn.style.marginTop = '8px';
          appendAnimated(resultArea, nextBtn, 1800);
        }, 1000);
      }, 1500);
    };
  },
};
