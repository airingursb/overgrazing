// ACT 1: 捕鱼的博弈 — 单轮决策
import { nextSlide } from '../core/Slideshow.js';
import { text, button, buttonGroup, appendAnimated, createPond, createBoat, createResultPanel, wait } from '../core/UI.js';

// Slide 1.1: Setup
export const Act1_Setup = {
  id: 'act1-setup',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';

    const title = document.createElement('div');
    title.className = 'text-highlight';
    title.textContent = '第一章：捕鱼的博弈';
    appendAnimated(content, title, 0);

    appendAnimated(content, text('你面前有一片渔场。渔场里有 <strong>20 条鱼</strong>。<br>你和另外 3 艘渔船共享这片海域。'), 400);

    // Show pond
    const pond = createPond(20);
    appendAnimated(content, pond, 800);

    appendAnimated(content, text(
      '每艘船可以选择：<br>🟢 <strong>"节制捕捞"</strong>（捞 2 条）或 🔴 <strong>"过度捕捞"</strong>（捞 5 条）<br>每条鱼值 1 金币，出海成本 2 金币。'
    ), 1200);

    // Boats
    const boats = document.createElement('div');
    boats.className = 'boats-container';
    boats.appendChild(createBoat('你', '⛵', true));
    boats.appendChild(createBoat('渔船 A', '🚤'));
    boats.appendChild(createBoat('渔船 B', '🚤'));
    boats.appendChild(createBoat('渔船 C', '🚤'));
    appendAnimated(content, boats, 1600);

    setTimeout(() => {
      const nextBtn = button('开始第一轮 →', 'btn-next', () => nextSlide());
      appendAnimated(content, nextBtn, 0);
    }, 2000);
  },
};

// Slide 1.2: First choice — others overfish
export const Act1_Choice1 = {
  id: 'act1-choice1',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';

    appendAnimated(content, text('假设其他 3 艘船<strong style="color:#e74c3c">都选择了过度捕捞</strong>，每艘捞 5 条。'), 0);
    appendAnimated(content, text('<em>你怎么选？</em>'), 500);

    const pond = createPond(20);
    appendAnimated(content, pond, 300);

    const btns = buttonGroup(
      button('🟢 节制捕捞（捞 2 条）', 'btn-choice btn-moderate', () => handleChoice(false)),
      button('🔴 过度捕捞（捞 5 条）', 'btn-choice btn-overfish', () => handleChoice(true)),
    );
    appendAnimated(content, btns, 1000);

    const handleChoice = (overfish) => {
      btns.querySelectorAll('.btn').forEach(b => b.disabled = true);

      const playerCatch = overfish ? 5 : 2;
      const othersCatch = 15; // 3 boats × 5
      const totalCatch = playerCatch + othersCatch;
      const remaining = Math.max(0, 20 - totalCatch);
      const playerProfit = playerCatch - 2; // cost = 2

      pond._update(remaining);

      setTimeout(() => {
        if (overfish) {
          appendAnimated(content, text('没错！别人都在拼命捞，你不多捞就亏了。'), 0);
        } else {
          appendAnimated(content, text('很遗憾，你的克制并没有拯救这片渔场。<br>其他人捞了 15 条，你只捞了 2 条。'), 0);
        }

        const panel = createResultPanel([
          { label: '你的捕获', value: `${playerCatch} 条`, type: overfish ? 'warning' : '' },
          { label: '你的利润', value: `${playerProfit} 金币`, type: playerProfit > 0 ? 'positive' : 'negative' },
          { label: '其他船捕获', value: '15 条 (每船 5 条)', type: 'negative' },
          { label: '渔场剩余', value: `${remaining} 条`, type: remaining <= 5 ? 'negative' : 'warning' },
        ]);
        appendAnimated(content, panel, 400);

        setTimeout(() => {
          appendAnimated(content, text(
            '不管怎样，渔场都快完了。<br>但至少过度捕捞让你<strong>"多赚了 3 金币"</strong>。<br><br>因此：在别人过度捕捞时，你<strong>"应该"</strong>也过度捕捞。'
          ), 0);
          const nextBtn = button('再试一次 →', 'btn-next', () => nextSlide());
          appendAnimated(content, nextBtn, 600);
        }, 800);
      }, 800);
    };
  },
};

