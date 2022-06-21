import { urlBase } from "./urls/api.js";
import { fetchCart } from "./utils/storage.js";
import { jsMenu } from "./componetns/jsMenu.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./componetns/deleteButton.js"
import messaging from "./componetns/messaging.js";

const token = getToken();
const form = document.querySelector(".edit-product");

if (!token) {
    form.style.display = "none";
}

jsMenu();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if(!id) {
    document.location.href = "/";
}

const detailsUrl = urlBase + "/api/plants/" + id;

(async function() {
    try {
        const response = await fetch(detailsUrl);
        const details = await response.json();
        const plant = details.data

        document.title = plant.attributes.title + ", The Green Tree";

        const detailsContainer = document.querySelector(".details-container");

        detailsContainer.innerHTML = `<div class="details-wrapper">
                                        <div class="image-wrapper">
                                            <h1>${plant.attributes.title}</h1>
                                            <div class="details-image" style="background-image: url('${plant.attributes.image_url}')"></div>
                                            <p class="product-price detail-price">${plant.attributes.price}€</p>
                                        </div>
                                        <div class="description-wrapper">
                                            <p class="product-description">${plant.attributes.description}</p>
                                            <button class="add-item" data-id="${plant.id}" data-title="${plant.attributes.title}" data-price="${plant.attributes.price}" data-image="${plant.attributes.image_url}">Add Item</button>
                                        </div>
                                        
                                    </div>`

        
        const addItem = document.querySelector(".add-item");

        addItem.addEventListener("click", addItemOnClick);

        function addItemOnClick() {
            const id = this.dataset.id;
            const title = this.dataset.title;
            const price = this.dataset.price;
            const image = this.dataset.image;

            const theCart = fetchCart();

            const existCheck = theCart.find(function(exist) {
                return exist.id === id;
            });

           
            const article = {id, title, price, image};

            theCart.push(article);
    
            saveCart(theCart);

            jsMenu();
        }

        function saveCart(cart) {
            localStorage.setItem("cartItem", JSON.stringify(cart));
        }

        
    } catch (error) {
        console.log(error)
        messaging("error", "There have been an error, sorry for the inconvinience!", ".details-container");

    }


})();

const productUrl = urlBase + "/api/plants/" + id;

const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const imageUrl = document.querySelector ("#image-url");
const featured = document.querySelector("#featured");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");

(async function () {
    try {
        const response = await fetch(productUrl);
        const rawData = await response.json();
        const details = rawData.data

        title.value = details.attributes.title;
        price.value = details.attributes.price;
        description.value = details.attributes.description;
        imageUrl.value = details.attributes.image_url
        featured.checked = details.attributes.featured
        idInput.value = details.id;

        deleteButton(details.id);
    } catch (error) {
        console.log(error);
    } 
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const imageUrlValue = imageUrl.value.trim();
    const featuredValue = featured.checked;
    const idValue = idInput.value;

    if (titleValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0 || !imageUrlValue) {
        return messaging("warning", "Supply info", ".message-container");
    }

    updateProduct(titleValue, priceValue, descriptionValue, idValue, imageUrlValue, featuredValue);
}

async function updateProduct(title, price, description, id, imageUrl, featured) {
    const url = urlBase + "/api/plants/" + id;

    const data = {title: title, price: price, description: description, image_url: imageUrl, featured: featured};

    const options = {
        method: "PUT",
        body: JSON.stringify( {data: data}),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.updated_at) {
            messaging("success", "Item updated", ".message-container");
        }

        if (json.error) {
            messaging("error", "There has been an error, sorry for the inconvinience!", ".message-container");
        }
    } catch (error) {
        console.log(error);
        messaging("error", "There has been an error, sorry for the inconvinience!", ".message-container");
    }
}