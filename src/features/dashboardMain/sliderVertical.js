class VerticalSlider {
  /**
   *
   * @param {string} elementSelector
   */
  constructor(elementSelector) {
    if (!this.hasSupport()) {
      return;
    }

    this.config = {
      visibleSliderItems: 2,
      shiftPx: 140
    };

    this.currentVisibleElements = this.config.visibleSliderItems;
    this.currentListShifting = 0;

    this.slider = document.querySelector(elementSelector);

    if (!this.slider) {
      throw new Error(
        `Couldn't init VerticalSlider, page hasn't element with selector ${elementSelector}`
      );
    }

    this.initSlider();
  }

  hasSupport() {
    return window.innerWidth > 768;
  }

  initSlider() {
    this.controlPrevElem = this.slider.querySelector("#slider-vertical-prev");
    this.controlNextElem = this.slider.querySelector("#slider-vertical-next");
    this.listWrapper = this.slider.querySelector(".widget-actions-list");
    this.sliders = this.slider.querySelectorAll(".widget-actions-item");

    this.eventsAmount = this.sliders.length;

    if (this.eventsAmount > this.config.visibleSliderItems) {
      this.controlNextElem.classList = "widget-actions__next visible";
    }

    this.initEventListeners();
  }

  initEventListeners() {
    this.controlPrevElem.addEventListener("click", () => {
      this.shiftToPreviousSlide();
    });

    this.controlNextElem.addEventListener("click", () => {
      this.shiftToNextSlide();
    });
  }

  shiftToPreviousSlide() {
    this.currentVisibleElements -= 1;
    this.currentListShifting += this.config.shiftPx;

    this.updateControls();
    this.shiftSliderToNewPosition();
  }

  shiftToNextSlide() {
    this.currentVisibleElements += 1;
    this.currentListShifting -= this.config.shiftPx;

    this.updateControls();
    this.shiftSliderToNewPosition();
  }

  updateControls() {
    const hasNextSlides = this.eventsAmount > this.currentVisibleElements;
    const hasPreviousSlides =
      this.config.visibleSliderItems < this.currentVisibleElements;

    this.controlNextElem.classList = hasNextSlides
      ? "widget-actions__next visible"
      : "widget-actions__next";

    this.controlPrevElem.classList = hasPreviousSlides
      ? "widget-actions__prev visible"
      : "widget-actions__prev";
  }

  shiftSliderToNewPosition() {
    this.listWrapper.style.marginTop = `${this.currentListShifting}px`;
  }
}

const nextEventSliders = new VerticalSlider("#slider-vertical");
