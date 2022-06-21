import { fetchCart } from "./utils/storage.js";
import { jsMenu } from "./componetns/jsMenu.js";
import messaging from "./componetns/messaging.js";

jsMenu();

let cart = fetchCart();

const cartContainer = document.querySelector(".items-container");
const totalContainer = document.querySelector(".toltal-container");

if(cart.length === 0) {
    messaging("note", "You have no items in your cart yet", ".no-items-container");
}

function createCart() {
    let total = 0;

    cartContainer.innerHTML = "";
    totalContainer.innerHTML ="";
    cart.forEach(cartItem => {
        total += parseFloat(cartItem.price);

        cartContainer.innerHTML += `<div class="cart-container">
                                        <h3>${cartItem.title}</h3>
                                        <div class="cart-image" style="background-image: url('${cartItem.image}')"></div>
                                        <div class="view-price-container">
                                            <a class="view-items" href="details.html?id=${cartItem.id}">View item</a>
                                            <p class="product-price">${cartItem.price}€</p>
                                        </div>

                                        <button class="delete-item" data-item="${cartItem.id}">Remove from cart</button>
                                    </div>`;
        
        totalContainer.innerHTML = `<p class="total">Total: ${total}€</p>`;
    });

    const deleteBtn = document.querySelectorAll(".delete-item");

    deleteBtn.forEach(function (clear) {
        clear.addEventListener("click", removeFromCart);
    });
}

createCart();

function removeFromCart(event) {
    const deleteThisItem = event.target.dataset.item;

    const newCart = cart.filter(function(item) {
        if(deleteThisItem !== item.id) {
            return true;
        }
    });

    cart = newCart;

    saveCart(cart)

    createCart();
    jsMenu();
}

function saveCart(cart) {
    localStorage.setItem("cartItem", JSON.stringify(cart));
}