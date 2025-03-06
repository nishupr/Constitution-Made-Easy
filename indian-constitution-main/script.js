document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.querySelector('.loading-screen');

  const helloLanguages = ["Hello", "Namaste", "Bonjour", "Hola", "Ciao", "Shalom", "Ni Hao", "你好", "こんにちは"];

  function showHelloText(index) {
  loadingScreen.textContent = helloLanguages[index];
  document.body.classList.add('lock-screen'); // Add this line
  setTimeout(() => {
    if (index < helloLanguages.length - 1) {
      showHelloText(index + 1);
    } else {
      loadingScreen.classList.add('loaded');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.body.classList.remove('lock-screen'); // Add this line
      }, 800);
      showMainContent();
    }
  }, 300);
}

  function showMainContent() {
    const nav = document.querySelector(".nav");
    const navMenu = document.querySelector(".nav-items");
    const btnToggleNav = document.querySelector(".menu-btn");
    const workEls = document.querySelectorAll(".work-box");
    const workImgs = document.querySelectorAll(".work-img");
    const mainEl = document.querySelector("main");
    const yearEl = document.querySelector(".footer-text span");

    const toggleNav = () => {
      nav.classList.toggle("hidden");

      document.body.classList.toggle("lock-screen");

      if (nav.classList.contains("hidden")) {
        btnToggleNav.textContent = "menu";
      } else {
        setTimeout(() => {
          btnToggleNav.textContent = "close";
        }, 475);
      }
    };

    btnToggleNav.addEventListener("click", toggleNav);

    navMenu.addEventListener("click", (e) => {
      if (e.target.localName === "a") {
        toggleNav();
      }
    });

    document.body.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !nav.classList.contains("hidden")) {
        toggleNav();
      }
    });

    workImgs.forEach((workImg) => workImg.classList.add("transform"));

    let observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const [textbox, picture] = Array.from(entry.target.children);
        if (entry.isIntersecting) {
          picture.classList.remove("transform");
          Array.from(textbox.children).forEach(
            (el) => (el.style.animationPlayState = "running")
          );
        }
      },
      { threshold: 0.3 }
    );

    workEls.forEach((workEl) => {
      observer.observe(workEl);
    });

    const switchThemeEl = document.querySelector('input[type="checkbox"]');
    const storedTheme = localStorage.getItem("theme");

    switchThemeEl.checked = storedTheme === "dark" || storedTheme === null;

    switchThemeEl.addEventListener("click", () => {
      const isChecked = switchThemeEl.checked;

      if (!isChecked) {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        localStorage.setItem("theme", "light");
        switchThemeEl.checked = false;
      } else {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
        localStorage.setItem("theme", "dark");
      }
    });

    const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]');

    document.body.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
        e.preventDefault();
        btnToggleNav.focus();
      }
    });

    const logosWrappers = document.querySelectorAll(".logo-group");

    const sleep = (number) => new Promise((res) => setTimeout(res, number));

    logosWrappers.forEach(async (logoWrapper, i) => {
      const logos = Array.from(logoWrapper.children);
      await sleep(1400 * i);
      setInterval(() => {
        let temp = logos[0];
        logos[0] = logos[1];
        logos[1] = logos[2];
        logos[2] = temp;
        logos[0].classList.add("hide", "to-top");
        logos[1].classList.remove("hide", "to-top", "to-bottom");
        logos[2].classList.add("hide", "to-bottom");
      }, 5600);
    });

    yearEl.textContent = new Date().getFullYear();
  }

  showHelloText(0);
});