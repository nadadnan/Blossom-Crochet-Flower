//----------------------------- Product Page -------------------------------//
// open cart modal
const cart = document.querySelector('#cart');
const cartModalOverlay = document.querySelector('.cart-modal-overlay');
let isCartOpen = localStorage.getItem('cartOpen') || 'false';

cart.addEventListener('click', () => {
  if (cartModalOverlay.style.transform === 'translateX(-200%)'){
    cartModalOverlay.style.transform = 'translateX(0)';
  } else {
    cartModalOverlay.style.transform = 'translateX(-200%)';
  } 
  if (isCartOpen === 'true') {
    cartModalOverlay.style.transform = 'translateX(0)';
  }
}); // end of open cart modal

// close cart modal
const closeBtn = document.querySelector ('#close-btn');

closeBtn.addEventListener('click', () => {
  cartModalOverlay.style.transform = 'translateX(-200%)';
});

cartModalOverlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-modal-overlay')){
    cartModalOverlay.style.transform = 'translateX(-200%)'
    localStorage.setItem('cartOpen', 'false');
  }
}) // end of close cart modal

// add products to cart
const addToCart = document.getElementsByClassName('add-to-cart');
const productRow = document.getElementsByClassName('product-row');

for (var i = 0; i < addToCart.length; i++) {
  button = addToCart[i];
  button.addEventListener('click', addToCartClicked)
}

function addToCartClicked (event) {
  button = event.target;
  var cartItem = button.parentElement;
  var price = cartItem.getElementsByClassName('product-price')[0].innerText;
  var imageSrc = cartItem.getElementsByClassName('product-image')[0].src;
  var id = cartItem.getElementsByClassName('product-id')[0].innerText;
  
  addItemToCart (price, imageSrc,id);
  updateCartPrice()
}
 
function addItemToCart (price, imageSrc,id ) {
  var productRow = document.createElement('div');
  productRow.classList.add('product-row');
  var productRows = document.getElementsByClassName('product-rows')[0];
  var cartImage = document.getElementsByClassName('cart-image');
  
  for (var i = 0; i < cartImage.length; i++){
    if (cartImage[i].src == imageSrc){
      alert ('This item has already been added to the cart')
      return;
    }
  }
  
  var cartRowItems = `
  <div class="product-row">
        <img class="cart-image" src="${imageSrc}" alt="">
        <span class ="cart-id">${id}</span>
        <span class ="cart-price">${price}</span>
        <input class="product-quantity" type="number" value="1">
        <button class="remove-btn">Remove</button>
        </div>       
      `
      productRow.innerHTML = cartRowItems;
      productRows.append(productRow);
      productRow
        .getElementsByClassName('remove-btn')[0]
        .addEventListener('click', removeItem);
      productRow
        .getElementsByClassName('product-quantity')[0]
        .addEventListener('change', changeQuantity);
      updateCartPrice(); 
} // end of add products to cart

// Remove products from cart
const removeBtn = document.getElementsByClassName('remove-btn');
for (var i = 0; i < removeBtn.length; i++) {
  button = removeBtn[i]
  button.addEventListener('click', removeItem)
}

function removeItem (event) {
  btnClicked = event.target
  btnClicked.parentElement.parentElement.remove()
  updateCartPrice()
}

// update quantity input
var quantityInput = document.getElementsByClassName('product-quantity')[0];

for (var i = 0; i < quantityInput; i++){
  input = quantityInput[i]
  input.addEventListener('change', changeQuantity)
}

function changeQuantity(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0){
    input.value = 1
  }
  updateCartPrice()
} // end of update quantity input

// update total price
function updateCartPrice() {
  var total = 0;
  var productRows = document.getElementsByClassName('product-row');

  for (var i = 0; i < productRow.length; i += 2) {
    var cartRow = productRow[i]  
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('product-quantity')[0]
    var price = parseFloat(priceElement.innerText.replace('RM', ''))
    var quantity = quantityElement.value
    total = total + (price * quantity )   
  }
  
  document.getElementsByClassName('total-price')[0].innerText =  'RM' + total
  document.getElementsByClassName('cart-quantity')[0].textContent = i /= 2
} // end of update total price

// purchase items
const purchaseBtn = document.querySelector('.purchase-btn');
purchaseBtn.addEventListener('click', purchaseBtnClicked);
const closeCartModal = document.querySelector('.cart-modal');

purchaseBtn.addEventListener('click', purchaseBtnClicked)

