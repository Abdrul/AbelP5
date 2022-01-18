fetch(`http://localhost:3000/api/products`)
.then((reponse) => {
    return reponse.json()
})
.then((data) => {
    console.log(data);
})