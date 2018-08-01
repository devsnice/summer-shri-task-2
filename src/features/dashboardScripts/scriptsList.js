import Pager from "../../components/pager/pager";

export default class ScriptsList {
  constructor() {
    this.scriptsList = document.querySelector(".widget-scripts-list");
    this.pager = this.initPager();
  }

  initPager() {
    const scriptsPages = this.scriptsList.querySelectorAll(
      ".widget-scripts__page"
    );

    const scriptsPager = new Pager({
      selectorId: "#scripts-pager",
      countPages: scriptsPages.length,
      nextPageCallback: () => {
        this.shiftPage();
      },
      prevPageCallback: () => {
        this.shiftPage();
      }
    });

    return scriptsPager;
  }

  shiftPage() {
    const currentPage = this.pager.getCurrentPage();

    this.scriptsList.style.marginLeft = `-${100 * currentPage}%`;
  }
}
