// ACT 7: 奥斯特罗姆的八条 — 制度设计的力量
import { nextSlide } from '../core/Slideshow.js';
import { text, button, appendAnimated } from '../core/UI.js';

const OSTROM_RULES = [
  { id: 'boundary', name: '明确的边界', desc: '清楚谁有权使用渔场', effect: '防止外来者搭便车' },
  { id: 'local', name: '本地化规则', desc: '规则由使用者自己制定', effect: '规则适应当地情况' },
  { id: 'participate', name: '集体决策', desc: '所有渔民参与规则制定', effect: '规则被大家接受' },
  { id: 'monitor', name: '监督机制', desc: '有人负责监督执行', effect: '降低偷捕的可能' },
  { id: 'sanction', name: '渐进惩罚', desc: '违规者先警告、再罚款、再禁捕', effect: '威慑但不过度惩罚' },
  { id: 'conflict', name: '冲突解决', desc: '有低成本的争议解决途径', effect: '减少噪音/误解' },
  { id: 'autonomy', name: '自治权', desc: '政府不过度干预', effect: '保持本地灵活性' },
  { id: 'nested', name: '多层治理', desc: '从村到省到国的嵌套制度', effect: '小公地嵌入大公地' },
];

export const Act7_Ostrom = {
  id: 'act7-ostrom',
  build(content, slide) {
    slide.style.background = 'linear-gradient(180deg, #0d2137 0%, #0d1b2a 100%)';

    const title = document.createElement('div');
    title.className = 'text-highlight';
    title.textContent = '第七章：奥斯特罗姆的八条';
    appendAnimated(content, title, 0);

    appendAnimated(content, text(
      '1990年，政治经济学家<strong>埃莉诺·奥斯特罗姆</strong>发表了<br>《公共事物的治理之道》。<br><br>她研究了全球数十个成功管理公地的案例——<br>从瑞士的高山草场，到日本的渔场，到西班牙的灌溉系统。'
    ), 400);

    appendAnimated(content, text(
      '她发现了 <strong>8 条设计原则</strong>，<br>成功的公地治理几乎都遵循这些原则。<br><br>2009年，她因此获得了<strong style="color:#f39c12">诺贝尔经济学奖</strong>——<br>也是第一位获此殊荣的女性。'
    ), 1000);

    appendAnimated(content, text(
      '用博弈论的语言来说，<br>奥斯特罗姆的原则就是在<strong>改变游戏规则</strong>——<br>让合作变得更容易，让背叛变得更困难。<br><br>把这些原则拖到渔场上，看看效果：'
    ), 1600);

    // Rule cards and drop zone
    const gameArea = document.createElement('div');
    gameArea.style.cssText = 'width:100%;display:flex;flex-direction:column;gap:16px;';
    appendAnimated(content, gameArea, 2200);

    // Rules as cards
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'rule-cards';
    gameArea.appendChild(cardsContainer);

    // Drop zone
    const dropZone = document.createElement('div');
    dropZone.className = 'rule-drop-zone';
    dropZone.innerHTML = '👇 点击规则卡片应用到渔场';
    gameArea.appendChild(dropZone);

    // Applied rules list
    const appliedList = document.createElement('div');
    appliedList.style.cssText = 'display:flex;flex-direction:column;gap:8px;';
    gameArea.appendChild(appliedList);

    // Mapping explanation
    const mappingText = document.createElement('div');
    mappingText.style.cssText = 'font-size:14px;color:rgba(255,255,255,0.5);text-align:center;min-height:40px;';
    gameArea.appendChild(mappingText);

    let appliedCount = 0;

    OSTROM_RULES.forEach((rule, idx) => {
      const card = document.createElement('div');
      card.className = 'rule-card';
      card.innerHTML = `<strong>${idx + 1}. ${rule.name}</strong><br><span style="font-size:12px;opacity:0.7">${rule.desc}</span>`;
      card.dataset.ruleId = rule.id;

      card.addEventListener('click', () => {
        if (card.classList.contains('applied')) return;
        card.classList.add('applied');
        appliedCount++;

        // Show effect
        const effectEl = document.createElement('div');
        effectEl.style.cssText = `padding:10px 16px;background:rgba(39,174,96,0.15);border-left:3px solid #27ae60;border-radius:0 8px 8px 0;font-size:14px;color:rgba(255,255,255,0.8);`;
        effectEl.innerHTML = `✅ <strong>${rule.name}</strong> → ${rule.effect}`;
        appliedList.appendChild(effectEl);
        effectEl.style.opacity = '0';
        effectEl.style.transform = 'translateX(-10px)';
        requestAnimationFrame(() => {
          effectEl.style.transition = 'all 0.3s ease';
          effectEl.style.opacity = '1';
          effectEl.style.transform = 'translateX(0)';
        });

        // Update mapping text based on how many rules applied
        const gameTerms = [
          '增加了重复博弈的轮数（渔民留在社区）',
          '降低了噪音（监督减少误解）',
          '提高了合作的收益（集体决策优化产出）',
          '增加了背叛的成本（渐进惩罚机制）',
          '引入了"守护号"角色（制度化的资源保护）',
        ];

        if (appliedCount <= gameTerms.length) {
          mappingText.innerHTML = `<em>博弈论翻译：${gameTerms[appliedCount - 1]}</em>`;
        }

        if (appliedCount >= 4) {
          dropZone.innerHTML = '🎉 制度设计正在改变游戏规则！';
          dropZone.style.borderColor = '#27ae60';
          dropZone.style.background = 'rgba(39,174,96,0.1)';
        }

        if (appliedCount >= 6 && !gameArea.querySelector('.next-btn-area')) {
          const nextArea = document.createElement('div');
          nextArea.className = 'next-btn-area';
          nextArea.style.cssText = 'text-align:center;margin-top:12px;';
          gameArea.appendChild(nextArea);

          appendAnimated(nextArea, text(
            '奥斯特罗姆证明了：<strong>公地悲剧不是注定的</strong>。<br>好的制度设计可以让合作成为均衡——<br>不需要把人变好，只需要把<em>游戏规则</em>变好。'
          ), 0);

          appendAnimated(nextArea, text(
            '了解了这些原则。<br>现在，<strong>你来设计自己的渔场规则</strong>！'
          ), 600);

          const nextBtn = button('进入沙盒模式 →', 'btn-primary', () => nextSlide());
          appendAnimated(nextArea, nextBtn, 1200);
        }
      });

      cardsContainer.appendChild(card);
    });
  },
};
