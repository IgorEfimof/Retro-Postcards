function addToCart(title, price, frontImage, backImage) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Проверяем, есть ли уже эта открытка в корзине
    let existingItem = cart.find(item => item.title === title);
    
    if (existingItem) {
        existingItem.quantity += 1; // Увеличиваем количество
    } else {
        cart.push({
            title: title,
            price: parseFloat(price), // Преобразуем в число
            frontImage: frontImage,
            backImage: backImage,
            quantity: 1 // Начальное количество 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
}

// Функция обновления счетчика корзины на главной странице
function updateCartCounter() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-counter").innerText = totalCount;
}

// Вызываем обновление счетчика при загрузке страницы
document.addEventListener("DOMContentLoaded", updateCartCounter);
