// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ---------- Theme Toggle Logic ----------
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");

  // Check for saved theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const statsImg = document.getElementById("gh-stats");
    const streakImg = document.getElementById("gh-streak");
    const langsImg = document.getElementById("gh-langs");
    const contribsImg = document.getElementById("gh-contribs");

    if (theme === "light") {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");

      // Update GH Images for Light Mode
      if (statsImg) statsImg.src = "https://github-readme-stats-alpha.vercel.app/api?username=Pramod-Munnoli&theme=buefy&hide_border=false&include_all_commits=false&count_private=false";
      if (streakImg) streakImg.src = "https://nirzak-streak-stats.vercel.app/?user=Pramod-Munnoli&theme=buefy&hide_border=false";
      if (langsImg) langsImg.src = "https://github-readme-stats-alpha.vercel.app/api/top-langs/?username=Pramod-Munnoli&theme=buefy&hide_border=false&layout=compact";
      if (contribsImg) contribsImg.src = "https://github-contributor-stats.vercel.app/api?username=Pramod-Munnoli&limit=5&theme=buefy&combine_all_yearly_contributions=true";
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");

      // Update GH Images for Dark Mode
      if (statsImg) statsImg.src = "https://github-readme-stats-alpha.vercel.app/api?username=Pramod-Munnoli&theme=tokyonight&hide_border=false&include_all_commits=false&count_private=false";
      if (streakImg) streakImg.src = "https://nirzak-streak-stats.vercel.app/?user=Pramod-Munnoli&theme=tokyonight&hide_border=false";
      if (langsImg) langsImg.src = "https://github-readme-stats-alpha.vercel.app/api/top-langs/?username=Pramod-Munnoli&theme=tokyonight&hide_border=false&layout=compact";
      if (contribsImg) contribsImg.src = "https://github-contributor-stats.vercel.app/api?username=Pramod-Munnoli&limit=5&theme=tokyonight&combine_all_yearly_contributions=true";
    }
  }

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a nav link
  const navItems = document.querySelectorAll(".nav-link");

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navLinks.classList.remove("active");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Skill animation on scroll
  const skillCards = document.querySelectorAll(".skill-card");

  const animateSkillsOnScroll = function () {
    skillCards.forEach((card) => {
      const cardPosition = card.getBoundingClientRect();

      // Check if card is in viewport
      if (cardPosition.top < window.innerHeight - 100) {
        card.classList.add("animated");
      }
    });
  };

  // Run once on page load
  animateSkillsOnScroll();

  // Run on scroll
  window.addEventListener("scroll", animateSkillsOnScroll);

  // Project filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        // Filter projects
        projectCards.forEach((card) => {
          if (filterValue === "all") {
            card.style.display = "block";
          } else {
            if (card.classList.contains(filterValue)) {
              card.style.display = "block";
            } else {
              card.style.display = "none";
            }
          }
        });
      });
    });
  }

  // Contact form submission using EmailJS
  // ✅ Initialize EmailJS
  (function () {
    emailjs.init("i8JikQCstt171wYnN"); // Your Public Key
  })();

  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const subjectInput = document.getElementById("subject");
      const messageInput = document.getElementById("message");

      let isValid = true;

      // ✅ Validation
      if (nameInput.value.trim() === "") { showError(nameInput, "Name is required"); isValid = false; }
      else { removeError(nameInput); }

      if (emailInput.value.trim() === "") { showError(emailInput, "Email is required"); isValid = false; }
      else if (!isValidEmail(emailInput.value)) { showError(emailInput, "Please enter a valid email"); isValid = false; }
      else { removeError(emailInput); }

      if (subjectInput.value.trim() === "") { showError(subjectInput, "Subject is required"); isValid = false; }
      else { removeError(subjectInput); }

      if (messageInput.value.trim() === "") { showError(messageInput, "Message is required"); isValid = false; }
      else { removeError(messageInput); }

      if (isValid) {
        formMessage.innerHTML = '<div class="loading-message">Sending message...</div>';

        // ✅ Template Params (no personal email here)
        const templateParams = {
          from_name: nameInput.value,
          from_email: emailInput.value,
          subject: subjectInput.value,
          message: messageInput.value
        };

        // ✅ Replace with your EmailJS Service ID & Template ID
        emailjs.send('service_hhgij3s', 'template_qy89r6e', templateParams)
          .then(() => {
            formMessage.innerHTML = '<div class="success-message">Your message has been sent successfully!</div>';
            contactForm.reset();
            setTimeout(() => { formMessage.innerHTML = ''; }, 5000);
          })
          .catch(() => {
            formMessage.innerHTML = '<div class="error-message">Failed to send message. Please try again later.</div>';
            setTimeout(() => { formMessage.innerHTML = ''; }, 5000);
          });
      }
    });
  }

  function showError(input, message) {
    const formGroup = input.parentElement;
    let error = formGroup.querySelector(".error-message");
    if (!error) {
      error = document.createElement("div");
      error.className = "error-message";
      formGroup.appendChild(error);
    }
    error.innerText = message;
    input.classList.add("is-invalid");
  }

  function removeError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector(".error-message");
    if (error) error.remove();
    input.classList.remove("is-invalid");
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Animated counter for stats
  const stats = document.querySelectorAll(".stat-number");

  if (stats.length > 0) {
    const animateStats = function () {
      stats.forEach((stat) => {
        const cardPosition = stat.getBoundingClientRect();

        // Check if stat is in viewport and hasn't been animated yet
        if (
          cardPosition.top < window.innerHeight - 100 &&
          !stat.classList.contains("animated")
        ) {
          const targetRaw = stat.getAttribute("data-target");
          const target = parseFloat(targetRaw) || 0;

          // mark as animated even if target is 0 to avoid re-checks
          stat.classList.add("animated");

          if (target === 0) {
            stat.innerText = "0";
            return;
          }

          let count = 0;
          const duration = 2000; // 2 seconds
          const interval = 30; // update every 30ms
          const steps = Math.max(1, Math.floor(duration / interval));
          const increment = target / steps;

          // show 1 decimal for non-integers, otherwise no decimals
          const precision = (target % 1 !== 0) ? 1 : 0;

          const counter = setInterval(() => {
            count += increment;

            if (count >= target) {
              stat.innerText = precision ? target.toFixed(precision) : String(Math.round(target));
              clearInterval(counter);
            } else {
              stat.innerText = precision ? count.toFixed(precision) : String(Math.floor(count));
            }
          }, interval);
        }
      });
    };

    // Run once on page load (covers stats that are already in view)
    animateStats();

    // Run on scroll (covers stats that enter view later)
    window.addEventListener("scroll", animateStats);
  }

  // Typing animation for hero section
  const heroTitle = document.querySelector(".hero-title");

  if (heroTitle && heroTitle.getAttribute("data-typed") === "true") {
    const dataText = heroTitle.getAttribute("data-text");
    const roles = dataText.split("|");
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        heroTitle.innerHTML = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster deleting speed
      } else {
        heroTitle.innerHTML = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Normal typing speed
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Finished typing current role
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting current role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Short pause before next word
      }

      setTimeout(typeWriter, typeSpeed);
    }

    // Start slightly delayed
    setTimeout(() => {
      typeWriter();
    }, 500);
  }

  // ---------- Custom Cursor Logic ----------
  const dot = document.querySelector(".cursor-dot");
  const outline = document.querySelector(".cursor-outline");

  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    // Outline with slight delay for trail effect
    outline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
  });

  // Cursor scaling on links
  const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card');
  interactiveElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
      dot.style.transform = "translate(-50%, -50%) scale(2)";
      outline.style.transform = "translate(-50%, -50%) scale(1.5)";
      outline.style.borderColor = "var(--color-primary)";
    });
    el.addEventListener("mouseleave", () => {
      dot.style.transform = "translate(-50%, -50%) scale(1)";
      outline.style.transform = "translate(-50%, -50%) scale(1)";
      outline.style.borderColor = "rgba(14, 165, 233, 0.3)";
    });
  });

  // ---------- Intersection Observer for Premium Reveal ----------
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Add staggering to children if they exist
        if (entry.target.classList.contains('skills-grid') || entry.target.classList.contains('project-grid')) {
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`;
            child.classList.add('in-view');
          });
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.will-reveal, .skill-card, .project-card, .section-title, .skills-grid, .project-grid').forEach(el => {
    revealObserver.observe(el);
  });
})();
