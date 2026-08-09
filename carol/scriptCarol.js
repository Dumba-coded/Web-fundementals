document.addEventListener('DOMContentLoaded', () => {


  const initSparkles = () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'sparkle-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');

    let width, height;
    let sparkles = [];

   
    const lightSparkleColors = [
      '#B9B28A',
      '#EBE5C2',
      '#504B38'
    ];

    const darkSparkleColors = [
      '#F8F3D9',
      '#EBE5C2',
      '#B9B28A'
    ];

    const maxParticles = 40;

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();


    class Sparkle {

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        this.size = Math.random() * 2 + 0.5;

        this.speedY = Math.random() * 0.4 - 0.2;
        this.speedX = Math.random() * 0.4 - 0.2;

        // Use different sparkle colours depending on theme
        const isDark = document.body.classList.contains('dark-mode');

        const colors = isDark
          ? darkSparkleColors
          : lightSparkleColors;

        this.color = colors[
          Math.floor(Math.random() * colors.length)
        ];

        this.opacity = Math.random() * 0.8 + 0.2;
        this.blinkSpeed = Math.random() * 0.03 + 0.01;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        this.opacity -= this.blinkSpeed;

        if (
          this.y < 0 ||
          this.y > height ||
          this.x < 0 ||
          this.x > width ||
          this.opacity <= 0
        ) {
          this.reset();
        }
      }

      draw() {
        ctx.globalAlpha = this.opacity;

        ctx.beginPath();

        ctx.arc(
          this.x,
          this.y,
          this.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.closePath();

        ctx.globalAlpha = 1;
      }
    }


    for (let i = 0; i < maxParticles; i++) {
      sparkles.push(new Sparkle());
    }


    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      sparkles.forEach(sparkle => {
        sparkle.update();
        sparkle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();
  };


  initSparkles();



  const initDarkMode = () => {

    const themeToggle = document.querySelector('.theme-toggle');

    // Stop if the toggle doesn't exist on this page
    if (!themeToggle) return;


    const updateThemeButton = () => {

      const isDark =
        document.body.classList.contains('dark-mode');

      if (isDark) {

        themeToggle.textContent = '☀';

        themeToggle.setAttribute(
          'aria-label',
          'Switch to light mode'
        );

      } else {

        themeToggle.textContent = '☾';

        themeToggle.setAttribute(
          'aria-label',
          'Switch to dark mode'
        );
      }
    };


    /* Check if the user previously selected dark mode */

    const savedTheme =
      localStorage.getItem('darkMode');

    if (savedTheme === 'true') {

      document.body.classList.add('dark-mode');

    }


    updateThemeButton();


    /* Toggle dark mode when clicked */

    themeToggle.addEventListener('click', () => {

      document.body.classList.toggle('dark-mode');

      const isDark =
        document.body.classList.contains('dark-mode');


      // Remember user's choice
      localStorage.setItem(
        'darkMode',
        isDark
      );


      updateThemeButton();

    });

  };


  initDarkMode();



  const initMobileMenu = () => {

    const menuToggle =
      document.querySelector('.menu-toggle');

    const siteNav =
      document.querySelector('.site-nav');


    if (menuToggle && siteNav) {

      menuToggle.addEventListener('click', () => {

        const isOpen =
          siteNav.classList.toggle('is-open');

        menuToggle.classList.toggle('is-active');

        menuToggle.setAttribute(
          'aria-expanded',
          isOpen
        );

      });


      siteNav.addEventListener('click', (event) => {

        if (event.target.tagName === 'A') {

          siteNav.classList.remove('is-open');

          menuToggle.classList.remove('is-active');

          menuToggle.setAttribute(
            'aria-expanded',
            'false'
          );

        }

      });

    }

  };


  initMobileMenu();

});
