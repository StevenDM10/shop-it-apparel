/*********************************
 GLOBAL STATE
*********************************/
let loggedIn = localStorage.getItem("loggedIn") === "true";

/*********************************
 LANDING PAGE
*********************************/
function shopNow() {
  window.location.href = "signin.html";
}

/*********************************
 SIGN IN
*********************************/
function signIn(e) {
  e.preventDefault();

  const email = e.target.querySelector('input[type="email"]').value;
  const password = e.target.querySelector('input[type="password"]').value;

  if (email && password) {
    localStorage.setItem("loggedIn", "true");
    alert("Welcome to Shop It Apparel!");
    window.location.href = "home.html";
  } else {
    alert("Please fill in all fields");
  }
}

/*********************************
 PAGE PROTECTION
*********************************/
const protectedPages = [
  "home.html",
  "sale.html",
  "cart.html",
  "product.html",
  "checkout.html",
  "shipping.html"
];

if (
  protectedPages.some(p => window.location.pathname.includes(p)) &&
  !loggedIn
) {
  alert("Please sign in first.");
  window.location.href = "signin.html";
}

/*********************************
 NAVBAR + ICONS
*********************************/
document.addEventListener("DOMContentLoaded", () => {

  // Logo → Landing
  document.querySelectorAll(".logo img").forEach(logo => {
    logo.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  });

  // Navbar navigation
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const text = link.textContent.toLowerCase();

      if (text.includes("home")) window.location.href = "home.html";
      else if (text.includes("sale")) window.location.href = "sale.html";
      else if (text.includes("brand")) window.location.href = "brand.html";
      else if (text.includes("store")) window.location.href = "stores.html";
    });
  });

  // Cart icon
  document.querySelectorAll(".icon").forEach(icon => {
    if (icon.textContent.includes("👜")) {
      icon.addEventListener("click", () => {
        window.location.href = "cart.html";
      });
    }
  });

  // Search (simple demo function)
  document.querySelectorAll('input[placeholder="Search"]').forEach(input => {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        alert("Searching for: " + input.value);
      }
    });
  });
});

/*********************************
 HOME & SALE → PRODUCT PAGE
*********************************/
document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", () => {
    // Always redirect to product details page
    window.location.href = "product.html";
  });
});

/*********************************
 PRODUCT PAGE (ADD TO CART)
*********************************/
document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector(".add-cart-btn");
  if (!addBtn) return;

  let quantity = 1;
  const qtyDisplay = document.querySelector(".quantity span");

  document.querySelectorAll(".quantity button").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.textContent === "+" && quantity < 10) quantity++;
      if (btn.textContent === "-" && quantity > 1) quantity--;
      qtyDisplay.textContent = quantity;
    });
  });

  addBtn.addEventListener("click", () => {
    localStorage.setItem("cartQty", quantity);
    alert("Item added to cart!");
    window.location.href = "cart.html";
  });
});

/*********************************
 CART PAGE
*********************************/
document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.querySelector(".checkout-btn");
  if (!checkoutBtn) return;

  checkoutBtn.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });
});

/*********************************
 CHECKOUT INFORMATION PAGE
*********************************/
document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.querySelector(".checkout-btn");
  if (!checkoutBtn) return;

  checkoutBtn.addEventListener("click", () => {

    const inputs = document.querySelectorAll("input[type='text'], input[type='email']");
    for (let input of inputs) {
      if (input.value) {
        alert("Please complete all required fields");
        return;
      }
    }

    const payment = document.querySelector("input[name='payment']:checked");
    if (!payment) {
      alert("Please select a payment method");
      return;
    }

    alert("Order confirmed!");
    window.location.href = "shipping.html";
  });
});

/*********************************
 SHIPPING PAGE (VISIBLE FIX)
*********************************/
document.addEventListener("DOMContentLoaded", () => {
  const statusSteps = document.querySelectorAll(".status-step");
  if (!statusSteps.length) return;

  let step = 0;
  setInterval(() => {
    if (step < statusSteps.length) {
      statusSteps[step].classList.add("active");
      step++;
    }
  }, 1500);
});

/*********************************
 MOBILE RESPONSIVE HELPER
*********************************/
window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    document.body.classList.add("mobile");
  } else {
    document.body.classList.remove("mobile");
  }
});


// MOBILE NAV TOGGLE
function toggleMenu(){
    const nav = document.getElementById("navLinks");

    if(nav.style.display === "flex"){
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
    }
}

// CLOSE MENU WHEN LINK IS CLICKED (MOBILE)
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-links a");
    const nav = document.getElementById("navLinks");

    links.forEach(link => {
        link.addEventListener("click", () => {
            if(window.innerWidth <= 768){
                nav.style.display = "none";
            }
        });
    });
});
