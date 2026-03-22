// UI component helpers

// Sequentially reveal text blocks with delay
export function revealTexts(container, delay = 400) {
  const blocks = container.querySelectorAll('.text-block');
  blocks.forEach((block, i) => {
    setTimeout(() => block.classList.add('visible'), delay * (i + 1));
  });
  return delay * (blocks.length + 1);
}

// Create a text block
export function text(content, className = '') {
  const el = document.createElement('div');
  el.className = `text-block ${className}`.trim();
  el.innerHTML = content;
  return el;
}

// Create a button
export function button(label, className = '', onClick) {
  const el = document.createElement('button');
  el.className = `btn ${className}`.trim();
  el.innerHTML = label;
  if (onClick) el.addEventListener('click', onClick);
  return el;
}

// Create a button group
export function buttonGroup(...buttons) {
  const el = document.createElement('div');
  el.className = 'btn-group';
  buttons.forEach(b => el.appendChild(b));
  return el;
}

// Create the fish pond visualization
export function createPond(fishCount, maxFish = 20) {
  const pond = document.createElement('div');
  pond.className = 'pond';

  const label = document.createElement('div');
  label.className = 'pond-label';
  label.textContent = '渔场';
  pond.appendChild(label);

  const count = document.createElement('div');
  count.className = 'pond-count';
  count.textContent = `🐟 × ${fishCount}`;
  pond.appendChild(count);

  // Add fish sprites
  for (let i = 0; i < Math.min(fishCount, 30); i++) {
    const fish = document.createElement('div');
    fish.className = 'fish';
    fish.textContent = '🐟';
    fish.style.left = `${10 + Math.random() * 80}%`;
    fish.style.top = `${20 + Math.random() * 60}%`;
    fish.style.animationDelay = `${Math.random() * 3}s`;
    fish.style.animationDuration = `${2 + Math.random() * 2}s`;
    fish.dataset.index = i;
    pond.appendChild(fish);
  }

  pond._update = (newCount) => {
    count.textContent = `🐟 × ${newCount}`;
    const fishes = pond.querySelectorAll('.fish:not(.caught)');
    const toRemove = fishes.length - Math.min(newCount, 30);
    for (let i = 0; i < toRemove && i < fishes.length; i++) {
      fishes[fishes.length - 1 - i].classList.add('caught');
    }
  };

  return pond;
}

// Create boat display
export function createBoat(name, icon, isPlayer = false) {
  const boat = document.createElement('div');
  boat.className = `boat ${isPlayer ? 'player' : ''}`;

  const iconEl = document.createElement('div');
  iconEl.className = 'boat-icon';
  iconEl.textContent = icon;
  boat.appendChild(iconEl);

  const nameEl = document.createElement('div');
  nameEl.className = 'boat-name';
  nameEl.textContent = name;
  boat.appendChild(nameEl);

  const catchEl = document.createElement('div');
  catchEl.className = 'boat-catch';
  boat.appendChild(catchEl);

  boat._setCatch = (n) => {
    catchEl.textContent = n !== undefined ? `捕获 ${n} 条` : '';
  };

  return boat;
}

// Create result panel
export function createResultPanel(rows) {
  const panel = document.createElement('div');
  panel.className = 'result-panel';
  rows.forEach(({ label, value, type }) => {
    const row = document.createElement('div');
    row.className = 'result-row';
    row.innerHTML = `<span class="label">${label}</span><span class="value ${type || ''}">${value}</span>`;
    panel.appendChild(row);
  });
  return panel;
}

// Create a slider
export function createSlider(label, min, max, value, step, onChange) {
  const group = document.createElement('div');
  group.className = 'slider-group';

  const labelRow = document.createElement('div');
  labelRow.className = 'slider-label';

  const labelText = document.createElement('span');
  labelText.textContent = label;

  const valueText = document.createElement('span');
  valueText.className = 'slider-value';
  valueText.textContent = value;

  labelRow.appendChild(labelText);
  labelRow.appendChild(valueText);
  group.appendChild(labelRow);

  const input = document.createElement('input');
  input.type = 'range';
  input.min = min;
  input.max = max;
  input.value = value;
  input.step = step || 1;
  input.addEventListener('input', () => {
    valueText.textContent = input.value;
    if (onChange) onChange(Number(input.value));
  });
  group.appendChild(input);

  group._setValue = (v) => {
    input.value = v;
    valueText.textContent = v;
  };

  group._getValue = () => Number(input.value);

  return group;
}

// Wait for a specified duration
export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Append element with fade-in
export function appendAnimated(parent, el, delay = 0) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(15px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  parent.appendChild(el);

  setTimeout(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, delay + 50);

  return el;
}

// Clear a container
export function clearContent(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
