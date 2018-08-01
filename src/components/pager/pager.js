/**
 * Pager class organaze logic of working pagination in any module of app,
 * it holds information about currentPage, changes, when somebody interacts with it,
 * and calls side-effects in outer modules
 */

export default class Pager {
  /**
   * {
   *  @param {String} selectorId - how to find pager in app
   *  @param {Function} nextPageCallback - sideEffect function
   *  @param {Function} prevPageCallback - sideEffect function
   *  @param {number} countPages - pages amount
   * }
   */

  constructor({ selectorId, nextPageCallback, prevPageCallback, countPages }) {
    this.pager = document.querySelector(selectorId);

    this.params = {
      countPages: countPages - 1,
      currentPage: 0
    };

    this.controls = {
      prevButton: this.pager.querySelector(".pager__page_back"),
      nextButton: this.pager.querySelector(".pager__page_next")
    };

    this.effects = {
      nextPage: nextPageCallback,
      prevPage: prevPageCallback
    };

    this.initEvents();
    this.updateControls();
  }

  /**
   * @returns {Number} currentId
   */
  getCurrentPage() {
    return this.params.currentPage;
  }

  /**
   *  Init events for created pager
   */
  initEvents() {
    this.controls.prevButton.addEventListener("click", () => {
      this.goToPrevPage();
    });
    this.controls.nextButton.addEventListener("click", () => {
      this.goToNextPage();
    });
  }

  /**
   *  Update controls of pages after changes in pager,
   *  it add disabled attributes to Button elements,
   *  so user couldn't interact with controls
   */
  updateControls() {
    const { countPages, currentPage } = this.params;

    if (currentPage < countPages) {
      this.controls.nextButton.removeAttribute("disabled");
    } else {
      this.controls.nextButton.setAttribute("disabled", "disabled");
    }

    if (currentPage === 0) {
      this.controls.prevButton.setAttribute("disabled", "disabled");
    } else {
      this.controls.prevButton.removeAttribute("disabled");
    }
  }

  goToNextPage() {
    this.params.currentPage++;

    this.effects.nextPage();
    this.updateControls();
  }

  goToPrevPage() {
    this.params.currentPage--;

    this.effects.prevPage();
    this.updateControls();
  }
}
