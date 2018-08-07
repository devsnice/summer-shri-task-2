const MOBILE_MAX_WIDTH = 768;

export default class VerticalSlider {
  /**
   * @param {string} elementSelector
   */
  constructor(elementSelector) {
    if (!this.hasSupport()) {
      return;
    }

    this.config = {
      visibleSliderItems: 2
    };

    this.slider = document.querySelector(`${elementSelector}`);

    if (!this.slider) {
      throw new Error(
        `Couldn't init VerticalSlider, page hasn't element with selector ${elementSelector}`
      );
    }

    this.initSlider();
  }

  hasSupport() {
    return window.innerWidth > MOBILE_MAX_WIDTH;
  }

  getNextSlideHeight() {
    return this.controlNextElem.getBoundingClientRect().height;
  }

  initSlider() {
    this.controlNextElem = this.slider.querySelector("#slider-vertical-next");
    this.listWrapper = this.slider.querySelector(".widget-actions-list");
    this.sliders = this.slider.querySelectorAll(".widget-actions-item");

    this.eventsAmount = this.sliders.length;
    this.nextSlideHeight = this.getNextSlideHeight();

    if (this.eventsAmount > this.config.visibleSliderItems) {
      this.controlNextElem.classList.add("widget-actions__next_visible");
    }

    this.initEventListeners();
  }

  initEventListeners() {
    this.slider
      .querySelector(".widget-actions-list")
      .addEventListener("scroll", e => {
        if (e.target.scrollTop > this.nextSlideHeight) {
          this.controlNextElem.classList.remove("widget-actions__next_visible");
        } else {
          this.controlNextElem.classList.add("widget-actions__next_visible");
        }
      });
  }
}
