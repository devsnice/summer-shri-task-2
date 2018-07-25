const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("click", event => {
    const element = event.target;

    const initTermostat = () => {
      const termostatInstance = new Termostat({
        min: 10,
        max: 30,
        defaultValue: 20
      });
    };

    const cardSettingsPopup = new Popup({
      selector: "#popup-card",
      preview: {
        width: element.clientWidth,
        height: element.clientHeight,
        position: {
          top: element.offsetTop,
          left: element.offsetLeft
        }
      },
      openCallback: initTermostat
    });

    cardSettingsPopup.open();
  });
});
