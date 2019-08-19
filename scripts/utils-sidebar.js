const buttonCollapse = document.getElementById("navigation-collapse");
const buttonClose = document.getElementById("navigation-close");
const navigation = document.getElementById("navigation");
export let isOpenNavigation = false;

/** Shows and hides navigation */
function showNavigation() {
  navigation.style.top = "0px";
  isOpenNavigation = true;
}
function hideNavigation() {
  navigation.style.top = "-1000px";
  isOpenNavigation = false;
}

/** Changes state of navigation */
export function collapseNavigation() {
  if (isOpenNavigation) {
    hideNavigation();
  } else {
    showNavigation();
  }
}
buttonCollapse.addEventListener("click", collapseNavigation);
buttonClose.addEventListener("click", collapseNavigation);

/** Check navigation on resize */
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    showNavigation();
    isOpenNavigation = false;
  } else if (!isOpenNavigation) {
    hideNavigation();
  }
});
