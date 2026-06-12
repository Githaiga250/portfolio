const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const contactForm = document.getElementById('contactForm');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
});

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  alert('Thank you! This demo portfolio does not yet submit forms.');
  contactForm.reset();
});
