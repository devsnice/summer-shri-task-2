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
    this.animationTime = 300;
    this.previewOptions = {
      width,
      height,
      top: `${top}px`,
      left: `${left}px`
    };

    this.popup = document.querySelector(selector);
    this.closeButton = this.popup.querySelector("#popup-close");
    this.popupLayout = document.querySelector("#popup-layout");
    this.layout = layout;

    this.popupOptions = this.initPopupOptions();

    this.closePopup = this.closePopup.bind(this);

    this.initEvents();
  }

  initEvents() {
    this.closeButton.addEventListener("click", this.closePopup);
  }

  removeEvents() {
    this.closeButton.removeEventListener("click", this.closePopup);
  }

  initPopupOptions() {
    const popupBox = this.popup.getBoundingClientRect();

    return {
      width: popupBox.width,
      height: popupBox.height
    };
  }

  positionPopupInBeginAnimationPosition() {
    this.popup.style.top = this.previewOptions.top;
    this.popup.style.left = this.previewOptions.left;

    this.popup.style.transform = `
      scaleX(${this.previewOptions.width / this.popupOptions.width}) 
      scaleY(${this.previewOptions.height / this.popupOptions.height})
    `;
  }

  runOpenPopupAnimation() {
    window.requestAnimationFrame(() => {
      this.popup.style.top = "";
      this.popup.style.left = "";
      this.popup.style.transform = "";

      this.popup.classList.add("popup_state-open");

      setTimeout(this.openCallback, this.animationTime);
    });
  }

  open() {
    this.positionPopupInBeginAnimationPosition();
    this.showPopupLayout();
    this.runOpenPopupAnimation();
  }

  closePopup() {
    this.removePopupLayout();
    this.popup.classList.remove("popup_state-open");
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
