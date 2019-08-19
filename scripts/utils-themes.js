/* eslint-disable linebreak-style */

/** Dark theme object definition */
export const darkTheme = {
  "--main-bg-color": "rgb(20, 20, 20)",
  "--secondary-color": "hsla(216, 2%, 20%, 1)",
  "--primary-color": "hsla(207, 3%, 11%, 1)",
  "--font-color": "hsla(198, 2%, 53%, 1)",
  "--anchor-color": "hsla(216, 38%, 61%, 1)"
};
/** Default (light) theme object definition */
export const defaultTheme = {
  "--main-bg-color": "rgb(233, 239, 240)",
  "--secondary-color": "rgb(223, 220, 220)",
  "--primary-color": "white",
  "--font-color": "#212529",
  "--anchor-color": "rgb(15, 72, 179)"
};

/** Sets arbitrary color theme */
export function setColorTheme(theme) {
  for (let [key, value] of Object.entries(theme)) {
    document.documentElement.style.setProperty(key, value);
    window.sessionStorage.setItem(key, value);
  }
}

/** Sets sessionStorage color theme or default */
export function setSessionColorThemeOrDefault() {
  const theme = {};
  for (let key of Object.keys(defaultTheme)) {
    let value = window.sessionStorage.getItem(key);
    if (value !== null) {
      theme[key] = value;
    } else {
      setColorTheme(defaultTheme);
      return;
    }
  }
  setColorTheme(theme);
}
setSessionColorThemeOrDefault();

/** Returns true if the sessionStorage theme is equivalent to the dark theme */
export function isDarkTheme() {
  for (let key of Object.keys(defaultTheme)) {
    let value = window.sessionStorage.getItem(key);
    if (!(value !== null && value === darkTheme[key])) {
      return false;
    }
  }
  return true;
}

/** Change color theme between dark or default */
function changeTheme(event) {
  if (event.target.checked) {
    setColorTheme(darkTheme);
  } else {
    setColorTheme(defaultTheme);
  }
}

/** Initialices dark-mode-switch if it's in the document */
const darkModeSwitch = document.getElementById("dark-mode-switch");
if (darkModeSwitch) {
  darkModeSwitch.checked = isDarkTheme();
  darkModeSwitch.addEventListener("change", changeTheme);
}


/** Set font size in session storage and document */
function setFontSize(value) {
  window.sessionStorage.setItem("--font-size", value);
  document.documentElement.style.setProperty("--font-size", `${value}px`);
}

/** Initializes font size from session storage or default */
const fontSize = window.sessionStorage.getItem("--font-size") || 19;
setFontSize(fontSize);

/** Initializes font-size-range if it's in the document */
const fontSizeRange = document.getElementById("font-size-range");
if (fontSizeRange) {
  fontSizeRange.value = fontSize;

  const increaseFontSize = function(amount) {
    const value = Math.max(
      Math.min(
        Number(fontSizeRange.max),
        amount + Number(fontSizeRange.value)
      ),
      Number(fontSizeRange.min)
    );
    setFontSize(value);
    fontSizeRange.value = new String(value);
  };

  fontSizeRange.addEventListener("change", e => setFontSize(e.target.value));
  fontSizeRange.addEventListener("input", e => setFontSize(e.target.value));
  const fontSizeButtons = document.querySelectorAll(
    "#font-size-range-container .range-input-container button"
  );
  fontSizeButtons[0].addEventListener("click", () => increaseFontSize(-1));
  fontSizeButtons[1].addEventListener("click", () => increaseFontSize(1));
}
