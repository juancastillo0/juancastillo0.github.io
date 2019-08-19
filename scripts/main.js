import { collapseNavigation, isOpenNavigation } from "./utils-sidebar.js";

const sections = document.getElementsByTagName("section");
const navs = document.getElementsByClassName("nav-link");
let activeNav = document.querySelector(".nav-link.active");

/** Changes active navigation link */
function changeActiveNav(nav) {
  activeNav.className = activeNav.className.replace("active", "");
  nav.className = `${nav.className} active`;
  activeNav = nav;
}
/** Handle navigation link clicks */
for (let nav of navs) {
  nav.addEventListener("click", () => {
    changeActiveNav(nav);
    if (isOpenNavigation) {
      collapseNavigation();
    }
  });
}

/** Changes active navigation links on scroll */
function handleScroll() {
  const docuElem = document.documentElement;
  const scroll = docuElem.scrollTop;
  for (let i = sections.length - 1; i >= 0; i--) {
    let section = sections[i];
    if (section.offsetTop - 180 < scroll) {
      if (
        !(
          i === sections.length - 2 &&
          docuElem.scrollHeight < docuElem.scrollTop + window.innerHeight &&
          activeNav != navs[0]
        )
      ) {
        const currNav = document.querySelector(
          `.nav-link[href='#${section.id}']`
        );
        if (currNav.className.includes("active")) {
          return;
        }
        changeActiveNav(currNav);
      }
      return;
    }
  }
}
/** Handle scroll */
window.addEventListener("scroll", handleScroll);
handleScroll();

/** Copies the contact email to clipboard */
function copyEmail() {
  const email = document.querySelector("#contact-email");
  const copyText = document.createElement("textarea");
  copyText.value = email.textContent.replace(/\s/g, "");
  copyText.style.position = "fixed";

  document.body.appendChild(copyText);
  copyText.focus();
  copyText.select();

  try {
    var successful = document.execCommand("copy");
    if (!successful) {
      console.log("Error while copying");
    }
  } catch (err) {
    console.log("Error while copying");
  }
  document.body.removeChild(copyText);
}
document
  .getElementById("email-copy-button")
  .addEventListener("click", copyEmail);
