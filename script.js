const addToCartButton = document.querySelectorAll(".add-Cart-Button");

addToCartButton.addEventListener("click", () =>{
    const productName = button.getAttribute("data-name");
    const productPrice = button.getAttribute("data-price");
    const productImage = button.getAttribute("data-image");
    addToCart(productName, productPrice, productImage);
})

function addToCart(name, price){

}