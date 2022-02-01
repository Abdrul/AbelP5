// Une fonction qui va convertir le panier en html for chercher 


// une fonction qui affiche le panier et elle appelle les fonctions de calcul


// une fonction qui va calculer le prix total et une autre la quantité



const cardItems = document.getElementById('cart__items');
const totalQuantity = document.getElementById('totalQuantity');
const totalPrice = document.getElementById('totalPrice');



function getProducts () {

    fetch(`http://localhost:3000/api/products`)

    .then(reponse => reponse.json())

    .then((products) => {

        const tab = JSON.parse(localStorage.getItem('cart'))
        tab.forEach(product => {
            let match = Object.values(products).find(element => element._id === product.id)
            // console.log(match)
            getCard(match, product)
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
        `<article class="cart__item" data-id="${tab.id}" data-color="${tab.color}">
        <div class="cart__item__img">
            <img src="${match.imageUrl}" alt="${match.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${match.name}</h2>
                <p>${tab.color}</p>
                <p>${match.price} €</p>
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

    const cartItem = document.querySelector('.cart__item')
    console.log(cartItem);
    const deleteItem = document.querySelectorAll('.deleteItem')
    console.log(deleteItem);
    
    // deleteItem.addEventListener("click", () => {
    //     console.log("salut");
    // })




    deleteItem.forEach(button => {
        button.addEventListener("click", () => {
            button.closest('.cart__item').remove()

            // console.log("salut");
            // console.log(cartItem.dataset.color);
        
            let cart = {
                color : cartItem.dataset.color,
                id : cartItem.dataset.id
            }

            const tab = JSON.parse(localStorage.getItem('cart')) || []
            console.log(tab);
            const index = tab.findIndex(element => element.id === cart.id && element.color === cart.color)
            if(index !== -1) {
                tab.splice(index, 1)
                
            }
    
        localStorage.setItem('cart', JSON.stringify(tab))

        })
    })


}

