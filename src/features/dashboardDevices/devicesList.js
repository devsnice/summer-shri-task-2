import Pager from "../../components/pager/pager";

export default class DevicesList {
  constructor() {
    this.devicesList = document.querySelector(".widget-devices-list");
    this.deviceItemWidth;

    this.pager = this.initPager();
  }

  getDeviceItemWidth(devicesItem) {
    return devicesItem.getBoundingClientRect().width;
  }

  /**
   * It inits list pager, when it needed,
   * when items aren't fit to width of device,
   * it will display pager, which will shift items to the view area
   */
  initPager() {
    const devicesItems = this.devicesList.querySelectorAll(
      ".widget-devices-item"
    );

    const countItems = devicesItems.length;

    if (countItems) {
      this.devicesListWidth = this.devicesList.getBoundingClientRect().width;
      this.deviceItemWidth = this.getDeviceItemWidth(devicesItems[0]);

      const itemFitsInListWidth =
        this.deviceItemWidth * countItems < this.devicesListWidth;

      if (!itemFitsInListWidth) {
        const itemsToViewCount = Math.ceil(
          countItems - Math.round(this.devicesListWidth / this.deviceItemWidth)
        );

        const devicesPager = new Pager({
          selectorId: "#devices-list-pager",
          countPages: itemsToViewCount,
          nextPageCallback: () => {
            this.shiftPage();
          },
          prevPageCallback: () => {
            this.shiftPage();
          }
        });

        return devicesPager;
      }

      return null;
    }
  }

  shiftPage() {
    const currentPage = this.pager.getCurrentPage();

    this.devicesList.style.marginLeft = `-${this.deviceItemWidth *
      currentPage}px`;
  }
}
