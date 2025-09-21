// Nav toggle & smooth scroll
function setMobileMenu(open){
  const menu = document.getElementById('menu');
  const toggle = document.querySelector('.nav__toggle');
  if (!menu) return;
  menu.classList.toggle('open', !!open);
  if (toggle) toggle.setAttribute('aria-expanded', String(!!open));
}

function bindTap(el, handler){
  if (!el) return;
  el.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); handler(e); }, {passive:false});
  el.addEventListener('touchend', (e)=>{ e.preventDefault(); e.stopPropagation(); handler(e); }, {passive:false});
}


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

function bindNavHandlers(){
  const toggle = document.querySelector('.nav__toggle');
  const closeBtn = document.querySelector('.nav__close');
  const menu = document.getElementById('menu');

  if (!toggle || !menu) return;

  const onToggle = (e)=>{ e.preventDefault(); setMobileMenu(!menu.classList.contains('open')); };
  const onClose  = (e)=>{ e.preventDefault(); setMobileMenu(false); };

  // Use pointer events for mobile reliability
  toggle.addEventListener('pointerup', onToggle);
  toggle.addEventListener('click', onToggle);

  if (closeBtn){
    closeBtn.addEventListener('pointerup', onClose);
    closeBtn.addEventListener('click', onClose);
  }

  // Close when clicking anchor inside menu
  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (a){
      e.preventDefault();
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if (target){ target.scrollIntoView({behavior:'smooth', block:'start'}); }
      setMobileMenu(false);
    }
  }, {passive:false});
}

document.addEventListener('includes:loaded', bindNavHandlers);
document.addEventListener('DOMContentLoaded', bindNavHandlers);
