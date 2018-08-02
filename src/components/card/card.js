import Termostat from "../termostat/termostat";
import Popup from "../popup/popup";
import Layout from "../../layout/layout";

export default class Cards {
  constructor() {
    this.termostatInited = false;

    this.cards = document.querySelectorAll(".card");

    this.initEventListeners();
  }

  initEventListeners() {
    this.cards.forEach(card => {
      card.addEventListener("click", event => {
        const element = event.target.getBoundingClientRect();

        const { cardType } = event.target.dataset;

        switch (cardType) {
          case "temperature_active":
            this.showTermostatPopup(element);
            break;

          case "temperature":
            this.showTemperatureControllerPopup(element);
            break;

          case "sun":
          case "sun_active":
            this.showLightControllerPopup(element);
        }
      });
    });
  }

  showTermostatPopup(element) {
    const initTermostat = () => {
      if (this.termostatInited) return;

      const termostatInstance = new Termostat({
        min: 10,
        max: 30,
        defaultValue: 20
      });

      this.termostatInited = true;
    };

    const termostatSettingsPopup = new Popup({
      selector: "#popup-card-termostat",
      preview: {
        width: element.width,
        height: element.height,
        position: {
          top: element.top,
          left: element.left
        }
      },
      openCallback: initTermostat,
      layout: Layout
    });

    termostatSettingsPopup.open();
  }

  showTemperatureControllerPopup(element) {
    const temperatureSettingsPopup = new Popup({
      selector: "#popup-controller-temperature",
      preview: {
        width: element.width,
        height: element.height,
        position: {
          top: element.top,
          left: element.left
        }
      },
      layout: Layout
    });

    temperatureSettingsPopup.open();
  }

  showLightControllerPopup(element) {
    const lightSettingsPopup = new Popup({
      selector: "#popup-controller-light",
      preview: {
        width: element.width,
        height: element.height,
        position: {
          top: element.top,
          left: element.left
        }
      },
      layout: Layout
    });

    lightSettingsPopup.open();
  }
}
