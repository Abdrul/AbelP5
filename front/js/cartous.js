/**
 * GENERATION HTML *************************
 * Génére dynamiquement les articles à partir d'un template dans le html.
 * J'utilise des labels pour mettre mes valeurs aux endroits appropriés.
 */
 const data = [
    {
        id: 1,
        name: "Souris",
        color: "red",
        price: 1500,
        quantity: 3
    },
    {
        id: 2,
        name: "Tapis",
        color: "black",
        price: 1050,
        quantity: 2
    },
    {
        id: 3,
        name: "Clavier",
        color: "red",
        price: 4000,
        quantity: 1
    },
    {
        id: 4,
        name: "Souris",
        color: "green",
        price: 1500,
        quantity: 1
    }
];

const cartName = "forth_cart";

const templateCard = document.querySelector("#template .product");
const main = document.querySelector("main");
const divNbArticles = document.querySelector("#nbArticles");
const divTotalCost = document.querySelector("#totalCost");

data.forEach((item) => {
    const div = templateCard.cloneNode(true);
    div.style.removeProperty("display");
    div.innerHTML = div.innerHTML
        .replaceAll("{{id}}", item.id)
        .replaceAll("{{name}}", item.name)
        .replaceAll("{{color}}", item.color)
        .replaceAll("{{quantity}}", item.quantity)
        .replaceAll("{{price}}", item.price)
        .replaceAll("{{price_formated}}", (item.price / 100).toFixed(2));
    main.appendChild(div);
});

// Je met à jour le footer
updataFooter();

/**
 * BOUTON AJOUTER AU PANIER *************************
 * J'ai simplifié le html histoire de ne pas y passer 2 heures.
 * Pour expliquer mon html, chaque bouton contient toutes les données du produit à ajouter
 * Le but du codepen est surtout de traiter de la récupération et de la mise à jour du localStorage.
 */
const btns_add = document.querySelectorAll("main button[id^=add]");

// J'ajoute un event au click de chaque bouton qui appelle addToCart
// btns_add.forEach((button) => button.addEventListener("click", addToCart));

function addToCart(e) {
    // Je crée un objet du produit à ajouter avec toutes les données
    // Vu que j'ai toutes les données sur le bouton, il est très rapide de tout récup
    // Le + convertit en nombre
    const productToAdd = {
        id: +e.target.getAttribute("data-id"),
        name: e.target.getAttribute("data-name"),
        color: e.target.getAttribute("data-color"),
        price: +e.target.getAttribute("data-price"),
        quantity: +e.target.getAttribute("data-quantity")
    };

    // Je récupère le panier à partir du localStorage
    // Dans le cas où il n'y en a pas encore, je met un tableau vide
    const currentCart = JSON.parse(localStorage.getItem(cartName)) ?? [];

    // Je récupère l'index du produit ayant l'id et la couleur de mon produit à ajouter
    // Si le produit n'est pas trouvé, ca me retourne -1
    const itemIndex = currentCart.findIndex(
        (item) =>
            item.id === productToAdd.id && item.color === productToAdd.color
    );
    if (itemIndex !== -1) {
        // Je met à jour mon panier en ajoutant la quantité du produit à ajouter au produit déjà présent
        currentCart[itemIndex].quantity += productToAdd.quantity;
    } else {
        // J'ajoute mon produit au panier
        currentCart.push(productToAdd);
    }
    // Je met à jour le panier dans le localstorage
    localStorage.setItem(cartName, JSON.stringify(currentCart));
}

const btns_del = document.querySelectorAll("main button[id^=del]");
// J'ajoute un event au click de chaque bouton qui appelle delToCart
// btns_del.forEach((button) => button.addEventListener("click", delToCart));

/**
 * BOUTON RETIRER DU PANIER *************************
 * N'ayant pas de page panier, je supprime à partir de mes articles.
 * Cliquer sur le bouton Retirer va supprimer l'article avec l'id et la couleur
 * associété au bouton
 */
function delToCart(e) {
    const productToDel = {
        id: +e.target.getAttribute("data-id"),
        color: e.target.getAttribute("data-color")
    };

    // Je récupère le panier à partir du localStorage
    // Dans le cas où il n'y en a pas encore, je met un tableau vide
    const currentCart = JSON.parse(localStorage.getItem(cartName)) ?? [];

    // Je récupère l'index du produit ayant l'id et la couleur de mon produit à ajouter
    // Si le produit n'est pas trouvé, ca me retourne -1
    const itemIndex = currentCart.findIndex(
        (item) =>
            item.id === productToDel.id && item.color === productToDel.color
    );
    if (itemIndex !== -1) {
        // Je met à jour mon panier en ajoutant la quantité du produit à ajouter au produit déjà présent
        currentCart.splice(itemIndex, 1);
    } else {
        // Produit non trouvé dans le panier
    }
    // Je met à jour le panier dans le localstorage
    localStorage.setItem(cartName, JSON.stringify(currentCart));
}

