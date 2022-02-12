const items = document.getElementById('items')


// Part of Index 

// Function qui récupere les données dans l'api

function getProducts () {

    return fetch(`http://localhost:3000/api/products`)

    .then((reponse) => {
        return reponse.json()
    })

    .then((products) => {
        return products;
    })

    .catch(error => {
        return [];
    });

}

// Function qui en bouclant les produits grace a l'api va m'afficher les produits de facon dynamique

function renderProductsToHTML (products) {


    for(let i = 0; i < products.length; i++) {
            let item = products[i]

        
            let productLink = document.createElement("a");
            items.appendChild(productLink);
            productLink.href = `product.html?id=${item._id}`;

            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = item.imageUrl;
            productImg.alt = item.altTxt

            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.textContent = item.name

            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productDescription");
            productDescription.textContent = item.description
    }

}

// function qui va faire apparaitre les produits 

async function displayProducts () {

    const products = await getProducts();
    if(products.length > 0) {
        renderProductsToHTML(products);
    } else {
        items.innerHTML = "Erreur le server ne s'est pas lancé";
    }

}
displayProducts()

