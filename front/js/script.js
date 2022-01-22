const items = document.getElementById('items')


// Part of Index 

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

function renderProductsToHTML (products) {


    for(let i = 0; i < products.length; i++) {
            

        // J'ai pris les elements que je veux viser dans mon DOM (HTML INTO DOM) avec un .innerHTML


        items.innerHTML +=
        `<a href="./product.html?id=${products[i]._id}">
            <article>
                <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
                <h3 class="productName">${products[i].name}</h3>
                <p class="productDescription">${products[i].description}</p>
            </article>
        </a>`
        // const newDiv = document.createElement("div");
        // newDiv.innerHTML = 
        // `<a href="./product.html?id=${products[i]._id}">
        //     <article>
        //             <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
        //             <h3 class="productName">${products[i].name}</h3>
        //             <p class="productDescription">${products[i].description}</p>
        //     </article>
        // </a>`
        // items.appendChild(newDiv);

            // console.log(data[i]);
    }

}

async function displayProducts () {

    const products = await getProducts();
    if(products.length > 0) {
        renderProductsToHTML(products);
    } else {
        items.innerHTML = "salut";
    }

}


displayProducts()


// document.createElement('tr)
// const.innerHtml = <td>...</td>
// const.appendChild()
