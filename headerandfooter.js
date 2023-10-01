function menu_show() {

    document.getElementById("menudropicon").style.display="none"
    var menu = document.getElementById("menu2");
    var cross = document.querySelector(".crossqs");
    cross.style.display="block"
    if (menu.classList.contains("show")) {
        menu.classList.remove("show");
    } else {
        menu.classList.add("show");
    }
  
    cross.addEventListener("click", function() {
        menu.classList.remove("show");
        document.getElementById("menudropicon").style.display="block"
        document.querySelector(".crossqs").style.display="none"
    });
}
var open=-1;
var close=-1;
var openclose=-1;
var closeopen=-1
document.addEventListener("click", function(event) {
    var dropdownItems = document.getElementsByClassName("main-nav-itemsqs");
    var isDropdownItem = false;
    var isMenuItem = true;
      for (var i = 0; i < dropdownItems.length; i++) {
        if (dropdownItems[i].contains(event.target)) {
          isDropdownItem = true;
          close=i;
          break;
        }
      }
      for (var i = 0; i < dropdownItems.length; i++) {
        if (dropdownItems[i].classList.contains("show")) {
          if (open==-1){
            open=i;
            closeopen=-2;
            break;
          }
          else if((open!=i)&&(openclose==-1)){
             openclose=i;
          }
          else{
            closeopen=i;
          }
        }
      }
      if (closeopen==-1){
        open=openclose;
        openclose=-1;
        closeopen=-1;
      }
      else if(closeopen!=-2){
        open=openclose;
        openclose=closeopen;
      }
      closeopen=-1;
      if ((open!=-1) && !dropdownItems[open].children[1].contains(event.target)) {
        isMenuItem = false
      }
      if (openclose!=-1){
        dropdownItems[openclose].classList.toggle("show");
        openclose=-1;
      }
      if ((open!=-1)&&((!isMenuItem && !isDropdownItem) || (dropdownItems[close].children.length==1) )) {
        dropdownItems[open].classList.toggle("show");
        open=-1;
        close=-1;
    }
  });
  
function dropmenu_show(id) {
    document.getElementById(id).classList.toggle("show");
  }
document.addEventListener("DOMContentLoaded", function() {
    const aboutUs = document.getElementById("about-us");
    const acads=document.getElementById("acads");
    const facilities=document.getElementById("facilities");
    const sublistabout = aboutUs.querySelector(".sublistqs");
    aboutUs.addEventListener("click", function() {
      sublistabout.style.display = sublistabout.style.display === "none" ? "flex" : "none";
    });
    const sublistacads = acads.querySelector(".sublistqs");
    acads.addEventListener("click", function() {
      sublistacads.style.display = sublistacads.style.display === "none" ? "flex" : "none";
    });
    const sublistfac = facilities.querySelector(".sublistqs");
    facilities.addEventListener("click", function() {
      sublistfac.style.display = sublistfac.style.display === "none" ? "flex" : "none";
    });
  });