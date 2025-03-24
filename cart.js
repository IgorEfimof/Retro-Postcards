document.addEventListener("DOMContentLoaded", function () {
    updateCart();
});

// Функция добавления товара в корзину
function addToCart(title, price, frontImage, backImage) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ title, price, frontImage, backImage, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Функция обновления корзины
function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("total-price");
    let cartCountElement = document.getElementById("cart-count");

    cartContainer.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        totalItems += item.quantity;

        let itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <div>
                <img src="${item.frontImage}" width="100">
                <img src="${item.backImage}" width="100">
            </div>
            <p><b>${item.title}</b></p>
            <p>Цена: ${item.price} руб. (x${item.quantity}) = ${itemTotal} руб.</p>
            <button onclick="removeFromCart(${index})">Удалить</button>
        `;
        cartContainer.appendChild(itemElement);
    });

    totalPriceElement.innerText = `Общая сумма: ${total} руб.`;
    cartCountElement.innerText = totalItems;
}

// Функция удаления товара из корзины
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Функция очистки корзины
function clearCart() {
    localStorage.removeItem("cart");
    updateCart();
}

// Функция отправки заказа на почту
function sendOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Корзина пуста!");
        return;
    }

    let orderDetails = "🛍 <b>Заказ открыток:</b><br><br>";
    let total = 0;

    cart.forEach(item => {
        let itemPrice = parseFloat(item.price) || 0;
        let itemQuantity = parseInt(item.quantity) || 1;
        let itemTotal = itemPrice * itemQuantity;
        total += itemTotal;

        orderDetails += `📌 <b>${item.title}</b><br>`;
        orderDetails += `💰 Цена: ${itemPrice} руб. (x${itemQuantity}) = ${itemTotal} руб.<br>`;
        orderDetails += `🖼 Фото:<br>`;
        orderDetails += `<img src="${item.frontImage}" width="150"><img src="${item.backImage}" width="150"><br><br>`;
    });

    orderDetails += `<b>💰 Общая сумма: ${total.toFixed(2)} руб.</b><br>`;

    let mailtoLink = `mailto:efimof.ig@yandex.ru?subject=Заказ открыток&body=${encodeURIComponent(orderDetails)}`;
    window.location.href = mailtoLink;

    clearCart();
    alert("Заказ отправлен!");
}
