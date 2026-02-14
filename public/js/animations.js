// Scroll fade-in, typing effect, 3D tilt, skill bars, project filters, stagger
(function () {
  // === Scroll Fade In (with stagger support) ===
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // === Stagger children animations ===
  // Automatically stagger .fade-in elements inside containers
  document.querySelectorAll('.edu-grid, .cert-grid, .tool-group').forEach(container => {
    const children = container.querySelectorAll('.fade-in, .tool-tag');
    children.forEach((child, i) => {
      child.style.setProperty('--delay', (i * 0.06) + 's');
    });
  });

  // Stagger tool tags entrance
  document.querySelectorAll('.tool-group').forEach(group => {
    const tags = group.querySelectorAll('.tool-tag');
    const groupObserver = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            tags.forEach((tag, i) => {
              setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
              }, i * 40);
            });
            groupObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    // Pre-hide tags
    tags.forEach(tag => {
      tag.style.opacity = '0';
      tag.style.transform = 'translateY(8px)';
      tag.style.transition = 'opacity .3s ease, transform .3s ease, border-color .3s, color .3s, background .3s, box-shadow .3s';
    });
    groupObserver.observe(group);
  });

  // === Typing Effect ===
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const text = typingEl.getAttribute('data-text');
    typingEl.textContent = '';
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        typingEl.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 60 + Math.random() * 40);
      }
    }
    setTimeout(typeChar, 800);
  }

  // === Skill Bars Animation ===
  const skillBars = document.querySelectorAll('.skill-bar');
  if (skillBars.length) {
    const skillObserver = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const bar = e.target;
            const level = bar.getAttribute('data-level');
            // Delay each bar slightly for cascade effect
            const item = bar.closest('.skill-item');
            const siblings = item ? Array.from(item.parentElement.children) : [];
            const index = siblings.indexOf(item);
            setTimeout(() => {
              bar.style.width = level + '%';
            }, index * 80);
            skillObserver.unobserve(bar);
          }
        });
      },
      { threshold: 0.2 }
    );
    skillBars.forEach(bar => skillObserver.observe(bar));
  }

  // === 3D Tilt on Project Cards ===
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 6;
      const rotateX = ((centerY - y) / centerY) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // === Project Filter Tabs ===
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-cat');
      let delay = 0;
      cards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-cat') === cat) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.classList.add('visible');
          }, delay);
          delay += 60;
        } else {
          card.style.display = 'none';
          card.classList.remove('visible');
        }
      });
    });
  });

  // === Timeline items hover glow ===
  document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const desc = item.querySelectorAll('.timeline-desc li');
      desc.forEach((li, i) => {
        li.style.transition = `opacity .3s ${i * 0.03}s`;
        li.style.opacity = '1';
      });
    });
  });

  // === Smooth scroll reveal for all pages ===
  // Re-observe any dynamically added elements
  const mutObserver = new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType === 1 && node.classList && node.classList.contains('fade-in')) {
          observer.observe(node);
        }
      });
    });
  });
  mutObserver.observe(document.body, { childList: true, subtree: true });
})();
