const cards = [
    { title: "Открытка 1", imageUrl: "images/card1.jpg" },
    { title: "Открытка 2", imageUrl: "images/card2.jpg" },
    // Добавьте больше открыток по аналогии
];

const cardsContainer = document.getElementById('cards');

cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.innerHTML = `
        <img src="${card.imageUrl}" alt="${card.title}">
        <h2>${card.title}</h2>
    `;
    cardsContainer.appendChild(cardElement);
});