// Note, on remarque que ajouter et supprimer du panier sont très très similaire, il serait
// donc possible de ne faire qu'une seule fonction pour éviter la redondance.
// On notera aussi qu'à chaque ajout/retrait d'un produit, je récupère le panier, on pourrait
// très bien le récupérer au tour début et conserver son contenu dans currentCart, que l'on
// mettrait à jour à chaque interaction avec le panier.

// J'ajoute un event au click de chaque bouton qui ajoute et supprime
// A DECOMMENTER POUR FAIRE AVEC editCart, EN N'OUBLIANT PAS DE COMMENTER LES 2 DU DESSUS
btns_add.forEach((button) =>
    button.addEventListener("click", (e) => editCart(e.target, "add"))
);
btns_del.forEach((button) =>
    button.addEventListener("click", (e) => editCart(e.target, "del"))
);

function editCart(element, action) {
    if (action !== "add" && action !== "del") {
        console.log("Action non reconnue");
        return;
    }

    // Je crée un objet du produit à ajouter ou supprimer avec toutes les données
    // Vu que j'ai toutes les données sur le bouton, il est très rapide de tout récup
    // Le + convertit en nombre
    const product = {
        id: +element.getAttribute("data-id"),
        name: element.getAttribute("data-name"),
        color: element.getAttribute("data-color"),
        price: +element.getAttribute("data-price"),
        quantity: +element.getAttribute("data-quantity")
    };

    // Je récupère le panier à partir du localStorage
    // Dans le cas où il n'y en a pas encore, je met un tableau vide
    const currentCart = JSON.parse(localStorage.getItem(cartName)) ?? [];

    // Je récupère l'index du produit ayant l'id et la couleur de mon produit à ajouter
    // Si le produit n'est pas trouvé, ca me retourne -1
    const itemIndex = currentCart.findIndex(
        (item) => item.id === product.id && item.color === product.color
    );

    // Je vérifie seulement si l'action est add.
    // Vu que je vérifie au dessus si c'est add ou del, si ce n'est pas add, c'est donc forcement del.
    if (action === "add") {
        if (itemIndex !== -1) {
            // Je met à jour mon panier en ajoutant la quantité du produit à ajouter au produit déjà présent
            currentCart[itemIndex].quantity += product.quantity;
        } else {
            // J'ajoute mon produit au panier
            currentCart.push(product);
        }
    } else {
        // DEL
        if (itemIndex !== -1) {
            // Je met à jour mon panier en ajoutant la quantité du produit à ajouter au produit déjà présent
            currentCart.splice(itemIndex, 1);
        } else {
            // Produit non trouvé dans le panier
        }
    }

    // Je met à jour le panier dans le localstorage
    localStorage.setItem(cartName, JSON.stringify(currentCart));

    // Je met à jour le footer
    updataFooter(currentCart);
    // getCost(currentCart[0]);
}

// FOOTER
function updataFooter() {
    const currentCart = JSON.parse(localStorage.getItem(cartName)) ?? [];
    countArticles(currentCart);
    countTotal2(currentCart);
}

/** Calcule le nombre de produits dans le panier */
function countArticles(cart) {
    divNbArticles.innerText = cart.reduce(
        (cum, curr) => cum + curr.quantity,
        0
    );
}
/** Calcule le prix total du panier */
function countTotal(cart) {
    // divTotalCost.innerText = cart.reduce((cum, curr) => cum + getCost(curr), 0);
    divTotalCost.innerText =
        cart.reduce((cum, curr) => cum + curr.quantity * curr.price, 0) / 100;
}

// Version si le prix est uniquement dans les datas et non dans le cart
function countTotal2(cart) {
    divTotalCost.innerText =
        cart.reduce((cum, curr) => cum + getCost(curr), 0) / 100;
}
// Calcule le cout du produit
function getCost(item) {
    const data = getItemData(item);
    return data.price * data.quantity;
}
// Fin version

// Récupère les données d'un produit
// itemCart est un objet qui doit avoir les props id et color
function getItemData(itemCart) {
    return data.find(
        (itemData) =>
            itemData.id === itemCart.id && itemData.color === itemCart.color
    );
}
