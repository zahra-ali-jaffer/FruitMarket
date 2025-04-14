const fruits = [
  { name: "Apple", price: 1.2, image: "apple.png" },
  { name: "Banana", price: 0.5, image: "banana.png" },
  { name: "Orange", price: 0.8, image: "orange.png" },
  { name: "Pineapple", price: 2.5, image: "pineapple.png" },
  { name: "Grapes", price: 1.8, image: "grapes.png" },
  { name: "Mango", price: 1.5, image: "mango.png" },
  { name: "Strawberry", price: 2.0, image: "strawberry.png" },
  { name: "Blueberry", price: 2.2, image: "blueberry.png" },
  { name: "Watermelon", price: 3.0, image: "watermelon.png" },
  { name: "Papaya", price: 2.8, image: "papaya.png" }
];

const sellers = {
  seller1: "pass1",
  seller2: "pass2",
  seller3: "pass3"
};

let basket = [];
let totalPrice = 0;

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const errorP = document.getElementById("loginError");

  if (sellers[user] === pass) {
    document.getElementById("loginDiv").classList.add("hidden");
    document.getElementById("marketDiv").classList.remove("hidden");
    populateFruitTable(fruits);
  } else {
    errorP.textContent = "Invalid login credentials.";
  }
}

function populateFruitTable(fruitArray) {
  const tbody = document.getElementById("fruitTable");
  tbody.innerHTML = "";

  fruitArray.forEach((fruit, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${fruit.image}" alt="${fruit.name}" class="fruit-img" /></td>
      <td>${fruit.name}</td>
      <td>£${fruit.price.toFixed(2)}</td>
      <td><input type="number" id="qty-${index}" min="1" value="1" /></td>
      <td><button class="btn" type="button" onclick="addToBasket(${index})">Add</button></td>
    `;
    tbody.appendChild(row);
  });
}

function searchFruit() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = fruits.filter(fruit => fruit.name.toLowerCase().includes(query));
  populateFruitTable(filtered);
}

function addToBasket(index) {
  const qtyInput = document.getElementById(`qty-${index}`);
  const qty = parseInt(qtyInput.value);
  if (isNaN(qty) || qty <= 0) return;

  const fruit = fruits[index];
  const existing = basket.find(item => item.name === fruit.name);
  if (existing) {
    existing.qty += qty;
  } else {
    basket.push({ ...fruit, qty });
  }

  alert(`${qty} x ${fruit.name} added to basket`);
}

function submitOrder() {
  const orderList = document.getElementById("orderList");
  const totalPriceSpan = document.getElementById("totalPrice");
  const orderSummary = document.getElementById("orderSummary");

  orderList.innerHTML = "";
  totalPrice = 0;

  if (basket.length === 0) {
    alert("Your basket is empty.");
    return;
  }

  basket.forEach(item => {
    const itemTotal = item.qty * item.price;
    totalPrice += itemTotal;

    const li = document.createElement("li");
    li.textContent = `${item.qty} x ${item.name} = £${itemTotal.toFixed(2)}`;
    orderList.appendChild(li);
  });

  totalPriceSpan.textContent = totalPrice.toFixed(2);
  orderSummary.classList.remove("hidden");
}

function confirmDelivery() {
  const name = document.getElementById("customerName").value.trim();
  const address = document.getElementById("deliveryAddress").value.trim();
  const deliveryOption = document.getElementById("deliveryOption").value;
  const confirmationPage = document.getElementById("confirmationPage");

  if (!name || !address) {
    alert("Please fill in your name and address.");
    return;
  }

  let deliveryCharge = 0;
  if (deliveryOption === "express") deliveryCharge = 2.0;

  const finalTotal = totalPrice + deliveryCharge;

  document.getElementById("marketDiv").classList.add("hidden");
  confirmationPage.classList.remove("hidden");

  document.getElementById("confirmationText").innerHTML = `
    Thank you <strong>${name}</strong>!<br/>
    Your order will be delivered to:<br/>
    <em>${address}</em><br/>
    Delivery Type: <strong>${deliveryOption.toUpperCase()}</strong><br/>
    <br/>
    <strong>Total Payment: £${finalTotal.toFixed(2)}</strong>
  `;
}

// Handle form submit
document.addEventListener("DOMContentLoaded", () => {
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();
      submitOrder();
    });
  }
});
