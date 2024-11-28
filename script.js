const cards = document.querySelectorAll(".card");
const container = document.querySelector(".container");

function handleScrollEnhanced() {
  const containerBounds = container.getBoundingClientRect();
  const containerCenter = containerBounds.top + containerBounds.height / 2;

  cards.forEach((card) => {
    const cardBounds = card.getBoundingClientRect();
    const cardCenter = cardBounds.top + cardBounds.height / 2;

    // Calculate distance between container center and card center
    const distance = Math.abs(containerCenter - cardCenter);
    const scale = 1 - Math.min(distance / containerBounds.height, 0.5); // Scale based on relative distance

    // Apply styles based on proximity to center
    if (distance < containerBounds.height / 4) {
      card.classList.add("focused");
    } else {
      card.classList.remove("focused");
    }

    // Adjust card scale and opacity smoothly
    card.style.transform = `scale(${scale})`;
    card.style.opacity = scale;
  });
}

// Initialize focus and smooth scaling
handleScrollEnhanced();

// Listen for scroll events with optimized throttling
container.addEventListener(
  "scroll",
  throttle(handleScrollEnhanced, 50) // Call every 50ms for performance
);

// Utility: Throttle function to improve scroll performance
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}
