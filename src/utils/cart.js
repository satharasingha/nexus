/* =========================================================
   CART UTILITIES
   ---------------------------------------------------------
   LocalStorage-backed cart management.
   Handles:
     - Reading the cart
     - Adding / removing product quantities
     - Calculating cart totals
   ========================================================= */

/* ---------------------------------------------------------
   STORAGE KEY
   Centralized so it's never mistyped elsewhere.
--------------------------------------------------------- */
const CART_KEY = "cart";

/* ---------------------------------------------------------
   EMPTY CART CONSTANT
   Returned whenever there's nothing stored.
--------------------------------------------------------- */
const EMPTY_CART = [];

/* =========================================================
   getCart()
   ---------------------------------------------------------
   Reads the cart from localStorage.
   - If nothing is stored → initializes with "[]" and returns []
   - If parsing fails → resets storage and returns [] (defensive)
   - Otherwise → returns the parsed cart array
========================================================= */
export function getCart() {
    const cartString = localStorage.getItem(CART_KEY);

    if (cartString == null) {
        localStorage.setItem(CART_KEY, "[]");
        return EMPTY_CART;
    }

    try {
        return JSON.parse(cartString);
    } catch {
        // Storage was corrupted — reset safely
        localStorage.setItem(CART_KEY, "[]");
        return EMPTY_CART;
    }
}

/* =========================================================
   addToCart(product, quantity)
   ---------------------------------------------------------
   Adds or removes a product from the cart.

   Behavior:
     - If product is NOT in cart and quantity > 0 → adds it
     - If product IS in cart → updates its quantity
     - If new quantity ≤ 0 → removes the item entirely

   Parameters:
     @param {Object} product  - Full product object
       - productId      {string}
       - name           {string}
       - images         {string[]}    (uses images[0])
       - labelledPrice  {number}
       - price          {number}

     @param {number} quantity - Positive to add, negative to remove
========================================================= */
export function addToCart(product, quantity) {
    const cart = getCart();

    /* Find existing product by productId (-1 if not found) */
    const existingProductIndex = cart.findIndex(
        (item) => item.product.productId == product.productId
    );

    if (existingProductIndex == -1) {
        /* ---------- Not in cart → add if quantity is positive ---------- */
        if (quantity > 0) {
            cart.push({
                product: {
                    productId: product.productId,
                    name: product.name,
                    image: product.images[0],
                    labelledPrice: product.labelledPrice,
                    price: product.price,
                },
                quantity: quantity,
            });
        }
    } else {
        /* ---------- Already in cart → adjust quantity ---------- */
        const newQty = cart[existingProductIndex].quantity + quantity;

        if (newQty > 0) {
            cart[existingProductIndex].quantity = newQty;
        } else {
            cart.splice(existingProductIndex, 1);
        }
    }

    /* Persist back to storage */
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* =========================================================
   getCartTotal(cart)
   ---------------------------------------------------------
   Computes the total price of all items in the cart.

   Formula:
     total = Σ (product.price × quantity)

   Parameters:
     @param {Array} cart - Array of { product, quantity }

   Returns:
     @returns {number} total
========================================================= */
export function getCartTotal(cart) {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].product.price * cart[i].quantity;
    }

    return total;
}