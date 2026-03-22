// ACT 2: 重复的海洋 — 多轮捕鱼与策略角色
import { nextSlide } from '../core/Slideshow.js';
import { text, button, buttonGroup, appendAnimated, createPond, createResultPanel } from '../core/UI.js';
import { MODERATE, OVERFISH, runRound, regenerate, DEFAULT_PARAMS } from '../sims/Commons.js';
import { Greedy, Moderate, Copyfish, Grudger, Detective, CORE_STRATEGIES } from '../sims/Strategies.js';

function createCharacterCard(strategy) {
  const card = document.createElement('div');
  card.style.cssText = `display:flex;align-items:center;gap:12px;padding:14px 18px;background:${strategy.color}20;border:2px solid ${strategy.color}60;border-radius:12px;width:100%;`;
  card.innerHTML = `
    <span style="font-size:28px">${strategy.emoji}</span>
    <div>
      <div style="font-weight:700;color:${strategy.color};font-size:15px">${strategy.name}</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.6)">${strategy.description}</div>
    </div>
  `;
  return card;
}

// Slide: Intro to repeated games
export const Act2_Intro = {
  id: 'act2-intro',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';

    const title = document.createElement('div');
    title.className = 'text-highlight';
    title.textContent = '第二章：重复的海洋';
    appendAnimated(content, title, 0);

    appendAnimated(content, text(
      '现在，不只是一轮——你要和对手<strong>反复博弈</strong>。<br>每轮结束后，鱼群会<strong>繁殖恢复</strong>。'
    ), 400);

    appendAnimated(content, text(
      '渔场初始 <strong>40 条鱼</strong>，承载力 40 条。<br>每轮两艘船同时选择节制（3条）或过度（6条）。<br>然后鱼群按自然规律繁殖。'
    ), 800);

    appendAnimated(content, text(
      '你将依次对战 <strong>5 位不同策略</strong>的对手。<br>先来认识一下他们：'
    ), 1200);

    setTimeout(() => {
      CORE_STRATEGIES.forEach((s, i) => {
        appendAnimated(content, createCharacterCard(s), i * 200);
      });

      setTimeout(() => {
        const nextBtn = button('开始对战 →', 'btn-primary', () => nextSlide());
        appendAnimated(content, nextBtn, 0);
      }, CORE_STRATEGIES.length * 200 + 400);
    }, 1600);
  },
};

