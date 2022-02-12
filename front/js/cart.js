
/*
Function qui recupere les données de l'api en fonction
de l'id et la couleur stocke dans mon localStorage
*/
function getProducts () {

    fetch(`http://localhost:3000/api/products`)

    .then(reponse => reponse.json())

    .then((products) => {

        const tab = JSON.parse(localStorage.getItem('cart')) || []
        tab.forEach(product => {
            let match = Object.values(products).find(element => element._id === product.id)
            getCard(match, product)
        })

        initQuantityListener(products)
        countQuantityProducts(tab)
        getTotalProducts(products)
        deleteCards(products)
        
    })
    
    .catch(error => {
        [];
    });
}
getProducts()   

/*
Function qui permet a l'evenement change sur les inputs 
de modifier la quantite des produits et des prix en fonction de la nouvelle quantite
et dans le LS aussi 
*/

function initQuantityListener (products) {

    const inputQuantity = document.querySelectorAll('.itemQuantity')

    inputQuantity.forEach(input => {
        input.addEventListener('change', (e) => {
            const item = e.target.closest(".cart__item")

            let cartProduct = {
                id : item.dataset.id,
                color : item.dataset.color,
                quantity : +e.target.value 
            }
            const tab = JSON.parse(localStorage.getItem('cart')) || []
            const index = tab.findIndex(element => element.id === cartProduct.id && element.color === cartProduct.color)
            if(index !== -1) {
                tab[index].quantity = cartProduct.quantity;
                
                if(tab[index].quantity < 1) {
                    item.remove();
                    tab.splice(index, 1);
                } 
            } 
            
            localStorage.setItem('cart', JSON.stringify(tab));
            countQuantityProducts (tab);
            getTotalProducts(products)

            
        })

    })
}

// Function de calcul de la quantite total sur la page panier

function countQuantityProducts (tab) {
    const totalQuantity = document.getElementById('totalQuantity');

    const reducer = (accumulator, currentValue) => accumulator + currentValue.quantity
    totalQuantity.textContent = tab.reduce(reducer, 0)
}

// Function de calcul du prix total par rapport a la quantite total et du prix des produits

function getTotalProducts(products) {
        const totalPrice = document.getElementById('totalPrice');

        const tab = JSON.parse(localStorage.getItem('cart'));
        let total = 0;
        tab.forEach(product => {
                let match = Object.values(products).find(element => element._id === product.id);
                total += match.price * product.quantity;
        })
            totalPrice.textContent = total;
}

// Function sur l'evenement pour supprimer les produits du panier y compris dans le LS

function deleteCards (products) {

    const deleteItem = document.querySelectorAll('.deleteItem')
    deleteItem.forEach(button => {
        button.addEventListener("click", (e) => {
            const item = e.target.closest(".cart__item");
            button.closest('.cart__item').remove();
            
            let cartProduct = {
                id : item.dataset.id,
                color :item.dataset.color
            }
            const tab = JSON.parse(localStorage.getItem('cart')) || [];
            const index = tab.findIndex(element => element.id === cartProduct.id && element.color === cartProduct.color);
            if(index !== -1) {
                tab.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(tab))
                countQuantityProducts (tab);
                getTotalProducts(products)
            }
        })
    })
}

// Function qui permet de recuperer les produits stockes dans le LS et les afficher  

function getCard(match, tab) {
    const cardItems = document.getElementById('cart__items');
    
    let productArticle = document.createElement("article");
    cardItems.appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', tab.id);
    productArticle.setAttribute('data-color', tab.color)

    let productDivImg = document.createElement('div');
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = match.imageUrl;
    productImg.alt = match.altTxt

    let productDivContent = document.createElement("div")
    productArticle.appendChild(productDivContent);
    productDivContent.className = "cart__item__content";

    let productDivDescription = document.createElement("div");
    productDivContent.appendChild(productDivDescription);
    productDivDescription.className = "cart__item__content__description";

    let productName = document.createElement('h2');
    productDivDescription.appendChild(productName);
    productName.textContent = match.name

    let productColor = document.createElement("p");
    productDivDescription.appendChild(productColor);
    productColor.textContent = tab.color;

    let productPrice = document.createElement("p");
    productDivDescription.appendChild(productPrice);
    productPrice.textContent = match.price + "€";

    let productDivSettings = document.createElement("div");
    productDivContent.appendChild(productDivSettings);
    productDivSettings.className = "cart__item__content__settings";

    let productDivQuantity = document.createElement("div");
    productDivSettings.appendChild(productDivQuantity);
    productDivQuantity.className = "cart__item__content__settings__quantity";

    let productQuantity = document.createElement("p");
    productDivQuantity.appendChild(productQuantity);
    productQuantity.textContent = "Qté : "

    let productItemQuantity = document.createElement("input");
    productDivQuantity.appendChild(productItemQuantity);
    productItemQuantity.value = tab.quantity;
    productItemQuantity.className = "itemQuantity";
    productItemQuantity.setAttribute("type", "number");
    productItemQuantity.setAttribute("name", "itemQuantity");
    productItemQuantity.setAttribute("min", "1");
    productItemQuantity.setAttribute("max", "100");

    let productDivDelete = document.createElement("div");
    productDivSettings.appendChild(productDivDelete);
    productDivDelete.className = "cart__item__content__settings__delete";

    let productDelete = document.createElement("p")
    productDivDelete.appendChild(productDelete);
    productDelete.className = "deleteItem";
    productDelete.textContent = "Supprimer"
}


