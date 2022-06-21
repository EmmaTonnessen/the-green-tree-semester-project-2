import { getUserName } from "../utils/storage.js";
import logout from "./logout.js";
import { fetchCart } from "../utils/storage.js";

export function jsMenu() {
    const userName = getUserName();
    const adminMenu = document.querySelector(".admin");
    const cartIndicator = fetchCart()
    const cart = document.querySelector(".cart");

    if(userName) {
        adminMenu.innerHTML = `<div class="footer__admin admin">
                                    <p class="footer__title">Admin</p>
                                    <div class="footer__admin-container">
                                        <button class="logout">Logout</button>
                                        <a class="edit-link" href="edit.html">Add</a>
                                    </div>
                                </div>`
    }

    if(cartIndicator.length > 0) { 
        cart.innerHTML = `Cart (${cartIndicator.length})` ;
    }

    logout();
}

