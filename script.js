document.addEventListener("DOMContentLoaded", function () {
    window.OpenMenu = OpenMenu;
});
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
fetch("./product_list.json")
    .then(response => response.json())
    .then(data => PassData(data))

function PassData(data) {
    let productGrid = document.querySelectorAll('.section_grid');

    data.slice(0, 4).forEach(product => {
        productGrid.forEach(grid => {
            CreateProductCard(product, grid);
        });
    });
}
function CreateProductCard(product, productGrid){

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

fetch('./reviews.json')
    .then(response => response.json())
    .then(reviewData => CreateReview(reviewData))

function CreateReview(reviewData){
    reviewData.slice(0 , 6).forEach(review =>{
        ReviewCard(review)
    })
}

function ReviewCard(review){
    let reviewGrid = document.querySelector('.section_reviews')
    let reviewCard = document.createElement('div')
    reviewCard.classList.add('review_container')
    let ratingCardNuber = review.rating;
    let rating = ratingCardNuber.toString();


    let content = document.createRange().createContextualFragment(`
        <img src=${review.picture} alt="" class="review_profile_img">
        <div class="review_text">
            <h3>${review.author.first_name} ${review.author.last_name}</h3>
            <p>${review.comment}</p>
            <div class="review_text_bottom">
                <p class="review_date">${review.date}</p>
                <p class="review_rating">${rating}/5</p>
            </div>
        </div>
    `);

    reviewCard.appendChild(content)
    reviewGrid.appendChild(reviewCard)
}

let blob = document.querySelector('.blob')
let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;
let currentX = targetX
let currentY = targetY

const easeFactor = 0.05;

document.addEventListener("mousemove", (event) => {
    
    targetX = event.pageX
    targetY = event.pageY
});


function animate(){
    currentX += (targetX - currentX) * easeFactor
    currentY += (targetY - currentY) * easeFactor

    let rotation = (performance.now() /10) % 360

    blob.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;

    console.log(blob.style.transform)

    requestAnimationFrame(animate)
}

animate()