// partie contact 

// Function du formulaire, qui permet de recuperer les données du client pour son bon de commande

function contact () {

const inputFirstName = document.querySelector('.cart__order__form__question:nth-child(1) input');
const inputLastName = document.querySelector('.cart__order__form__question:nth-child(2) input');
const inputAdress= document.querySelector('.cart__order__form__question:nth-child(3) input');
const inputCity = document.querySelector('.cart__order__form__question:nth-child(4) input');
const inputMail = document.querySelector('.cart__order__form__question:nth-child(5) input');

let firstName, lastName, address, city, email;

const nameRegex = /^[a-zA-Z\-]+$/;


inputFirstName.addEventListener('input', (e) => {

    if(!e.target.value.match(nameRegex)) {
        document.getElementById("firstNameErrorMsg").textContent = "Votre Prénom ne doit pas contenir de chiffre ou de caractère spéciaux";
        firstName = null
    } else {
        document.getElementById("firstNameErrorMsg").textContent = "";
        firstName = e.target.value
    }
})

inputLastName.addEventListener('input', (e) => {

    if(!e.target.value.match(nameRegex)) {
        document.getElementById("lastNameErrorMsg").textContent = "Votre Nom ne doit pas contenir de chiffre ou de caractère spéciaux";
        lastName = null
    } else {
        document.getElementById("lastNameErrorMsg").textContent = "";
        lastName = e.target.value
    }
})

inputAdress.addEventListener('input', (e) => {

    if(!e.target.value.match(/^[a-zA-Z0-9\s,'-]*$/)) {
        document.getElementById("addressErrorMsg").textContent = "Votre adresse semble incorrect";
        address = null
    } else {
        document.getElementById("addressErrorMsg").textContent = "" ;
        address = e.target.value
    }
})

inputCity.addEventListener('input', (e) => {

    if(!e.target.value.match(nameRegex)) {
        document.getElementById("cityErrorMsg").textContent = "Votre Ville ne peut pas contenir de caractère spéciaux ou de chiffres";
        city = null
    } else {
        document.getElementById("cityErrorMsg").textContent = "";
        city = e.target.value
    }
})

inputMail.addEventListener('input', (e) => {

    if(!e.target.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        document.getElementById("emailErrorMsg").textContent = "Votre Email est incorrect";
        email = null
    } else {
        document.getElementById("emailErrorMsg").textContent = "";
        email = e.target.value
    }
})
}

contact ()

const form = document.querySelector('.cart__order__form');

// Function d'envoie du form si les données en etait remplie et d'afficher le bon de commande sur une nouvelle page

function submitForm () {

    form.addEventListener('submit', () => {
        contact ()
        if(firstName && lastName && address && city && email) {
            const pushToBack = {
                contact : {
                    firstName : firstName,
                    lastName : lastName,
                    address : address,
                    city : city,
                    email : email
                }
            }
            let commandeOfCart = []
            
            const tab = JSON.parse(localStorage.getItem('cart')) || []
            if(tab.length === 0) return false; 
            
            tab.forEach(product => {          
                commandeOfCart.push(product.id)
                console.log(commandeOfCart);
            })
            localStorage.setItem('cart', JSON.stringify(tab));
            pushToBack.products = commandeOfCart;
            console.log(pushToBack);
            
            fetch("http://localhost:3000/api/products/order", {
                method : "POST",
                body : JSON.stringify(pushToBack),
                headers : {
                    "Content-Type": "application/json" 
                },
            })
            .then(response => response.json())
            .then(data => {
                localStorage.clear('cart');
                window.location.href = 'confirmation.html?orderId='+data.orderId;
            })
        }
    })
}
submitForm()