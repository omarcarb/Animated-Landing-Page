function OpenMenu(button){
    let dropdownMenu = button.nextElementSibling;
    let dropdownToggle = button.getAttribute("aria-expanded")

    document.querySelectorAll(".dropdown_toggle").forEach(btn => {
        btn.setAttribute("aria-expanded", "false");
        btn.nextElementSibling.style.display = "none";
    });

    if(dropdownToggle == "false"){
        button.setAttribute("aria-expanded", "true");
        dropdownMenu.style.display ="flex"
    }
    else{
        button.setAttribute("aria-expanded", "false");
    }
}
document.addEventListener("click", function (event) {
    let isClickInside = event.target.closest(".dropdown");

    if (!isClickInside) {
        document.querySelectorAll(".dropdown_toggle").forEach(btn => {
            btn.setAttribute("aria-expanded", "false");
            btn.nextElementSibling.style.display = "none";
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    
});