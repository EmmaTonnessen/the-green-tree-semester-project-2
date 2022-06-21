import { urlBase } from "./urls/api.js";
import { jsMenu } from "./componetns/jsMenu.js";
import messaging from "./componetns/messaging.js";

jsMenu();


const productsUrl = urlBase + "/api/plants";

const heroUrl = urlBase + "/api/hero?populate=hero_banner";

(async function() {
    const heroContainer = document.querySelector(".hero-container");

    try {
        const response = await fetch(heroUrl);
        const json = await response.json();
        const content = json.data.attributes.hero_banner.data.attributes

        heroContainer.innerHTML += `<div class="hero-image" style="background-image: url('${content.url}')">
                                        <h1 class="home-header">Bring Life Into Your Home</h1>
                                        <p class="tagline">Here at The Green Tree we have the perfect plant for you! Whether you are a novice or an experienced plant lover.</p>
                                        <a class="cta" href="products.html">Have a look</a>
                                    </div>`;


    } catch(error) {
        console.log(error)
        messaging("error", "There has been an error, sorry for the inconvinience!", ".hero-container");
    }
})();

// featured

(async function() {
    const featuredContainer = document.querySelector(".featured-container");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();
        const plants = json.data

        featuredContainer.innerHTML = "";

        for (let i = 0; i < plants.length; i++) {
            console.log(plants[i].attributes.title)

            if (plants[i].attributes.featured) {
                featuredContainer.innerHTML += `<a class="items" href="details.html?id=${plants[i].id}">
                                                    <div class="products-wrapper">
                                                        <div class="product-image" style="background-image: url('${plants[i].attributes.image_url}')"></div>
                                                        <div class="title-price-container">
                                                            <h3>${plants[i].attributes.title}</h3>
                                                            <p class="product-price">${plants[i].attributes.price}€</p>
                                                        </div>
                                                    </div>
                                                </a>`
            }
        }


    } catch(error) {
        console.log(error)
        messaging("error", "There has been an error, sorry for the inconvinience!", ".featured-container");
    }
})();
