let params = new URL(document.location).searchParams;
let id = params.get('id') 



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


const renderProductToHtml = (product) => {
    const itemImg = document.querySelector('.item__img');
    const title = document.getElementById('title');
    const price = document.getElementById('price');
    const description = document.getElementById('description');
    const select = document.getElementById('colors');

    title.innerText = product.name;

    price.innerText = formatter.format(product.price);


    description.innerText = product.description;

    itemImg.innerHTML =  `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    
    product.colors.forEach(color => {
        select.innerHTML +=`<option value="${color}">${color}</option>`  
    })
    // select.innerHTML += product.colors.map(color => `<option value="${color}">${color}</option>`).join();

}


const formatter = new Intl.NumberFormat('fr-FR', {
    currency: 'EUR',
    minimumFractionDigits : 2

})

async function displayProduct () {

    const products = await getProduct();

}
displayProduct()



function addToCart () {

    const button = document.getElementById('addToCart');
    
    button.addEventListener('click', () => {
        
        const quantity = document.getElementById('quantity');
        const select = document.getElementById('colors');

        // let objStock = JSON.stringify(tab);
        // localStorage.setItem("panier", objStock);
        // console.log(select.value);
        // console.log(quantity.value);
        // tab.push(select.value, quantity.value, id)
        // console.log(tab);
        // saveBasket(tab)
        let cart = {
            color : select.value,
            quantity : parseInt(quantity.value),
            id : id
        }
        const tab = JSON.parse(localStorage.getItem('cart')) || []
        console.log(tab);
        const index = tab.findIndex(element => element.id === cart.id && element.color === cart.color)
        if(quantity.value > 0 && quantity.value <100 && select.value !== "") { 
            if(index === -1) {
                tab.push(cart)
            } else {
                // tab[index].quantity = tab[index].quantity + cart.quantity;
                tab[index].quantity += cart.quantity
            }

        } else {
            console.log(false);
        }
        
        console.log(index);

        
        
        localStorage.setItem('cart', JSON.stringify(tab))
    
    
    })
}

addToCart()

// Si quantité > 0
// Si quantité <=100
// Si couleur !== ""
