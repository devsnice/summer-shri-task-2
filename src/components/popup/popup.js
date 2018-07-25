class Popup {
  constructor({
    preview: {
      width,
      height,
      position: { top, left }
    },
    selector,
    openCallback
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
    this.popupLayout = document.querySelector("#popup-layout");

    this.popupOptions = this.initPopupOptions();
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
      scaleX(${this.previewOptions.width / this.popupOptions.height}) 
      scaleY(${this.previewOptions.height / this.popupOptions.width})
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

  showPopupLayout() {
    this.popupLayout.classList.add("popup-layout_state-opened");
  }
}
