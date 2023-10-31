document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  let firstImg = document.querySelectorAll("img")[0];
  const arrowIcons = document.querySelectorAll(".wrapper i");

  let isDragStart = false,
    isDragging = false,
    prevPageX,
    prevScrollLeft,
    positionDiff;

  const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display =
      carousel.scrollLeft == scrollWidth ? "none" : "block";
    // if (carousel.scrollLeft == 0) {
    //   arrowIcons[0].style.display = "none";
    // } else {
    //   arrowIcons[0].style.display = "block";
    // }

    // if (carousel.scrollLeft == scrollWidth) {
    //   arrowIcons[1].style.display = "block";
    // } else {
    //   arrowIcons[1].style.display = "none";
    // }
  };

  arrowIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      let imgWidth = firstImg.clientWidth + 14; //first image with 14px margin
      if (icon.id == "left") {
        carousel.scrollLeft -= imgWidth;
      } else {
        carousel.scrollLeft += imgWidth;
      }
      setTimeout(() => {
        showHideIcons();
      }, 60);
    });
  });

  const autoSlide = () => {
    if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
      return;
    positionDiff = Math.abs(positionDiff);
    let imgWidth = firstImg.clientWidth + 14;
    let valDifference = imgWidth - positionDiff;
    if (carousel.scrollLeft > prevScrollLeft) {
      return (carousel.scrollLeft +=
        positionDiff > imgWidth / 3 ? valDifference : -positionDiff);
    }
    return (carousel.scrollLeft -=
      positionDiff > imgWidth / 3 ? valDifference : -positionDiff);
  };

  const dragStart = (e) => {
    // Update global variables value in mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    // Scrolling image to left according to mouse move direction
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
  };

  const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if (!isDragging) return;
    isDragging = false;
    autoSlide();
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("touchstart", dragStart);

  carousel.addEventListener("mousemove", dragging);
  carousel.addEventListener("touchmove", dragging);

  carousel.addEventListener("mouseup", dragStop);

  carousel.addEventListener("mouseleave", dragStop);
  carousel.addEventListener("touchend", dragStop);
});
