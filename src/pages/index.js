import layout from "../layout/layout";

import Cards from "../components/card/card.js";
import HeaderNavigation from "../components/header/header";
import DevicesList from "../features/dashboardDevices/devicesList";
import VerticalSlider from "../features/dashboardMain/sliderVertical";
import ScriptsList from "../features/dashboardScripts/scriptsList";

// init features
const cards = new Cards();
const devicesList = new DevicesList();
const scriptsList = new ScriptsList();
const nextEventSliders = new VerticalSlider("#slider-vertical");
const headerNavigation = new HeaderNavigation({
  selector: "#header-menu",
  layout
});
