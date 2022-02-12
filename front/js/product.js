let params = new URL(document.location).searchParams;
let id = params.get('id') 

// Function qui va me recuperer les données des objects de l'api en fonction de l'id 

const getProduct = () => {

    return fetch(`http://localhost:3000/api/products/${id}`)

    .then((reponse) => {
        return reponse.json()
    })

    .then((product) => {
        renderProductToHtml(product)
        return product;
    })

    .catch(error => {
        return [];
    });
}

// Function qui en bouclant les produits grace a l'api va m'afficher les produits de facon dynamique

function renderProductToHtml (product) {


    let productImg = document.createElement("img");
    document.querySelector('.item__img').appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    let productName = document.getElementById("title");
    productName.textContent = product.name;

    let productPrice = document.getElementById("price");
    productPrice.textContent = product.price;

    let productDescription = document.getElementById("description");
    productDescription.textContent = product.description;


    product.colors.forEach(color => {
        let productColor = document.createElement("option");
        document.querySelector('#colors').appendChild(productColor);
        productColor.value = color;
        productColor.textContent = color
    })
}

// function qui va faire apparaitre les produits 

async function displayProduct () {

    const products = await getProduct();

}
displayProduct()

/*
Function qui me permet de rajouter le produit sur la page dans le localStorage 
en fonction de son id et de sa couleur,
On y met (LS) l'id la quantite et la couleur
*/

function addToCart () {

    const button = document.getElementById('addToCart');
    
    button.addEventListener('click', () => {
        
        const quantity = document.getElementById('quantity');
        const select = document.getElementById('colors');

        let cart = {
            color : select.value,
            quantity : parseInt(quantity.value),
            id : id
        }

        const tab = JSON.parse(localStorage.getItem('cart')) || []
        const index = tab.findIndex(element => element.id === cart.id && element.color === cart.color)
        if(quantity.value > 0 && quantity.value <100 && select.value !== "") { 
            if(index === -1) {
                tab.push(cart)
            } else {
                tab[index].quantity += cart.quantity
            }
            localStorage.setItem('cart', JSON.stringify(tab))
        }
        
    })
}

addToCart()

