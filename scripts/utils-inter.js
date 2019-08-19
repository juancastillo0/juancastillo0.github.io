export const ES = "ES";
export const EN = "EN";

/** Generates elements based on json objects */
function addGenerated(className, value, pre, suf) {
  const query = `${pre.join(" ")} ${suf.join(" ")} .${className}`;
  const elem = document.querySelector(query);
  const parent = elem.parentElement;
  parent.removeChild(elem);

  for (let obj of value) {
    const newElem = elem.cloneNode(true);
    for (let [key, value] of Object.entries(obj)) {
      newElem.querySelector(`.${className}-${key}`).innerHTML = value;
    }
    parent.appendChild(newElem);
  }
}

/** Recursive function to convert from json list into html <li> */
function makeList(html) {
  if (typeof html === "string") {
    return `<li>${html}</li>`;
  } else if (Array.isArray(html)) {
    return `<ul>${html.map(makeList).join("")}</ul>`;
  } else {
    throw new Error();
  }
}

/** Adds html generated from json to the html element */
function addHtml(elem, html, key, pre, suf) {
  if (typeof html === "string") {
    elem.innerHTML = html;
  } else if (Array.isArray(html)) {
    elem.innerHTML = html.map(makeList).join("");
  } else {
    addData(html, [...pre, key], suf);
  }
}

/** Parses json file to html */
function addData(dict, pre = [], suf = []) {
  for (let [key, value] of Object.entries(dict)) {
    const selector = key[0];

    switch (selector) {
      case "#":
      case "[":
        const query = `${pre.join(" ")} ${key} ${suf.join(" ")}`;
        const elem = document.querySelector(query);
        if (elem === null) {
          throw new Error(query);
        }
        addHtml(elem, value, key, pre, suf);
        break;
      case ".":
        addData(value, pre, [...suf, key]);
        break;
      case "$":
        addGenerated(key.slice(1), value, pre, suf);
        break;
      default:
        throw new Error(selector);
    }
  }
}

/** Load data to refresh document with language */
async function loadData(lang) {
  const dataRaw = await fetch(`../data/data.${lang}.json`);
  const data = await dataRaw.json();
  addData(data.configuration);

  switch (document.location.pathname) {
    case "/":
      addData(data.index);
      break;
    case "/main":
      addData(data.main);
      break;
    default:
      throw new Error();
  }
  window.sessionStorage.setItem("lang", lang);
}

/** Initialize languaje-select and set event listener */
let currLang = window.sessionStorage.getItem("lang") || EN;
const langSelect = document.getElementById("language-select");
if (langSelect !== null) {
  langSelect.value = currLang;
  langSelect.addEventListener("input", event => {
    currLang = event.target.value;
    loadData(currLang);
  });
}
/** Load data */
loadData(currLang);
