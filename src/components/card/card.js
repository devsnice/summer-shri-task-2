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

        console.log(event.target.dataset.cardType);

        const initTermostat = () => {
          if (this.termostatInited) return;

          const termostatInstance = new Termostat({
            min: 10,
            max: 30,
            defaultValue: 20
          });

          this.termostatInited = true;
        };

        const cardSettingsPopup = new Popup({
          selector: "#popup-card",
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

        cardSettingsPopup.open();
      });
    });
  }
}
