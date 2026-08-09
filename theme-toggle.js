(function () {
  const pageParameters = new URLSearchParams(window.location.search);
  const startingTheme = pageParameters.get("theme") === "dark" ? "dark" : "light";

  // Apply the theme before the page finishes loading to reduce flashing.
  document.documentElement.classList.toggle("dark-theme", startingTheme === "dark");

  document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.querySelector(".theme-toggle");

    function updateInternalLinks(theme) {
      const links = document.querySelectorAll('a[href]');

      links.forEach(function (link) {
        const originalHref = link.getAttribute("href");

        if (
          !originalHref ||
          originalHref.startsWith("#") ||
          originalHref.startsWith("mailto:") ||
          originalHref.startsWith("tel:") ||
          originalHref.startsWith("http://") ||
          originalHref.startsWith("https://") ||
          originalHref.endsWith(".pdf")
        ) {
          return;
        }

        const linkUrl = new URL(originalHref, window.location.href);

        if (linkUrl.origin === window.location.origin) {
          linkUrl.searchParams.set("theme", theme);
          link.setAttribute("href", linkUrl.pathname + linkUrl.search + linkUrl.hash);
        }
      });
    }

    function applyTheme(theme) {
      const darkModeIsActive = theme === "dark";

      document.documentElement.classList.toggle("dark-theme", darkModeIsActive);
      document.body.classList.toggle("dark-theme", darkModeIsActive);

      if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", String(darkModeIsActive));
        themeToggle.setAttribute(
          "aria-label",
          darkModeIsActive ? "Switch to light theme" : "Switch to dark theme"
        );
        themeToggle.setAttribute(
          "title",
          darkModeIsActive ? "Switch to light theme" : "Switch to dark theme"
        );
      }

      updateInternalLinks(theme);
    }

    applyTheme(startingTheme);

    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        const newTheme = document.documentElement.classList.contains("dark-theme")
          ? "light"
          : "dark";

        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("theme", newTheme);
        window.history.replaceState({}, "", currentUrl.pathname + currentUrl.search + currentUrl.hash);

        applyTheme(newTheme);
      });
    }
  });
})();