function purchaseBtnClicked () {
  // Check if the cart is empty before allowing checkout
  var totalItems = document.getElementsByClassName('product-row').length;
  if (totalItems === 0) {
    alert('Your cart is empty. Please add items to the cart before checking out.');
    return;
  }

  alert ('Lets move to checkout');
  cartModalOverlay.style.transform= 'translateX(-100%)'
  var cartItems = document.getElementsByClassName('product-rows')[0]
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
   
 }
  updateCartPrice()
  window.location.href = 'Cart.html';
} // end of purchase items
//----------------------------- Product Page End -------------------------------//

//------------------------- Contact Us page -------------------------//
function sendMessage() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var contactNumber = document.getElementById('contactNumber').value;
  var message = document.getElementById('message').value;

  if (name.trim() !== '' && email.trim() !== '' && contactNumber.trim() !== '' && message.trim() !== '') {
      // Form is filled, display "sent" message
      alert('Message Sent');
      return true; // Allow form submission
  } else {
      // Form is not filled, display "please fill in the form" message
      alert('Please fill in the form');
      return false; // Prevent form submission
  }
}
//------------------------- Contact Us page End -------------------------//


//----------------------------- Cart page -------------------------------//
// Function to handle changes in the "Shipping address same as billing" checkbox
function handleShippingAddressCheckboxChange() {
  var sameAddressCheckbox = document.getElementById('sameAddressCheckbox');
  var shippingAddressForm = document.querySelector('.shipping-address-form');

  // Check if the checkbox is checked
  if (sameAddressCheckbox.checked) {
    // If checked, hide the shipping address form
    shippingAddressForm.style.display = 'none';
  } else {
    // If not checked, show the shipping address form
    shippingAddressForm.style.display = 'block';
  }
}

// Attach the function to the checkbox change event
document
  .getElementById('sameAddressCheckbox')
  .addEventListener('change', handleShippingAddressCheckboxChange);

// Function to handle changes in the selected payment method
function handlePaymentMethodChange() {
  var paymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
  );
  var cardDetailsSection = document.querySelector('.card-details');

  if (paymentMethod) {
    if (paymentMethod.value === 'creditCard') {
      cardDetailsSection.style.display = 'block';
    } else {
      cardDetailsSection.style.display = 'none';
    }
  } else {
    cardDetailsSection.style.display = 'none';
  }
}

// Event listener for payment method change
document
  .querySelectorAll('input[name="paymentMethod"]')
  .forEach(function (radio) {
    radio.addEventListener('change', function () {
      handlePaymentMethodChange();
    });
  });

// Call the function on page load to ensure the initial state
document.addEventListener('DOMContentLoaded', function () {
  handleShippingAddressCheckboxChange();
  handlePaymentMethodChange();
});

// Initial cart display
updateCartDisplay();

// Function to handle the "Continue to checkout" button click
function handleCheckoutButtonClick() {
  // Validate billing address
  var billingAddress = document.getElementById('adr').value;
  if (!billingAddress.trim()) {
    alert('Please fill in the billing address.');
    return;
  }
  // Validate payment method
  var paymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
  );
  if (!paymentMethod) {
    alert('Please choose a payment method.');
    return;
  }
  // If credit card is chosen, validate credit card details
  if (paymentMethod.value === 'creditCard') {
    var cardName = document.getElementById('cname').value;
    var cardNumber = document.getElementById('ccnum').value;
    var expMonth = document.getElementById('expmonth').value;
    var expYear = document.getElementById('expyear').value;
    var cvv = document.getElementById('cvv').value;

    if (
      !cardName.trim() ||
      !cardNumber.trim() ||
      !expMonth.trim() ||
      !expYear.trim() ||
      !cvv.trim()
    ) {
      alert('Please fill in all credit card details.');
      return;
    }
  }

  // Check if the shipping address is different
  var sameAddressCheckbox = document.getElementById('sameAddressCheckbox');
  var shippingAddress = document.getElementById('sadr').value;

  if (!sameAddressCheckbox.checked && !shippingAddress.trim()) {
    alert('Please fill in the shipping address.');
    return;
  }
  // Display the success modal
  document.getElementById('successModal').style.display = 'block';
}

// Function to close the success modal
function closeSuccessModal() {
  document.getElementById('successModal').style.display = 'none';
}

// Function to redirect to the home page
function redirectToHomePage() {
  window.location.href = 'HomePage.html';
}

// Attach the function to the button click event
document.querySelector('.btn').addEventListener('click', handleCheckoutButtonClick);
//----------------------------- Cart page End -------------------------------//


//-------------------------------- Account page -----------------------------//
// In other file named app.js
//-------------------------------- Account page End -----------------------------//