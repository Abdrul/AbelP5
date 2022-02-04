// Une fonction qui va convertir le panier en html for chercher 


// une fonction qui affiche le panier et elle appelle les fonctions de calcul


// une fonction qui va calculer le prix total et une autre la quantité

// supprimer du LS quand la quantite est a 0




const cardItems = document.getElementById('cart__items');
const totalPrice = document.getElementById('totalPrice');
const totalQuantity = document.getElementById('totalQuantity');

// function getProducts () {

//     fetch(`http://localhost:3000/api/products`)

//     .then(reponse => reponse.json())

//     .then((products) => {

//         const tab = JSON.parse(localStorage.getItem('cart'))
//         tab.forEach(product => {
//             let match = Object.values(products).find(element => element._id === product.id)
//             getCard(match, product)
//             totalCost(tab,match)
//             initQuantityListener()
//         })
//     })
    
//     .catch(error => {
//         [];
//     });
// }
// getProducts()   

function getProduct (id) {

    return fetch(`http://localhost:3000/api/products/${id}`)

    .then((reponse) => {
        return reponse.json()
    })

    .then((product) => {
        return product;
    })

    .catch(error => {
        return [];
    });
}


async function displayProducts ()  {


    const tab = JSON.parse(localStorage.getItem('cart'))
    for(const product of tab) {
        // console.log(product);
        let match = await getProduct(product.id) 
        getCard(match, product)
        costProduct(match, product)
    }
    initQuantityListener ()
    deleteCards()
    countQuantityProducts (tab)
} 

displayProducts()



function initQuantityListener () {

    const inputQuantity = document.querySelectorAll('.itemQuantity')
    // console.log(inputQuantity);
    // console.log(Array.from(inputQuantity));
    inputQuantity.forEach(input => {
        input.addEventListener('change', (e) => {


            // const inputArray = Array.from(inputQuantity)
            // const total = inputArray.reduce((total, current) => {
            //     return total += parseInt(current.value)
            // }, 0)
            // totalQuantity = total


            let cartProduct = {
                id : e.target.closest(".cart__item").dataset.id,
                color : e.target.closest(".cart__item").dataset.color,
                quantity : parseInt(e.target.closest(".itemQuantity").value)
            }
            // console.log(cartProduct);
            const tab = JSON.parse(localStorage.getItem('cart')) || []
            const index = tab.findIndex(element => element.id === cartProduct.id && element.color === cartProduct.color)
            if(index !== -1) {
                tab[index].quantity = cartProduct.quantity
                localStorage.setItem('cart', JSON.stringify(tab))
                countQuantityProducts (tab)

                if(tab[index].quantity < 1) {

                    tab.splice(index, 1)
                    localStorage.setItem('cart', JSON.stringify(tab))
                
                } 

            } 

            
        })

    })
}

function countQuantityProducts (tab) {


    const reducer = (accumulator, currentValue) => accumulator + currentValue.quantity;
    
    totalQuantity.innerText = tab.reduce(reducer, 0);
    

}

function costProduct (match, product) {

    console.log();

    totalPrice.innerText = match.price 

}


function deleteCards () {

    const deleteItem = document.querySelectorAll('.deleteItem')
    // console.log(deleteItem);
    deleteItem.forEach(button => {
        button.addEventListener("click", (e) => {
            button.closest('.cart__item').remove()
            // console.log(e.target.closest(".cart__item").dataset.id);

            let cartProduct = {
                id : e.target.closest(".cart__item").dataset.id,
                color : e.target.closest(".cart__item").dataset.color

            }
            // console.log(cartProduct);

            const tab = JSON.parse(localStorage.getItem('cart')) || []
            console.log(tab);
            const index = tab.findIndex(element => element.id === cartProduct.id && element.color === cartProduct.color)
            if(index !== -1) {
                tab.splice(index, 1)
                localStorage.setItem('cart', JSON.stringify(tab))
            }
        })
    })
}


function getCard(match, tab) {
    
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
}




// const reducer = (accumulator, currentValue) => accumulator + currentValue;
// const priceTotale = tabPrice.reduce(reducer, 0)
// console.log(priceTotale);