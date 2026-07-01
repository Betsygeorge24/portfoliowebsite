const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle?.querySelector('i');
const contactForm = document.getElementById('contact-form');
const formFeedback = document.querySelector('.form-feedback');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

const applyTheme = (theme) => {
  document.body.setAttribute('data-theme', theme);
  if (themeIcon) {
    themeIcon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
};

const savedTheme = localStorage.getItem('portfolio-theme');
applyTheme(savedTheme || 'dark');

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  localStorage.setItem('portfolio-theme', nextTheme);
  applyTheme(nextTheme);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (formFeedback) {
    formFeedback.textContent = 'Sending your message...';
  }

  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    });

    if (response.ok) {
      if (formFeedback) {
        formFeedback.textContent = 'Thank you for reaching out. I will get back to you soon.';
      }
      contactForm.reset();
    } else {
      throw new Error('Unable to send message right now.');
    }
  } catch (error) {
    if (formFeedback) {
      formFeedback.textContent = 'Sorry, the message could not be sent. Please email me directly instead.';
    }
  }
});
