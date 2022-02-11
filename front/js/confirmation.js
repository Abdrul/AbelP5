let params = new URL(document.location).searchParams;
let orderId = params.get('orderId');

const orderProduct = document.getElementById('orderId');

orderProduct.innerText = orderId