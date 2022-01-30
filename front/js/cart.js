// Une fonction qui va convertir le panier en html for chercher 


// une fonction qui affiche le panier et elle appelle les fonctions de calcul


// une fonction qui va calculer le prix total et une autre la quantité


// let params = new URL(document.location).searchParams;
// let id = params.get('id') 



function getCard() {
    
    const tab = JSON.parse(localStorage.getItem('cart')) || []

    console.log(tab);

    localStorage.setItem('cart', JSON.stringify(tab))

    



}
getCard()
