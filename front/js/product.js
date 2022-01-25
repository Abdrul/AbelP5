const itemImg = document.querySelector('.item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const select = document.getElementById('colors');



let params = new URL(document.location).searchParams;
let id = params.get('id') 
// console.log(id);



const getProduct = () => {

    return fetch(`http://localhost:3000/api/products/${id}`)

    .then((reponse) => {
        return reponse.json()
    })

    .then((product) => {
        // console.log(product.colors);
        renderProductToHtml(product)
        return product;
    })

    .catch(error => {
        return [];
    });


}



const renderProductToHtml = (product) => {

    title.innerText = product.name;
    price.innerText = (product.price/100).toFixed(2);
    description.innerText = product.description;
    itemImg.innerHTML =  `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    

    product.colors.forEach(element => {
        select.innerHTML +=`<option value="${element}">${element}</option>`
        
    })

    // select.innerHTML += product.colors.map(color => `<option value="${color}">${color}</option>`).join();

}



async function displayProduct () {

    const products = await getProduct();

}


displayProduct()



// const formatter = new Intl.NumberFormat('fr-FR', {
//     style: 'currency',
//     currency: 'EUR',
//     thousand: ','
// })



