document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.querySelector('.theme-toggle');
  
  if (!themeToggleBtn) return;

  // Check saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-theme');
    themeToggleBtn.textContent = '☀'; // Sun icon for light mode switch
  } else {
    themeToggleBtn.textContent = '☾'; // Moon icon for dark mode switch
  }

  // Toggle theme on click
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');

    // Update icon and localStorage
    themeToggleBtn.textContent = isDark ? '☀' : '☾';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});
