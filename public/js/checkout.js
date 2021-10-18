const checkout = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/v1/order/new/`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "itemPrice": 200,
            "shippingPrice": 100,
            "totalPrice": 336,
            "orderItems": [{
                "product": "6159218d413f233eee57d97e",
                "name": "product1",
                "price": 1200,
                "image": "sample Image",
                "quantity": 1
            }],
            "shippingInfo": {
                "address": "619 Los Angeles",
                "city": "LA",
                "state": "California",
                "country": "India",
                "pincode": 412308,
                "phoneNo": 123456789
            },
            "paymentInfo": {
                "name": "",
                "card_number": "",
                "month_exp": "",
                "year_exp": "",
                "cvv": ""
            }
        }),
    });
}