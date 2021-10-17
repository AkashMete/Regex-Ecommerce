const updateCartTotal = () => {
    total = 0;
    const totalPrice = document.getElementById("total_price");
    const cartProductsTr = document.getElementsByClassName('cart_products_tr');
    Array.from(cartProductsTr).forEach(cartProductTr => {
        const subTotal = cartProductTr.getElementsByTagName('td')[2].innerHTML.replace('₹', '');
        total += parseFloat(subTotal);
    });
    totalPrice.innerHTML = total;
}

const updateQuantity = (event, id, price) => {
    const quantity = event.target.value;
    const subTotal = document.getElementById(id);
    subTotal.innerHTML = "₹ " + quantity * price;
    updateCartTotal();
}

const displayCartProducts = async () => {
    const cart = sessionStorage.getItem('cart');
    const response = await fetch(`/cart/${cart}/`);
    const products = (await response.json()).cart_products;

    if (cart !== null) {
        const cartProducts = document.getElementById('cart_products');
        const html = products.map(product =>
            `                
                <tr class="cart_products_tr">
                    <td>
                        <div class="cart-info">
                            <img src="${product.image_url}">
                            <div>
                                <p>${product.name}</p>
                                <small>Price: ₹ ${product.price}</small>
                                <br>
                                <a href="">Remove</a>
                            </div>
                        </div>
                    </td>
                    <td><input onchange="updateQuantity(event, '${product._id}', '${product.price}');" type="number" value="1" min="1" max="10"></td>
                    <td id="${product._id}">₹ ${product.price}</td>
                </tr>
            `
        ).join('')

        cartProducts.innerHTML = `
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>

                                    ${html}
                                 `
    }
    updateCartTotal();
}

displayCartProducts();