// Nav toggle & smooth scroll
function bindTap(el, handler){
  if (!el) return;
  el.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); handler(e); }, {passive:false});
  el.addEventListener('touchend', (e)=>{ e.preventDefault(); e.stopPropagation(); handler(e); }, {passive:false});
}
function setMobileMenu(open){
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('menu');
  const closeBtn = document.querySelector('.nav__close');
  if (!menu) return;
  menu.classList.toggle('open', !!open);
  if (toggle) toggle.setAttribute('aria-expanded', String(!!open));
  if (closeBtn) closeBtn.style.visibility = open ? 'visible' : 'hidden';
}
document.addEventListener('click', (e) => {
  const toggleBtn = e.target.closest('.nav__toggle');
  const closeBtn  = e.target.closest('.nav__close');
  const anchor    = e.target.closest('a[href^="#"]');

  if (toggleBtn){
    e.preventDefault();
    const menu = document.getElementById('menu');
    const isOpen = !!menu && menu.classList.contains('open');
    setMobileMenu(!isOpen);
    return;
  }
  if (closeBtn){
    e.preventDefault();
    setMobileMenu(false);
    return;
  }
  if (anchor){
    const id = anchor.getAttribute('href');
    const target = document.querySelector(id);
    if (target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      setMobileMenu(false);
    }
  }
});
      setMobileMenu(false);
    }
  }
});
      const menu = document.getElementById('menu');
      menu && menu.classList.remove('open');
    }
  }
});

// Footer year
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// Tabs + catalog render
const PRODUCTS = {
  fert: [
    { title: 'Карбамид (мочевина) 46%', tags: ['N-высокий','Гранулированное'], img: '' },
    { title: 'Аммиачная селитра', tags: ['N-удобрение','Быстрый старт'], img: '' },
    { title: 'Сульфат аммония', tags: ['Азот','Сера'], img: '' },
    { title: 'NPK 16:16:16', tags: ['Комплексное','Универсальное'], img: '' },
    { title: 'Суперфосфат', tags: ['Фосфор','Корнеобразование'], img: '' },
    { title: 'Сульфат калия', tags: ['Калий','Качество плодов'], img: '' }
  ],
  herb: [
    { title: 'Глифосат', tags: ['Системный','Широкий спектр'], img: '' },
    { title: '2,4-Д', tags: ['Злаки','Двудольные'], img: '' },
    { title: 'МЦПА', tags: ['Послевсходовый'], img: '' },
    { title: 'Сульфонилмочевины', tags: ['Низкие нормы','Эффективно'], img: '' }
  ],
  insect: [
    { title: 'Имидаклоприд', tags: ['Системный','Долгоиграющий'], img: '' },
    { title: 'Лямбда-цигалотрин', tags: ['Контактный','Быстрое действие'], img: '' },
    { title: 'Дельтаметрин', tags: ['Широкий спектр'], img: '' }
  ],
  fungi: [
    { title: 'Триазолы', tags: ['Ржавчина','Мучнистая роса'], img: '' },
    { title: 'Стробилурины', tags: ['Профилактика','Продление вегетации'], img: '' }
  ],
  growth: [
    { title: 'Гуматы', tags: ['Стрессоустойчивость','Корни'], img: '' },
    { title: 'Аминокислоты', tags: ['Антистресс','Листовое внесение'], img: '' },
    { title: 'Микроэлементы', tags: ['Zn, B, Mn, Cu','Хелаты'], img: '' }
  ]
};

function renderProducts(key='fert'){
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;
  const items = PRODUCTS[key] || [];
  grid.innerHTML = items.map(p => `
    <article class="product">
      <div class="product__img"></div>
      <div class="product__body">
        <div class="product__title">${p.title}</div>
        <div class="product__tags">${(p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <div class="product__actions">
          <a class="btn btn-outline" href="#cta">Запросить цену</a>
          <a class="btn" href="#calculator">Подбор</a>
        </div>
      </div>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts('fert');
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.tab);
    });
  });
});

// Simple picker (demo logic)
document.getElementById('pickForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const crop = fd.get('crop');
  const area = parseFloat(fd.get('area') || '0');
  const goal = fd.get('goal');
  if (!crop || !area || !goal){
    alert('Пожалуйста, заполните все поля.');
    return;
  }
  const baseDose = { 'Пшеница': 80, 'Кукуруза': 110, 'Подсолнечник': 70, 'Картофель': 130, 'Ячмень': 75 }[crop] || 90;
  const goalAdj = { 'Увеличить урожайность': 1.15, 'Усилить стартовый рост': 1.05, 'Снизить стресс засухи': 1.1, 'Устранить дефицит NPK': 1.2 }[goal] || 1;
  const totalKg = Math.round(baseDose * goalAdj * area);
  const result = document.getElementById('pickResult');
  result.innerHTML = `
    <strong>Рекомендация (черновик):</strong><br>
    • Базовое внесение NPK: <b>${Math.round(baseDose*goalAdj)} кг/га</b><br>
    • Оценочный общий объём на ${area} га: <b>${totalKg} кг</b><br>
    • Рекомендуем уточнить схему с агрономом перед закупкой.
  `;
});

// Lead form (demo)
document.getElementById('leadForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const payload = Object.fromEntries(fd.entries());
  console.log('Lead payload:', payload);
  alert('Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время.');
});

document.addEventListener('DOMContentLoaded', () => {
  // Header may be injected dynamically; poll for buttons briefly
  const tryBind = () => {
    const toggleBtn = document.querySelector('.nav__toggle');
    const closeBtn  = document.querySelector('.nav__close');
    if (toggleBtn && !toggleBtn.__bound){
      bindTap(toggleBtn, ()=>{
        const menu = document.getElementById('menu');
        const isOpen = !!menu && menu.classList.contains('open');
        setMobileMenu(!isOpen);
      });
      toggleBtn.__bound = true;
    }
    if (closeBtn && !closeBtn.__bound){
      bindTap(closeBtn, ()=> setMobileMenu(false));
      closeBtn.__bound = true;
    }
  };
  tryBind();
  // Re-try a few times in case header loaded after include.js
  let tries = 0;
  const iv = setInterval(()=>{
    tryBind();
    tries++;
    if (tries > 20) clearInterval(iv);
  }, 150);
});
