const items = document.getElementById('items')

// instance de classe

// let voiture = class {
//     constructor(moteur) {
//         this.moteur = moteur
//     }
// }

// let twingo = new voiture('ferrari')


function displayProducts() {

    fetch(`http://localhost:3000/api/products`)

    .then((reponse) => {
        return reponse.json()
    })

    .then((products) => {
        // console.table(data);
        
        
        for(let i = 0; i < products.length; i++) {
            

            // J'ai pris les elements que je veux viser dans mon DOM (HTM INTO DOM) avec un .innerHTML


            items.innerHTML +=
            `<a href="./product.html?id=${products[i]._id}">
                <article>
                    <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
                    <h3 class="productName">${products[i].name}</h3>
                    <p class="productDescription">${products[i].description}</p>
                </article>
            </a>`

                // console.log(data[i]);
            }
    
        }

    )

}


displayProducts()