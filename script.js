document.addEventListener('DOMContentLoaded', () => {
  const cart = [];
  const cartItemsContainer = document.querySelector('.cart-items');
  const modal = document.getElementById('order-modal');
  const confirmOrderBtn = document.getElementById('confirm-order');

  // Add to cart
  document.querySelectorAll('.addcart').forEach(button => {
    button.addEventListener('click', () => {
      const itemElement = button.parentElement;
      const itemName = itemElement.querySelector('p').textContent;
      const itemPrice = parseFloat(itemElement.querySelector('.price').textContent.replace('$', ''));
      const itemImg = itemElement.querySelector('img').src; // Get the image source

      const cartItem = cart.find(item => item.name === itemName);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1, img: itemImg });
      }
      updateCart();
    });
  });

  // Update cart display
  function updateCart() {
    cartItemsContainer.innerHTML = '';
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;

      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <div class="cart-item-details">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img"> <!-- Display the item image -->
          <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
        </div>
        <div class="cart-item-controls">
          <button class="increase-quantity">+</button>
          <button class="decrease-quantity">-</button>
          <button class="remove-item">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);

      // Remove item from cart
      itemElement.querySelector('.remove-item').addEventListener('click', () => {
        const index = cart.indexOf(item);
        cart.splice(index, 1);
        updateCart();
      });

      // Increase item quantity
      itemElement.querySelector('.increase-quantity').addEventListener('click', () => {
        item.quantity += 1;
        updateCart();
      });

      // Decrease item quantity
      itemElement.querySelector('.decrease-quantity').addEventListener('click', () => {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          const index = cart.indexOf(item);
          cart.splice(index, 1);
        }
        updateCart();
      });
    });

    // Display total items and price
    const totalsElement = document.createElement('div');
    totalsElement.classList.add('cart-totals');
    totalsElement.innerHTML = `
      <p class="pc"> Your Cart Items:${totalItems}</p>
      <p class="pc">Total Price: $${totalPrice.toFixed(2)}</p>
    `;
    cartItemsContainer.appendChild(totalsElement);
  }

  // Confirm order
  confirmOrderBtn.addEventListener('click', () => {
    if (cart.length > 0) {
      modal.style.display = 'block';
      confirmOrderBtn.textContent = "Confirm Order";
      cart.length = 0;
      updateCart();
    }
  });


  // Click outside modal to close
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
});