let products = []; // Массив для хранения товаров
let sellers = []; // Массив для хранения продавцов
let cartItems = []; // Массив для хранения выбранных товаров в корзине

// Загрузка товаров из файла data.json
async function loadProducts() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Сеть ответила с ошибкой');
        products = await response.json();
        renderProducts(); // Отображаем загруженные товары
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

// Добавление товара вручную
document.getElementById('add-product').addEventListener('click', function() {
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;

    if (productName && productPrice) {
        const product = { name: productName, price: parseFloat(productPrice) };
        products.push(product);
        renderProducts();
        clearProductInputs();
    } else {
        alert("Пожалуйста, заполните все поля.");
    }
});

// Очистка полей ввода
function clearProductInputs() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
}

// Отображение списка товаров
function renderProducts() {
    const productListElement = document.getElementById('products');
    productListElement.innerHTML = '';

    products.forEach((product) => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.price.toFixed(2)}₽ `;
        
        const addButton = document.createElement('button');
        addButton.textContent = 'Добавить в корзину';
        addButton.onclick = () => addToCart(product);
        li.appendChild(addButton);
        productListElement.appendChild(li);
    });
}

// Добавление товара в корзину
function addToCart(product) {
    cartItems.push(product);
    renderCart();
}

// Отображение корзины
function renderCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';

    cartItems.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price.toFixed(2)}₽`;
        cartItemsElement.appendChild(li);
    });
}

// Обработка изменения способа оплаты
document.getElementById('payment-method').addEventListener('change', function() {
    const selectedPaymentMethod = this.value;
    const cashChangeDiv = document.getElementById('cash-change');

    if (selectedPaymentMethod === 'cash') {
        cashChangeDiv.style.display = 'block'; // Показываем поле для ввода суммы наличными
    } else {
        cashChangeDiv.style.display = 'none'; // Скрываем поле для ввода суммы
        document.getElementById('cash-amount').value = ''; // Очищаем поле, если выбран не наличный расчет
    }
});

// Рассчитать итог и показать чек
document.getElementById('calculate').addEventListener('click', function() {
    const selectedSeller = document.getElementById('seller-selector').value;
    const selectedPaymentMethod = document.getElementById('payment-method').value;
    
    document.getElementById('selected-seller').textContent = selectedSeller ? selectedSeller : "Не выбран";
    document.getElementById('selected-payment-method').textContent = selectedPaymentMethod;

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total').textContent = `${total.toFixed(2)}₽`;

    const timestamp = new Date().toLocaleString();
    document.getElementById('timestamp').textContent = timestamp;

    // Отображаем чек
    const receiptItemsElement = document.getElementById('receipt-items');
    receiptItemsElement.innerHTML = '';
    cartItems.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price.toFixed(2)}₽`;
        receiptItemsElement.appendChild(li);
    });

    document.getElementById('receipt').style.display = 'block';
    
    // Обработка наличных
    if (selectedPaymentMethod === 'cash') {
        const cashAmount = document.getElementById('cash-amount').value;
        if (cashAmount) {
            const change = cashAmount - total;
            document.getElementById('change').textContent = `${change.toFixed(2)}₽`;
            document.getElementById('cash-change').style.display = 'block';
        } else {
            alert("Пожалуйста, введите сумму наличными.");
        }
    } else {
        document.getElementById('cash-change').style.display = 'none';
    }
});

// Инициализация продавцов
function initSellers() {
    sellers = ["Даниил", "Виталий"];
    const sellerSelector = document.getElementById('seller-selector');
    sellers.forEach(seller => {
        const option = document.createElement('option');
        option.value = seller;
        option.textContent = seller;
        sellerSelector.appendChild(option);
    });
}

// Запуск инициализации
initSellers();
loadProducts(); // Загружаем товары при инициализации
