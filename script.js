// Mobile menu
const menu = document.querySelector('.nav nav');
document.querySelector('.burger').onclick = () => menu.classList.toggle('open');
menu.onclick = () => menu.classList.remove('open');

// Scroll reveal + stat counters
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  e.target.querySelectorAll('[data-n]').forEach(c => {
    const n = +c.dataset.n, s = c.dataset.s || '+';
    let i = 0;
    const t = setInterval(() => {
      c.textContent = ++i + (i >= n ? s : '');
      if (i >= n) clearInterval(t);
    }, 900 / n);
  });
  io.unobserve(e.target);
}), { threshold: .2 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Study strategy pills
const why = document.getElementById('why');
document.querySelectorAll('.pills span').forEach(p => p.onclick = () => {
  document.querySelectorAll('.pills span').forEach(x => x.classList.remove('on'));
  p.classList.add('on');
  why.textContent = p.title + '.';
});

// Letter / email tabs
document.querySelectorAll('.tabs button').forEach(b => b.onclick = () => {
  document.querySelectorAll('.tabs button,.doc').forEach(x => x.classList.remove('on'));
  b.classList.add('on');
  document.getElementById(b.dataset.t).classList.add('on');
});

// Copy buttons
document.querySelectorAll('.copy').forEach(b => b.onclick = () => {
  navigator.clipboard.writeText(b.nextElementSibling.textContent);
  b.textContent = 'Copied ✓';
  setTimeout(() => b.textContent = 'Copy', 1500);
});

// Print / save CV as PDF
document.querySelector('.pdf').onclick = () => {
  document.body.classList.add('print-cv');
  window.print();
  document.body.classList.remove('print-cv');
};

// Scroll progress bar
const bar = document.getElementById('bar');
addEventListener('scroll', () => {
  bar.style.transform = 'scaleX(' + scrollY / (document.documentElement.scrollHeight - innerHeight) + ')';
}, { passive: true });

if (matchMedia('(hover:hover)').matches) {
  // Cursor glow
  const cur = document.querySelector('.cursor');
  addEventListener('mousemove', e => { cur.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; });
  // 3D tilt on cards
  document.querySelectorAll('.card,.proj').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(800px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-6px)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });
  // Magnetic buttons
  document.querySelectorAll('.btn').forEach(b => {
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .2}px,${(e.clientY - r.top - r.height / 2) * .3}px)`;
    });
    b.addEventListener('mouseleave', () => b.style.transform = '');
  });
  // Hero parallax
  const orbs = document.querySelector('.orbs');
  addEventListener('mousemove', e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    orbs.style.transform = `translate(${x * 24}px,${y * 24}px)`;
  });
}
