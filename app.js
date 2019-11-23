//Variables

const cartBtn = document.querySelector(".cart-btn");
console.log(cartBtn); 
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDom = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDom = document.querySelector(".products-center");

//Cart Array 
let cart = [];

//getting the products 
class Products{
 async getProducts(){
     
}
}
//display product
class UI{

}
//local storage
class Storage{

}
document.addEventListener("DOMContentLoaded",()=>{
    const ui = new UI();
    const products = new Products();

    products.getProducts().then(products => console.log(products));
})