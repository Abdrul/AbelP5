// Une fonction qui va convertir le panier en html for chercher 


// une fonction qui affiche le panier et elle appelle les fonctions de calcul


// une fonction qui va calculer le prix total et une autre la quantité


// let params = new URL(document.location).searchParams;
// let id = params.get('id') 

function getCard() {
    
    const tab = JSON.parse(localStorage.getItem('cart')) || []
    console.log(tab);
    const index = tab.findIndex(element => element.idProduct === cart.idProduct && element.color === cart.color)
    if(index === -1) {
        tab.push(cart)
        alert("produit ajouté")
    } else {
        // tab[index].quantity = tab[index].quantity + cart.quantity;
        tab[index].quantity += cart.quantity
        alert("quantité augmentée")
    }
    
    console.log(index);

    localStorage.setItem('cart', JSON.stringify(tab))


}
getCard()