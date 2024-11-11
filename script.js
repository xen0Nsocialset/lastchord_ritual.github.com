let products = [];
let basket = [];

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts();
    });

function displayProducts() {
    const productList = document.getElementById('shop-product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        productList.innerHTML += `
            <div>
                <span>${product.name} - ${product.price}₽</span>
                <button onclick="addToBasket('${product.name}')">Добавить в корзину</button>
            </div>
        `;
    });
}

function addToBasket(productName) {
    const product = products.find(p => p.name === productName);
    basket.push(product);
    displayBasket();
}

function displayBasket() {
    const basketList = document.getElementById('basket');
    basketList.innerHTML = '';
    basket.forEach((item, index) => {
        basketList.innerHTML += `
            <div>
                <span>${item.name} - ${item.price}₽</span>
                <button onclick="removeFromBasket(${index})">Удалить</button>
            </div>
        `;
    });
}

function removeFromBasket(index) {
    basket.splice(index, 1);
    displayBasket();
}

function calculateTotal() {
    const total = basket.reduce((sum, item) => sum + item.price, 0);
    generateReceipt(total);
}

function generateReceipt(total) {
    const receipt = document.getElementById('receipt');
    receipt.classList.remove('hidden');
    receipt.innerHTML = `<h4>Чек за покупку</h4>
                         <p>Название: Последний аккордъ</p>
                         <p>ИНН: -----</p>
                         <p>ФИО владельца: -----</p>
                         <h5>Товары:</h5>
                         ${basket.map(item => `<div>${item.name} - ${item.price}₽</div>`).join('')}
                         <hr>
                         <p>Итого: ${total}₽</p>`;
}

// Функция для добавления товара
function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    if (name && !isNaN(price)) {
        products.push({ name, price });
        displayProducts();
        document.getElementById('product-name').value = '';
        document.getElementById('product-price').value = '';
        // Здесь нужно сохранять обновления в data.json
    }
}
