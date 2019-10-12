//Variables

const cartBtn = document.querySelector(".cart-btn");
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
     try {
        let result = await fetch('products.json');
        let data = await result.json();

        let products = data.items;
        products = products.map(item =>{
            const {title,price} = item.fields;
            const {id} = item.sys;
            // const image = item.fields.files.url;

            return {title,price,id};
        })
        return products;   
     } catch (error) {
         console.log(error);
     }
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