fetch("./product_list.json")
    .then(response => response.json())
    .then(data => showInfo(data))

function showInfo(data){
    console.log(data)
    data.slice(0 , 4).forEach(product => CreateProductCard(product));
}


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

function CreateProductCard(product){
    let productGrid = document.querySelector('.section_grid')

    let productCard = document.createElement('div')

    productCard.classList.add('product_card')
    let content = document.createRange().createContextualFragment(`
        <div class=card_img>
            <img src="https://cdn.create.web.com/images/industries/common/images/placeholder-product-image-sq.jpg" alt="" class="card_thumbnail">
            <div class=like_button></div>
        </div>
        <div class=card_bottom>
            <div class=card_text>
                <h3>${product.name}</h3>
                <span>$${product.price}</span>
            </div>
            <div class=button_container id=card>
                <button class="secondary">Add to Cart</button>
                <button class="primary">Buy Now</button>
            </div>
            
        </div>
    `);
    productCard.appendChild(content);

    productGrid.appendChild(productCard)
}
