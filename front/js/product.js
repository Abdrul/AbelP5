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


function renderProductToHtml (product) {


    let productImg = document.createElement("img");
    document.querySelector('.item__img').appendChild(productImg);
    console.log(productImg);
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



async function displayProduct () {

    const products = await getProduct();

}
displayProduct()



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
        console.log(tab);
        const index = tab.findIndex(element => element.id === cart.id && element.color === cart.color)
        if(quantity.value > 0 && quantity.value <100 && select.value !== "") { 
            if(index === -1) {
                tab.push(cart)
            } else {
                tab[index].quantity += cart.quantity
            }

        }
        
        localStorage.setItem('cart', JSON.stringify(tab))
    })
}

addToCart()

