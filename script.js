document.addEventListener("DOMContentLoaded", function () {
    window.OpenMenu = OpenMenu;
    AddAnimationDNA();
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
    let productGrids = document.querySelectorAll('.section_grid');
    if (productGrids.length === 0) return; 
    productGrids.forEach(grid => {
        let productVisibility = grid.getAttribute("data-item-display");

        let filteredData = productVisibility === "onSale"
            ? data.filter(product => product.on_sale).slice(0, 4)
            : data.slice(0, 4);

        filteredData.forEach(product => {
            CreateProductCard(product, grid);
        });
    });
}
function CreateProductCard(product, productGrid){
    let productCard = document.createElement('div')
    productCard.classList.add('product_card')
    if(product.on_sale == true){
        let content = document.createRange().createContextualFragment(`
            <div class=card_img>
                <img src="${product.image}" alt="image for ${product.name}" class="card_thumbnail">
                <div class=like_button></div>
            </div>
            <div class=card_bottom>
                <div class=card_text>
                    <h3>${product.name}</h3>
                    <div class = "price_container">
                        <span class = "original_price">$${product.price}</span>
                        <span class = "sales_price">$${product.sale_price}</span>
                    </div>
                </div>
                <div class=button_container id=card>
                    <button class="secondary">Add to Cart</button>
                    <button class="primary">Buy Now</button>
                </div>
                
            </div>
        `);
        productCard.appendChild(content);
    }
    else{
        let content = document.createRange().createContextualFragment(`
            <div class=card_img>
                <img src="${product.image}" alt="image for ${product.name}" class="card_thumbnail">
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
    }
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

const blob = document.querySelector('.blob');
let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;
let currentX = targetX;
let currentY = targetY;
const easeFactor = 0.1;
document.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
});
function animate() {
    currentX += (targetX - currentX) * easeFactor;
    currentY += (targetY - currentY) * easeFactor;
    const documentHeight = document.documentElement.scrollHeight;
    const stopPointY = documentHeight - 200; 
    console.log(stopPointY)
    const maxX = document.documentElement.scrollWidth - blob.offsetWidth;
    const maxY = stopPointY - blob.offsetHeight;
    currentX = Math.max(0, Math.min(currentX, maxX));
    currentY = Math.max(0, Math.min(currentY, maxY));
    blob.style.left = `${currentX}px`;
    blob.style.top = `${currentY}px`;
    requestAnimationFrame(animate);
}
animate();
function AddAnimationDNA(animationDelay){
    let dnaConatiner = document.querySelector('.background_elements')
    let dnaContent = document.createRange().createContextualFragment(`
        <div class="dna_strand">
            <div class="wrapper left" data-delay="${animationDelay}">
                <div class="circle_molecule left" data-delay="${animationDelay}"></div>
            </div>
            <div class="molecule_strand" data-delay="${animationDelay}"></div>
            <div class="wrapper right" data-delay="${animationDelay}">
                <div class="circle_molecule right" data-delay="${animationDelay}"></div>
            </div>
        </div>`)
    dnaConatiner.appendChild(dnaContent)
    AddAniamtionDelay()
}
function AddAniamtionDelay(){
    let wrapperElement = document.querySelectorAll(".wrapper")
    let circleElement = document.querySelectorAll(".circle_molecule")
    let strandElement = document.querySelectorAll(".molecule_strand")

    wrapperElement.forEach(wrapper =>{
        let wrapperElementDelay = wrapper.getAttribute("data-delay");

        wrapper.style.animationDelay = (wrapperElementDelay * 500) + "ms";
    })
    circleElement.forEach(circle =>{
        let circleElementDelay = circle.getAttribute("data-delay")

        circle.style.animationDelay = (circleElementDelay * 500) + "ms";
    })
    strandElement.forEach(strand=>{
        let strandElementDelay = strand.getAttribute("data-delay")

        strand.style.animationDelay = (strandElementDelay * 500) + "ms"
    })
}
let maxDNACount = 35;
var dnaCounter = 0;
while(dnaCounter<maxDNACount){
    AddAnimationDNA(dnaCounter);
    dnaCounter++;
}