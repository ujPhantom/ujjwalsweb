const year = document.querySelector('#current-year');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const emailLink = document.querySelector('.email-link');
const toast = document.querySelector('.toast');
const contactDialog = document.querySelector('#contact-dialog');

if (year) year.textContent = new Date().getFullYear();

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('span').textContent = isOpen ? '−' : '+';
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.querySelector('span').textContent = '+';
  });
});

const closeMenu = () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.querySelector('span').textContent = '+';
};

document.querySelectorAll('[data-contact-trigger]').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    closeMenu();
    contactDialog?.showModal();
  });
});

document.querySelectorAll('[data-dialog-trigger]').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    closeMenu();
    document.querySelector(`#${trigger.dataset.dialogTrigger}`)?.showModal();
  });
});

document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});

emailLink?.addEventListener('click', async (event) => {
  if (!navigator.clipboard) return;
  event.preventDefault();
  await navigator.clipboard.writeText(emailLink.textContent.replace('↗', '').trim());
  toast.classList.add('visible');
  window.setTimeout(() => toast.classList.remove('visible'), 2200);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