// Slide: Play against each opponent
export const Act2_Play = {
  id: 'act2-play',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';

    const opponents = [...CORE_STRATEGIES];
    let opponentIndex = 0;
    let roundNum = 0;
    let population = 40;
    let playerScore = 0;
    let opponentScore = 0;
    let playerHistory = [];
    let opponentHistory = [];
    const maxRounds = 6;

    const statusBar = document.createElement('div');
    statusBar.style.cssText = 'width:100%;display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,0.5);';
    content.appendChild(statusBar);

    const updateStatus = () => {
      const opp = opponents[opponentIndex];
      statusBar.innerHTML = `
        <span>对手: <strong style="color:${opp.color}">${opp.emoji} ${opp.name}</strong> (${opponentIndex + 1}/${opponents.length})</span>
        <span>第 ${roundNum + 1}/${maxRounds} 轮</span>
      `;
    };

    const mainArea = document.createElement('div');
    mainArea.style.cssText = 'width:100%;display:flex;flex-direction:column;align-items:center;gap:16px;';
    content.appendChild(mainArea);

    const scoreBoard = document.createElement('div');
    scoreBoard.style.cssText = 'width:100%;display:flex;justify-content:space-around;padding:12px;background:rgba(255,255,255,0.05);border-radius:12px;';
    content.appendChild(scoreBoard);

    const updateScore = () => {
      scoreBoard.innerHTML = `
        <div style="text-align:center"><div style="font-size:12px;color:rgba(255,255,255,0.4)">你的总分</div><div style="font-size:22px;font-weight:700;color:#4da8da">${Math.round(playerScore * 10) / 10}</div></div>
        <div style="text-align:center"><div style="font-size:12px;color:rgba(255,255,255,0.4)">鱼群</div><div style="font-size:22px;font-weight:700;color:${population > 20 ? '#27ae60' : population > 10 ? '#f39c12' : '#e74c3c'}">${Math.round(population)}</div></div>
        <div style="text-align:center"><div style="font-size:12px;color:rgba(255,255,255,0.4)">对手总分</div><div style="font-size:22px;font-weight:700;color:${opponents[opponentIndex].color}">${Math.round(opponentScore * 10) / 10}</div></div>
      `;
    };

    const startMatch = () => {
      roundNum = 0;
      population = 40;
      playerScore = 0;
      opponentScore = 0;
      playerHistory = [];
      opponentHistory = [];
      updateStatus();
      updateScore();
      showRound();
    };

    const showRound = () => {
      mainArea.innerHTML = '';

      if (roundNum >= maxRounds || population <= 5) {
        endMatch();
        return;
      }

      updateStatus();

      const pondEl = createPond(Math.round(population), 40);
      mainArea.appendChild(pondEl);

      const btns = buttonGroup(
        button('🟢 节制（3条）', 'btn-choice btn-moderate', () => playRound(MODERATE)),
        button('🔴 过度（6条）', 'btn-choice btn-overfish', () => playRound(OVERFISH)),
      );
      mainArea.appendChild(btns);
    };

    const playRound = (playerChoice) => {
      const opp = opponents[opponentIndex];
      const oppChoice = opp.play(opponentHistory, playerHistory, population, DEFAULT_PARAMS);

      const params = { ...DEFAULT_PARAMS, K: 40, moderateCatch: 3, overfishCatch: 6 };
      const result = runRound(population, [playerChoice, oppChoice], params);

      playerScore += result.results[0].profit;
      opponentScore += result.results[1].profit;
      playerHistory.push(playerChoice);
      opponentHistory.push(oppChoice);
      population = result.newPopulation;
      roundNum++;

      // Show round result briefly
      mainArea.innerHTML = '';
      const resultText = document.createElement('div');
      resultText.style.cssText = 'text-align:center;color:rgba(255,255,255,0.8);font-size:15px;padding:20px;';
      resultText.innerHTML = `
        你选择了 <strong style="color:${playerChoice === MODERATE ? '#27ae60' : '#e74c3c'}">${playerChoice === MODERATE ? '节制' : '过度'}</strong> ·
        ${opp.emoji} 选择了 <strong style="color:${oppChoice === MODERATE ? '#27ae60' : '#e74c3c'}">${oppChoice === MODERATE ? '节制' : '过度'}</strong><br>
        <span style="font-size:13px;color:rgba(255,255,255,0.4)">鱼群: ${Math.round(population)} · 你 +${result.results[0].profit.toFixed(1)} · 对手 +${result.results[1].profit.toFixed(1)}</span>
      `;
      mainArea.appendChild(resultText);

      updateScore();

      setTimeout(showRound, 1200);
    };

    const endMatch = () => {
      mainArea.innerHTML = '';
      const opp = opponents[opponentIndex];

      const summary = document.createElement('div');
      summary.style.cssText = 'text-align:center;padding:16px;';
      const won = playerScore > opponentScore;
      summary.innerHTML = `
        <div style="font-size:16px;color:rgba(255,255,255,0.7);margin-bottom:8px">对战 ${opp.emoji} ${opp.name} 结束</div>
        <div style="font-size:20px;font-weight:700;color:${won ? '#27ae60' : '#e74c3c'}">${won ? '你赢了！' : playerScore === opponentScore ? '平局！' : '你输了！'}</div>
        <div style="font-size:14px;color:rgba(255,255,255,0.5);margin-top:8px">你: ${playerScore.toFixed(1)} vs ${opp.name}: ${opponentScore.toFixed(1)} · 鱼群剩余: ${Math.round(population)}</div>
      `;
      mainArea.appendChild(summary);

      if (opponentIndex < opponents.length - 1) {
        const nextBtn = button(`下一位对手: ${opponents[opponentIndex + 1].emoji} ${opponents[opponentIndex + 1].name} →`, 'btn-next', () => {
          opponentIndex++;
          startMatch();
        });
        mainArea.appendChild(nextBtn);
      } else {
        // All opponents done
        setTimeout(() => {
          mainArea.innerHTML = '';
          const finalText = document.createElement('div');
          finalText.style.cssText = 'text-align:center;color:rgba(255,255,255,0.8);font-size:16px;line-height:1.8;';
          finalText.innerHTML = `
            你已经见过了所有 5 种策略。<br><br>
            <strong style="color:#27ae60">节制号</strong>对谁都友好——但容易被占便宜。<br>
            <strong style="color:#e74c3c">贪婪号</strong>短期赚得最多——但鱼塘崩了。<br>
            <strong style="color:#3498db">模仿号</strong>以牙还牙——似乎最"公平"。<br>
            <strong style="color:#f39c12">记仇号</strong>一旦被伤害就永不原谅。<br>
            <strong style="color:#8e6e53">侦探号</strong>先试探，再决定是合作还是剥削。<br><br>
            <em style="color:#4da8da">如果让它们互相对战，谁会赢？</em>
          `;
          mainArea.appendChild(finalText);

          const nextBtn = button('看看锦标赛 →', 'btn-primary', () => nextSlide());
          nextBtn.style.marginTop = '16px';
          mainArea.appendChild(nextBtn);
        }, 800);
      }
    };

    startMatch();
  },
};
