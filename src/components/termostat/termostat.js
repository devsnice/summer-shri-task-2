// TODO:
// - moved numbers to variables
// - hold value in the input
// - fix arrow styles

class Termostat {
  constructor({ min, max, defaultValue }) {
    this.isDragging = false;

    this.elem = document.getElementById("termostat");
    this.value = document.getElementById("termostat-value");
    this.termostatInput = document.getElementById("termostat-input");

    this.options = {
      min,
      max,
      fromAngle: 30,
      toAngle: 330,
      angle: 330 - 30,
      divisionSize: 300 / (max - min)
    };

    this.marksSize = {
      lineLength: 21.5
    };

    this.elementOptions = {
      height: this.elem.clientHeight,
      width: this.elem.clientWidth,
      radius: (this.elem.clientHeight - this.marksSize.lineLength * 2) / 2
    };

    this.elementCenterCoords = {
      x:
        this.elem.offsetTop +
        this.elementOptions.radius +
        this.marksSize.lineLength,
      y:
        this.elem.offsetLeft +
        this.elementOptions.radius +
        this.marksSize.lineLength
    };

    this.arrow = new TermostatArrow({
      circleFromAngle: this.options.fromAngle
    });

    this.markers = new TermostatMarkers({
      circleRadius: this.elementOptions.radius,
      markLength: this.marksSize.lineLength,
      circleAngle: this.options.angle
    });

    this.setInitValue(defaultValue);
    this.addEventListeners();
  }

  setInitValue(defaultTemperature) {
    const mapTemperatureToRadians = temperature => {
      const radians =
        this.options.divisionSize * (temperature - this.options.min);

      return radians;
    };

    const cssInitRadiansAngle = mapTemperatureToRadians(defaultTemperature);

    this.updateTermostatValue(cssInitRadiansAngle);
  }

  renderTermostatValue(newRadianValue) {
    const mapRadiansToTemperature = radians => {
      const temperature =
        this.options.min + radians / this.options.divisionSize;

      return Math.round(temperature);
    };

    const newValue = mapRadiansToTemperature(newRadianValue);

    this.value.innerHTML = `+${newValue}`;
  }

  updateTermostatValue(cssNewRadiansAngle) {
    this.arrow.updateValue(cssNewRadiansAngle);
    this.markers.updateMarkersValue(cssNewRadiansAngle);
    this.renderTermostatValue(cssNewRadiansAngle);
  }

  processUserGesture(e) {
    const eventCoords = {
      x: e.pageX,
      y: e.pageY
    };

    const deltaX = this.elementCenterCoords.x - eventCoords.x;
    const deltaY = this.elementCenterCoords.y - eventCoords.y;

    const newAngle = Math.atan2(-deltaY, -deltaX); // -, because we need to flip circle (2pi -> pi, pi -> 2pi)
    const newAngleInRadians = newAngle * (180 / Math.PI);

    // shifting radians for convenient working with min-range of termostat
    let cssNewRadiansAngle =
      newAngleInRadians - 120 < 0
        ? newAngleInRadians + 360 - 120
        : newAngleInRadians - 120;

    if (cssNewRadiansAngle > 300 && cssNewRadiansAngle < 330) {
      cssNewRadiansAngle = 300;
    }

    if (cssNewRadiansAngle < 360 && cssNewRadiansAngle > 330) {
      cssNewRadiansAngle = 0;
    }

    this.updateTermostatValue(cssNewRadiansAngle);
  }

  addEventListeners() {
    this.elem.addEventListener("mousedown", e => {
      this.isDragging = true;
    });

    window.addEventListener("mousemove", e => {
      if (this.isDragging) {
        this.processUserGesture(e);
      }
    });

    window.addEventListener("mouseup", e => {
      this.isDragging = false;
    });
  }
}

class TermostatMarkers {
  constructor({ markLength, circleRadius, circleAngle }) {
    this.options = {
      circleRadius,
      circleAngle
    };

    this.line = {
      length: markLength,
      breadth: 1,
      offset: 1.4
    };

    this.markersGroupElem = document.getElementById("termostat-marks");
    this.markersStylesBlock = document.getElementById("termostat-styles");

    this.initMarks();
  }

  initMarks() {
    const lines = [];

    const amountLines =
      this.options.circleAngle / (this.line.breadth + this.line.offset);

    for (let i = 0; i < amountLines; i++) {
      const defaultLine = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );

      defaultLine.setAttribute("x1", "0");
      defaultLine.setAttribute("y1", "0");
      defaultLine.setAttribute("x2", this.line.length);
      defaultLine.setAttribute("y2", "0");
      defaultLine.setAttribute("class", "termostat-marks__line");

      defaultLine.setAttribute(
        "transform",
        `rotate(${(this.line.breadth + this.line.offset) * i}) 
         translate(${this.options.circleRadius}, 0)`
      );

      lines.push(defaultLine);
    }

    this.markersGroupElem.append(...lines);
  }

  updateMarkersValue(cssNewRadiansAngle) {
    const filledMarkersAmount = Math.round(
      cssNewRadiansAngle / (this.line.breadth + this.line.offset)
    );

    this.markersStylesBlock.innerHTML = `
       #termostat-marks line:nth-child(-n + ${filledMarkersAmount}){
            stroke: #F5A623;
       }
    }`;
  }
}

class TermostatArrow {
  constructor({ circleFromAngle }) {
    this.arrowElement = document.getElementById("termostat-arrow");

    this.options = {
      circleFromAngle
    };
  }

  updateValue(cssNewRadiansAngle) {
    this.arrowElement.style.transform = `rotate(${Math.round(
      cssNewRadiansAngle + this.options.circleFromAngle
    )}deg)`;
  }
}

// const termostatInstance = new Termostat({
//   min: 10,
//   max: 30,
//   defaultValue: 20
// });
