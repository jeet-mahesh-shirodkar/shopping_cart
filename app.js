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

// const buttons =document.querySelectorAll(".bag-btn");
// console.log(buttons);

//Cart Array 
let cart = [];

//getting the products 
class Products{
 async getProducts(){ 
 try {
    let result= await fetch ('products.json');
    let data = await result.json();
      let products =data.items;
      products =products.map(item => {
          const {title,price} = item.fields;
          const {id} = item.sys;
          const image = item.fields.image.fields.file.url;
          return {id,title,price,image}
      })
    return products;
     
 } catch (error) {
     console.log(error)
 }
 }
}
//display product

class UI{
displayProduct(products){

// console.log(products);
let result = '';
products.forEach(product => {
    result +=`
    <article class="product">
            <div class="img-container">
                <img src=${product.image} alt="product" class="product-img">
                <button class="bag-btn" data-id=${product.id}>
                    <i class="fas fa-shopping-cart"></i>
                    add to bag
                </button>
            </div>
            <h3>${product.title}</h3>
            <h4>${product.price}</h4>
        </article>`;
});
productsDom.innerHTML = result;
}
getbagbutton(){
    const buttons = [...document.querySelectorAll(".bag-btn")];

    buttons.forEach(button => {
        let id = button.dataset.id;
        let inCart = cart.find(item =>{item.id === id});
        if(inCart){
            button.innerText = "In Cart";
            button.disabled = true;
        }
            button.addEventListener('click',(event) =>{
                event.target.innerText = "In Cart";
                event.target.disabled = true;
                //get product from products
                let cartItems = {...Storage.getProduct(id),amount:1};
                

        //add product to cart 
        cart = [...cart,cartItems];
        //save cart in local storage
        Storage.saveCart(cart);
        //set cart value
        this.setCartValues(cart);
        //display cart items
        this.addCartItems(cartItems);
        //show the cart
        this.showCart();
            })    
    })
}
setCartValues(cart){
    let itemsTotal = 0;
    let tempTotal = 0;
    cart.map(item =>{
        itemsTotal += item.amount;
        tempTotal += item.price * item.amount; 
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed());
    cartItems.innerText = itemsTotal;    
}
addCartItems(item){
const div = document.createElement("div");
div.classList.add("cart-item");
div.innerHTML = `<div class="cart-item">
<img src=${item.image} alt="product">
<div>
        <h4>${item.title}</h4>
        <h5>${item.price}</h5>
        <span class="remove-item" data-id=${item.id}>remove</span>
</div>
<div>
    <i class="fas fa-chevron-up"data-id=${item.id}></i>
    <p class="item-amount">${item.amount}</p>
    <i class="fas fa-chevron-down"data-id=${item.id}></i>
</div>
</div>`;
cartContent.appendChild(div);
}

showCart(){
    console.log("inn");
    
    cartOverlay.classList.add('transparentBcg');
    cartDom.classList.add('showCart');
    console.log(cartOverlay);
    
}
}
//Local Storage
class Storage{
static saveProduct(products){
    // localStorage has alot of function here we are using setItem
localStorage.setItem("products",JSON.stringify(products));
}
static getProduct(id){
    let products = JSON.parse(localStorage.getItem("products"));
     return products.find(product => product.id === id);    
}
static saveCart(cart){
    localStorage.setItem("cart",JSON.stringify(cart));
}
}

// Event Listener

document.addEventListener("DOMContentLoaded",()=>{
    const ui = new UI();
    const products = new Products();

    products.getProducts().then(products => {    
    ui.displayProduct(products)
    Storage.saveProduct(products)
    }).then(()=>{
        ui.getbagbutton();
    })
});