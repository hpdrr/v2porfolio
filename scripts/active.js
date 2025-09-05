// Select all sections that should be tracked for scrolling
let sections = document.querySelectorAll(".main section[id]");
let navLinks = document.querySelectorAll("header nav ul li a");

window.onscroll = () => {
  // Get current scroll position
  let scrollY = window.scrollY;

  // Handle the special case for top of page / home section
  if (scrollY < 100) {
    navLinks.forEach((link) => link.classList.remove("active"));
    document
      .querySelector("header nav ul li a[href='#home']")
      .classList.add("active");
    return;
  }

  // Find which section is currently in view
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // Offset for better UX
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    // Check if we're currently viewing this section
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach((link) => link.classList.remove("active"));

      // Add active class to corresponding nav link
      const activeLink = document.querySelector(
        `header nav ul li a[href="#${sectionId}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
};

// Initialize the active state when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Set home link as active initially
  navLinks.forEach((link) => link.classList.remove("active"));
  document
    .querySelector("header nav ul li a[href='#home']")
    .classList.add("active");
});
