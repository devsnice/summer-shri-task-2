/**
 *  This class holds logic for working with system Popups.
 *  It can animate block with a defined selector.
 */
export default class Popup {
  constructor({
    preview: {
      width,
      height,
      position: { top, left }
    },
    selector,
    openCallback,
    layout
  }) {
    this.openCallback = openCallback;
    this.previewOptions = {
      width,
      height,
      top: `${top}px`,
      left: `${left}px`
    };

    this.popup = document.querySelector(selector);
    this.closeButton = this.popup.querySelector(".popup-close");
    this.popupLayout = document.querySelector("#popup-layout");
    this.layout = layout;

    this.popupOptions = this.initPopupOptions();

    this.closePopup = this.closePopup.bind(this);

    this.initEvents();
  }

  initPopupOptions() {
    const popupBox = this.popup.getBoundingClientRect();

    return {
      width: popupBox.width,
      height: popupBox.height
    };
  }

  initEvents() {
    this.closeButton.addEventListener("click", this.closePopup);
    this.popup.addEventListener("transitionend", this.openCallback);
  }

  removeEvents() {
    this.closeButton.removeEventListener("click", this.closePopup);
    this.popup.removeEventListener("transitionend", this.openCallback);
  }

  /**
   * Positions element before animation
   * creates miniature of popup in place, when it was opened.
   */
  positionPopupInBeginAnimationPosition() {
    this.popup.style.top = this.previewOptions.top;
    this.popup.style.left = this.previewOptions.left;

    this.popup.style.transform = `
      scaleX(${this.previewOptions.width / this.popupOptions.width}) 
      scaleY(${this.previewOptions.height / this.popupOptions.height})
    `;

    this.popup.style.visibility = "visible";
    this.popup.style.transitionProperty = "";
    this.popup.style.transitionDuration = "";
  }

  /**
   * Positions element before animation,
   * its run animation of popup from miniature to its full size.
   */
  runOpenPopupAnimation() {
    window.requestAnimationFrame(() => {
      this.popup.style.transitionProperty = "transform, top, left";
      this.popup.style.transitionDuration = "0.3s";
      this.popup.style.top = "50%";
      this.popup.style.left = "50%";
      this.popup.style.transform = "translate(-50%, -50%) scaleX(1) scaleY(1)";
    });
  }

  open() {
    this.positionPopupInBeginAnimationPosition();
    this.showPopupLayout();
    this.runOpenPopupAnimation();
  }

  closePopup() {
    this.removePopupLayout();
    this.popup.style.visibility = "hidden";

    this.removeEvents();
  }

  showPopupLayout() {
    this.layout.block();
    this.popupLayout.classList.add("popup-layout_state-opened");
  }

  removePopupLayout() {
    this.layout.unblock();
    this.popupLayout.classList.remove("popup-layout_state-opened");
  }
}
