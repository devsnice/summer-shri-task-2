const cards = document.querySelectorAll(".card");

let termostatInited = false;

cards.forEach(card => {
  card.addEventListener("click", event => {
    const element = event.target.getBoundingClientRect();

    const initTermostat = () => {
      if (termostatInited) return;

      const termostatInstance = new Termostat({
        min: 10,
        max: 30,
        defaultValue: 20
      });

      termostatInited = true;
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
      openCallback: initTermostat
    });

    cardSettingsPopup.open();
  });
});
