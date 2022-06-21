import { jsMenu } from "./componetns/jsMenu.js";
import { getToken } from "./utils/storage.js";
import { urlBase } from "./urls/api.js";
import messaging from "./componetns/messaging.js";

const token = getToken();

if (!token) {
    location.href = "index.html";
}

jsMenu();

const editForm = document.querySelector(".edit-form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const imageUrl = document.querySelector ("#image-url");
const featured = document.querySelector("#featured");
const message = document.querySelector(".message-container");

editForm.addEventListener("submit", formSubmition);

function formSubmition(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseInt(price.value);
    const descriptionValue = description.value.trim();
    const imageUrlValue = imageUrl.value.trim();
    const featuredValue = featured.checked;

    if (!titleValue || !priceValue || !descriptionValue || !imageUrlValue) {
        return messaging("warning", "Please fill out all areas", ".message-container");
    }

    addItem(titleValue, priceValue, descriptionValue, imageUrlValue, featuredValue);

}

async function addItem(title, price, description, imageUrl, featured) {
    const editUrl = urlBase + "/api/plants";

    const data = {title: title, price: price, description: description, image_url: imageUrl, featured: featured};

    console.log(data)

    // Source for body: JSON etc. : https://stackoverflow.com/questions/70731524/fetch-error-missing-data-payload-in-the-request-body
    const options = {
        method: "POST",
        body: JSON.stringify( {data: data}),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(editUrl, options);
        const json = await response.json();
        console.log(json)

        if(json.created_at) {
            messaging("success", "Product created", ".message-container");
            editForm.reset();
        }

        if(json.error) {
            messaging("error", `Error: ${json.message}`, ".message-container");
        }

        console.log(json);
    } catch (error) {
        console.log(error)
        messaging("error", "Error", ".message-container");
    }
}