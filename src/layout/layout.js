class ApplicationLayout {
  constructor(selector) {
    this.layout = document.querySelector(selector);
  }

  block() {
    this.layout.classList.add("application_state-frozen");
    this.layout.classList.add("application_state-blured");
  }

  unblock() {
    this.layout.classList.remove("application_state-frozen");
    this.layout.classList.remove("application_state-blured");
  }
}

var Layout = new ApplicationLayout("#application");
