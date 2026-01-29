/* ========================================
   PERSONAL WEBSITE JS — COMPLETE
   Features: Home menu slide, icon rail sync, 
   staggered animations, and scroll reset.
======================================== */

/**
 * 1. SHOW SECTION
 * Handles the transition from the Home Menu to specific content,
 * or switching between sections via the side rail.
 */
function showSection(id) {
  const body = document.body;
  const homeMenu = document.querySelector('.home-menu');
  const iconRail = document.querySelector('.icon-rail');
  const contentArea = document.querySelector('.content');
  const homeBtn = document.querySelector('.home-btn');
  const targetSection = document.getElementById(id);

  // A. Transition Body State (Enables scrolling)
  body.classList.remove('home');

  // B. Animate Navigation Elements
  if (homeMenu) {
    homeMenu.classList.add('slide-left');
    // Using setTimeout to ensure display change doesn't break the CSS transition
    setTimeout(() => {
      if (homeMenu.classList.contains('slide-left')) {
        homeMenu.style.pointerEvents = 'none'; 
      }
    }, 500);
  }

  // C. Show Layout UI
  if (iconRail) iconRail.style.display = 'flex';
  if (contentArea) contentArea.classList.remove('hidden');
  if (homeBtn) homeBtn.style.display = 'block';

  // D. Reset All Sections & Active States
  const allSections = document.querySelectorAll('.section');
  allSections.forEach(sec => {
    sec.style.display = 'none';
    sec.style.animation = 'none'; // Kill previous animations
    sec.classList.remove('fade-out');
  });

  document.querySelectorAll('.icon').forEach(icon => {
    icon.classList.remove('active');
  });

  // E. Activate Current Section & Icon
  const activeIcon = document.querySelector(`.icon[data-section="${id}"]`);
  if (activeIcon) activeIcon.classList.add('active');

  if (targetSection) {
    targetSection.style.display = 'block';
    
    // Force a reflow to restart the CSS animation
    void targetSection.offsetWidth; 
    
    // Re-apply the animation defined in your CSS
    targetSection.style.animation = 'fadeSlideIn 0.6s ease forwards';
  }

  // F. UX: Always scroll to the top of the new section
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 2. GO HOME
 * Handles the "Back to Home" transition.
 */
function goHome() {
  const body = document.body;
  const sections = document.querySelectorAll('.section');
  const homeMenu = document.querySelector('.home-menu');
  const iconRail = document.querySelector('.icon-rail');
  const contentArea = document.querySelector('.content');
  const homeBtn = document.querySelector('.home-btn');

  // Find the currently active section to fade it out
  const currentSection = Array.from(sections).find(sec => sec.style.display === 'block');

  if (currentSection) {
    currentSection.classList.add('fade-out');

    // Wait for the fade-out animation to finish (matching CSS 0.4s)
    setTimeout(() => {
      // Hide Content Logic
      currentSection.style.display = 'none';
      currentSection.classList.remove('fade-out');
      if (contentArea) contentArea.classList.add('hidden');
      if (iconRail) iconRail.style.display = 'none';
      if (homeBtn) homeBtn.style.display = 'none';

      // Restore Home Menu
      if (homeMenu) {
        homeMenu.classList.remove('slide-left');
        homeMenu.style.pointerEvents = 'auto';
      }

      // Restore Body State (Disables scrolling for home splash)
      body.classList.add('home');
      window.scrollTo(0, 0);
    }, 400);
  } else {
    // Fallback if no section is active
    body.classList.add('home');
    if (homeMenu) homeMenu.classList.remove('slide-left');
  }
}

/**
 * 3. INITIALIZATION
 * Runs once when the script loads to set up data attributes.
 */
function initPortfolio() {
  // Sync Icons with their target sections
  document.querySelectorAll('.icon').forEach(icon => {
    const onClickAttr = icon.getAttribute('onclick') || "";
    const match = onClickAttr.match(/'([^']+)'/);
    if (match && match[1]) {
      icon.setAttribute('data-section', match[1]);
    }
  });

  // Apply staggered animation delays to sections for a "layered" entrance
  document.querySelectorAll('.section').forEach((sec, i) => {
    sec.style.setProperty('--delay', `${i * 0.1}s`);
  });
}

// Run initialization
initPortfolio();
/* ========================================
   4. SCROLL TO TOP LOGIC
   Wrapped in a listener to ensure the button 
   exists before the script tries to use it.
======================================== */
document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      // We check the scroll position (standardized for all browsers)
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      // Logic: Only show the button if scrolled down more than 300px
      if (scrollPosition > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    // Smooth scroll back to the very top on click
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showCopyToast("Email ID copied to clipboard");
  });
}

function showCopyToast(message) {
  let toast = document.querySelector(".copy-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "copy-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// ===== FAKE LIGHT THEME INTERACTION =====
const themeBtn = document.querySelector('.theme-btn');
const themeJoke = document.getElementById('themeJoke');

if (themeBtn && themeJoke) {
  themeBtn.addEventListener('click', () => {
    themeJoke.classList.add('show');

    // Auto-hide after 3 seconds
    setTimeout(() => {
      themeJoke.classList.remove('show');
    }, 3000);
  });
}
