const domUtils = {
  doesNodeContainClick: (node, e) => {
    if (!node || !e) return false;

    if (node.contains(e.target)) return true;
  }
};

class Navigation {
  constructor({ selector }) {
    this.menuOpened = false;
    this.headerMenu = document.querySelector(selector);
    this.headerBurgerMenu = document.querySelector("#header-burger");

    if (this.isMobile()) {
      this.initNavigation();
    }
  }

  isMobile() {
    return window.innerWidth < 768;
  }

  initNavigation() {
    this.headerMenu.classList.add("header-menu-list_state-mobile");

    this.headerBurgerMenu.addEventListener("click", () => {
      if (!this.menuOpened) {
        this.openNavigation();
      } else {
        this.closeNavigation();
      }
    });

    // window.addEventListener("click", e => {
    //   const clickOutsideMenu = !domUtils.doesNodeContainClick(
    //     this.headerMenu,
    //     e
    //   );

    //   if (this.menuOpened && clickOutsideMenu) {
    //     this.closeNavigation();
    //   }
    // });
  }

  openNavigation() {
    this.headerMenu.classList.add("header-menu-list_state-mobile-opened");

    this.menuOpened = true;
  }

  closeNavigation() {
    this.headerMenu.classList.remove("header-menu-list_state-mobile-opened");

    this.menuOpened = false;
  }
}

const headerNavigation = new Navigation({
  selector: "#header-menu",
  layout: Layout
});
