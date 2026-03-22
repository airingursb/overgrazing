// ACT 0: 序章 — 真实的悲剧
import { nextSlide } from '../core/Slideshow.js';
import { text, button, appendAnimated, wait } from '../core/UI.js';
import { createScratchCard } from '../core/Scratch.js';
import { createLineChart } from '../core/Chart.js';

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

    appendAnimated(content, text('1497年，意大利探险家约翰·卡伯特驶向北美东海岸。'), 0);
    appendAnimated(content, text('他发现了一片海域——鳕鱼多到令人难以置信。<br>据说，只要把篮子放入水中，就能捞起满满的鱼。'), 600);
    appendAnimated(content, text('这片海域叫做<strong>"纽芬兰大浅滩"</strong>。'), 1200);
    appendAnimated(content, text('此后五百年，鳕鱼养活了整个地区。<br>渔民世代相传，小镇因鱼而繁荣。'), 1800);

    // Scratch card
    const scratch = createScratchCard(`
      <div style="line-height:2.2">
        <strong style="color:#f39c12">1968年</strong>：捕获量达到历史峰值——<strong>81万吨</strong>。<br>
        <strong style="color:#e67e22">1975年</strong>：鱼群开始明显减少。<br>
        <strong style="color:#e74c3c">1992年</strong>：鳕鱼数量跌至历史水平的 <strong>1%</strong>。<br><br>
        加拿大政府宣布<strong style="color:#e74c3c">全面禁渔</strong>。<br><br>
        一夜之间，<strong>4万人失业</strong>。<br>
        数百个沿海社区陷入绝境。<br>
        一个延续了五百年的产业，就此终结。
      </div>
    `);
    appendAnimated(content, scratch, 2400);

    // Wait for scratch, then show chart button
    scratch._promise.then(() => {
      const nextBtn = button('看看数据 →', 'btn-next', () => nextSlide());
      appendAnimated(content, nextBtn, 200);
    });
  },
};

// Slide: Data visualization
export const Act0_Chart = {
  id: 'act0-chart',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #1a2a3a 0%, #0d1b2a 100%)';

    appendAnimated(content, text('这张图展示了纽芬兰鳕鱼的捕获量变化：'), 0);

    const chart = createLineChart(codData, {
      labels: codLabels,
      yLabel: '捕获量（万吨）',
      color: '#4da8da',
      animate: true,
      annotations: [
        { index: 27, text: '峰值: 81万吨', color: '#f39c12' },
        { index: 18, text: '拖网渔船出现', color: '#95a5a6' },
        { index: 42, text: '禁渔令', color: '#e74c3c' },
      ],
    });
    appendAnimated(content, chart, 400);

    chart._promise.then(() => {
      appendAnimated(content, text(
        '超级拖网渔船用15年捕获的鱼，<br>等于之前<strong>103年</strong>的总量。'
      ), 200);
      appendAnimated(content, text(
        '每个渔民都想多捕一点，这很"理性"。<br>但所有人都这么做的时候……'
      ), 800);

      setTimeout(() => {
        const nextBtn = button('继续 →', 'btn-next', () => nextSlide());
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

    appendAnimated(content, text('这不只是纽芬兰的故事。'), 0);
    appendAnimated(content, text(
      '全球 <strong>35.5%</strong> 的鱼类种群被过度捕捞。<br>从地中海到南中国海，同样的悲剧在重复上演。'
    ), 600);

    const quote = document.createElement('div');
    quote.className = 'text-quote';
    quote.innerHTML = '1968年，生态学家加勒特·哈丁给这个现象起了一个名字：<br><strong style="font-size:24px;color:#f39c12">"公地悲剧"</strong><br>(The Tragedy of the Commons)';
    appendAnimated(content, quote, 1200);

    appendAnimated(content, text(
      '当一群人共享一份资源，<br>每个人都倾向于多拿一点——<br>直到资源彻底耗尽。'
    ), 1800);

    setTimeout(() => {
      appendAnimated(content, text(
        '这些渔民是坏人吗？<br>不。他们只是在做对自己"最有利"的选择。'
      ), 0);
      appendAnimated(content, text(
        '但如果每个人都做"最有利"的选择，<br>结果却是所有人都输了——'
      ), 600);
      appendAnimated(content, text(
        '<em>这到底是怎么发生的？</em><br>博弈论可以帮我们理解这个问题。'
      ), 1200);

      setTimeout(() => {
        const nextBtn = button('……让我们来玩一个捕鱼游戏。→', 'btn-primary', () => nextSlide());
        nextBtn.style.marginTop = '12px';
        appendAnimated(content, nextBtn, 0);
      }, 1800);
    }, 2400);
  },
};