// Slide 1.3: Second choice — others moderate
export const Act1_Choice2 = {
  id: 'act1-choice2',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';

    appendAnimated(content, text('好，再来一次。<br>这次假设其他 3 艘船<strong style="color:#27ae60">都选择了节制捕捞</strong>，每艘只捞 2 条。'), 0);
    appendAnimated(content, text('<em>你怎么选？</em>'), 500);

    const pond = createPond(20);
    appendAnimated(content, pond, 300);

    const btns = buttonGroup(
      button('🟢 节制捕捞（捞 2 条）', 'btn-choice btn-moderate', () => handleChoice(false)),
      button('🔴 过度捕捞（捞 5 条）', 'btn-choice btn-overfish', () => handleChoice(true)),
    );
    appendAnimated(content, btns, 1000);

    const handleChoice = (overfish) => {
      btns.querySelectorAll('.btn').forEach(b => b.disabled = true);

      const playerCatch = overfish ? 5 : 2;
      const othersCatch = 6; // 3 boats × 2
      const totalCatch = playerCatch + othersCatch;
      const remaining = 20 - totalCatch;
      const playerProfit = playerCatch - 2;

      pond._update(remaining);

      setTimeout(() => {
        if (overfish) {
          appendAnimated(content, text('这有点不厚道……但从数学上看，你是对的。'), 0);
        } else {
          appendAnimated(content, text('看起来是正确的选择……但真的是吗？'), 0);
        }

        const panel = createResultPanel([
          { label: '你的捕获', value: `${playerCatch} 条`, type: overfish ? 'warning' : '' },
          { label: '你的利润', value: `${playerProfit} 金币`, type: playerProfit > 0 ? 'positive' : '' },
          { label: '其他船捕获', value: '6 条 (每船 2 条)', type: 'positive' },
          { label: '渔场剩余', value: `${remaining} 条`, type: remaining > 10 ? 'positive' : 'warning' },
        ]);
        appendAnimated(content, panel, 400);

        setTimeout(() => {
          appendAnimated(content, text(
            overfish
              ? '虽然大家都节制时渔场最健康，<br>但你偷偷多捞一点，赚了最多——<strong>而且渔场也没崩</strong>。'
              : '大家都节制时，渔场还有 12 条鱼，很健康。<br>但如果你偷偷多捞……你能赚更多，渔场也还撑得住。'
          ), 0);
          appendAnimated(content, text(
            '因此：即使别人都节制，你<strong>"应该"</strong>还是过度捕捞。'
          ), 600);
          const nextBtn = button('这意味着什么？ →', 'btn-next', () => nextSlide());
          appendAnimated(content, nextBtn, 1200);
        }, 800);
      }, 800);
    };
  },
};

// Slide 1.4: Reveal the dilemma
export const Act1_Reveal = {
  id: 'act1-reveal',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #1a1a2e 0%, #0d1b2a 100%)';

    const title = document.createElement('div');
    title.className = 'text-highlight';
    title.textContent = '这就是公地的困境';
    appendAnimated(content, title, 0);

    appendAnimated(content, text(
      '不管其他人怎么做——<br><strong>"过度捕捞"对你个人来说，似乎总是更好的选择。</strong>'
    ), 500);

    appendAnimated(content, text('但如果每个人都这么想……'), 1000);

    // Animated collapse
    const pond = createPond(20);
    appendAnimated(content, pond, 1400);

    setTimeout(() => {
      // Animate fish disappearing
      let count = 20;
      const interval = setInterval(() => {
        count = Math.max(0, count - 2);
        pond._update(count);
        if (count <= 0) {
          clearInterval(interval);
          setTimeout(() => {
            appendAnimated(content, text(
              '所有人都赚了 3 金币。但渔场的鱼<strong style="color:#e74c3c">全部捞完了</strong>。<br>没有了鱼，明天就没有收入。'
            ), 0);
            appendAnimated(content, text(
              '如果大家都节制呢？<br>每人赚 0 金币——但渔场还有 12 条鱼。<br>鱼会繁殖，明天还能继续捕。'
            ), 600);
            appendAnimated(content, text(
              '短期来看，贪婪是<strong>"理性"</strong>的。<br>长期来看……'
            ), 1200);
            setTimeout(() => {
              appendAnimated(content, text(
                '等一下。在刚才的游戏里，你只玩了<strong>一轮</strong>。<br>渔场不是一次性的——渔民每天都要出海。<br><em>如果不是一锤子买卖，而是反复博弈呢？</em>'
              ), 0);
              const nextBtn = button('……玩很多很多轮呢？→', 'btn-primary', () => nextSlide());
              nextBtn.style.marginTop = '8px';
              appendAnimated(content, nextBtn, 600);
            }, 1800);
          }, 400);
        }
      }, 150);
    }, 2000);
  },
};
