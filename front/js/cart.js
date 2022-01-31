// Une fonction qui va convertir le panier en html for chercher 


// une fonction qui affiche le panier et elle appelle les fonctions de calcul


// une fonction qui va calculer le prix total et une autre la quantité


// let params = new URL(document.location).searchParams;
// let id = params.get('id') 
const cardItems = document.getElementById('cart__items')

function getProducts () {

    fetch(`http://localhost:3000/api/products`)

    .then(reponse => reponse.json())

    .then((products) => {
        // for (let i = 0; i < products.length; i++) {
        //     console.log(products[i]);
        // }

        // products.forEach(product => console.log(Object.values(product).find(element => element.idProduct === product._id)))
        // console.log();

        // getCard()
        const tab = JSON.parse(localStorage.getItem('cart'))
        tab.forEach(produit => {
            let match = Object.values(products).find(element => element._id === produit.id);
            console.log(match)
            getCard(match, produit)
        })
    })
    
    .catch(error => {
        [];
    });
    
}

getProducts()   


function getCard(match, tab) {
    
    
    // const tab = JSON.parse(localStorage.getItem('cart'))


    // localStorage.setItem('cart', JSON.stringify(tab))

    cardItems.innerHTML += 
        `<article class="cart__item" data-id="${match.id}" data-color="${tab.color}">
        <div class="cart__item__img">
            <img src="${match.imageUrl}" alt="${match.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${match.name}</h2>
                <p>${tab.color}</p>
                <p>${match.price}</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${tab.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
        </div>
        </div>
        </div>
    </article>`

}



