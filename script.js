

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
function AddProducts(){
    

    let productItem = document.createElement('div');
    productItem.classList.add('product_card');
    let headingText = document.createElement('h1');
    headingText.innerHTML = "Something something";

    productItem.appendChild(headingText)

    productGrid.appendChild(productItem)
}

document.addEventListener("DOMContentLoaded", function() {
    
});

