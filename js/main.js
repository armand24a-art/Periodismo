// ===== MOBILE NAV =====
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.navbar-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.navbar-nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // ===== SCROLL ANIMATIONS =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ===== NAVBAR SCROLL EFFECT =====
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.12)';
    } else {
      navbar.style.boxShadow = '0 1px 20px rgba(0,0,0,0.06)';
    }
    lastScroll = currentScroll;
  });

  // ===== ACTIVE NAV LINK =====
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.navbar-nav a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });

  // ===== PROGRESS BAR ANIMATION =====
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.progress || '0%';
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => progressObserver.observe(bar));

  // ===== FILE UPLOAD =====
  document.querySelectorAll('.file-upload').forEach(area => {
    const input = area.querySelector('input[type="file"]');
    if (!input) return;

    area.addEventListener('click', () => input.click());
    area.addEventListener('dragover', (e) => {
      e.preventDefault();
      area.style.borderColor = 'var(--primary)';
      area.style.background = '#f0f7f2';
    });
    area.addEventListener('dragleave', () => {
      area.style.borderColor = '';
      area.style.background = '';
    });
    area.addEventListener('drop', (e) => {
      e.preventDefault();
      area.style.borderColor = '';
      area.style.background = '';
      input.files = e.dataTransfer.files;
      updateFileList(area, input.files);
    });

    input.addEventListener('change', () => {
      updateFileList(area, input.files);
    });
  });

  function updateFileList(area, files) {
    const list = area.querySelector('.file-list');
    if (!list) return;
    list.innerHTML = '';
    Array.from(files).forEach(file => {
      const li = document.createElement('li');
      li.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 0;font-size:0.88rem;';
      li.innerHTML = `<span style="color:var(--primary);">&#128196;</span> ${file.name} <span style="color:var(--text-light);font-size:0.78rem;">(${(file.size / 1024).toFixed(1)} KB)</span>`;
      list.appendChild(li);
    });
  }

  // ===== SUBMISSION FORM =====
  const submitForm = document.getElementById('submissionForm');
  if (submitForm) {
    submitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(submitForm);
      const data = {};
      formData.forEach((val, key) => data[key] = val);

      // Show success message
      const msg = document.getElementById('submitMsg');
      if (msg) {
        msg.style.display = 'block';
        msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      submitForm.reset();
    });
  }

  // ===== MODAL =====
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById(trigger.dataset.modal);
      if (modal) modal.classList.add('active');
    });
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay').classList.remove('active');
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  });

  // ===== TABS =====
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.tabs');
      const target = btn.dataset.tab;

      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const container = group.nextElementSibling;
      if (container) {
        container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        const targetContent = container.querySelector(`#${target}`);
        if (targetContent) targetContent.classList.add('active');
      }
    });
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== COUNTDOWN / DATE DISPLAY =====
  const dateElements = document.querySelectorAll('[data-date]');
  dateElements.forEach(el => {
    const date = new Date(el.dataset.date);
    el.textContent = date.toLocaleDateString('es-MX', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  });
});
