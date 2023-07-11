const productsContainer =document.querySelector(".card-container");
const showMoreBtn = document.querySelector(".show-btn");
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const openMenu = document.querySelector(".open-menu");
const barsMenu = document.querySelector(".nav-links");
const menuIcon = document.querySelector(".menu-icon");
const CartBtn = document.querySelector(".cart-label");
const CartMenu = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const successMsg = document.querySelector(".add-msg");
const productCard = document.querySelector(".product-card");
const addBtn = document.querySelector(".add-btn");
const buyBtn = document.querySelector(".confirm-buy");
const deleteBtn = document.querySelector(".btn-delete");
const cartBubble = document.querySelector(".cart-bubble");




let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const createProductTemplate = (product) => {
    const { id, name, type ,material, tang, price, cardImg, } = product;

    return  `
     <div class="product-cards">
    <img class="product-img" src=${cardImg} alt=${name} />
    <h3>${name}</h3>
    <ul>
        <li class="product-data">${type}</li>
        <li class="product-data">${material}</li>
        <li class="product-data">${tang}</li>
    </ul>
    <p class="priceProduct">$ ${price}</p>
    <button class="add-btn" data-id="${id}"data-name="${name}" data-price="${price}" data-img="${cardImg}" >comprar</button>
</div>

`;
};

const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList
                  .map(createProductTemplate)
                  .join("");
};

const isLastIndexOf =() => {
    return appState.currentProductsIndex === appState.productsLimit -1;
};

const showMoreProducts = ()=> {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        showMoreBtn.classList.add("hidden");
    }
};

const isInactiveFilterBtn = (element) => {
    return (
        element.classList.contains("category") &&
        !element.classList.contains("active")
    );
};

const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
                 categoryBtn.classList.remove("active");
                 return;
        }
        categoryBtn.classList.add("active");
    });
};

const setShowMoreVisibility = () => {
    if (!appState.activeFilter) {
        showMoreBtn.classList.remove("hidden");
        return;
    }
    showMoreBtn.classList.add("hidden");
};

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveState(appState.activeFilter);
    setShowMoreVisibility();
};

const renderFilteredProducts = () => {
    const filteredProducts = ProductsData.filter((product) => {
        return product.category === appState.activeFilter;
    });
    renderProducts(filteredProducts);
};

const applyFilter = ({ target }) => {
    if (!isInactiveFilterBtn(target)) {
        return;
    }
    changeFilterState(target);

    productsContainer.innerHTML = "";
    if (appState.activeFilter) {
        renderFilteredProducts();
        appState.currentProductsIndex = 0;
        return;
    }
    renderProducts(appState.products[0]);
};

const moreToggle = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        showMoreBtn.classList.add("hidden");
    }
};

const CartToggle = () => {
    CartMenu.classList.toggle('open-cart');
    if(barsMenu.classList.contains('open-menu')) {
           barsMenu.classList.remove('open-menu');
           return;
       }

       overlay.classList.toggle("show-overlay");
};

const MenuToggle = () => {
    barsMenu.classList.toggle('open-menu');
    if
        (CartMenu.classList.contains('open-cart')) {
            CartMenu.classList.remove('open-cart');
            return;
        }
        
        overlay.classList.toggle("show-overlay");
       
};


const closeOnScroll = ()=> {
    if (
        !barsMenu.classList.contains("open-menu") &&
        !CartMenu.classList.contains("open-cart")
    ) {
        return;
    }
    barsMenu.classList.remove("open-menu");
    CartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};

const closeOnClick = (e) => {
    if (!e.target.classList.contains("nav-link")){
        return;
    }
    barsMenu.classList.remove("open-menu");
    CartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};


const closeOnOverlayClick = () => {
    barsMenu.classList.remove("open-menu");
    CartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};

const createCartProductTemplate = (cartProduct) => {
    const { id, name, price, Img, quantity } = cartProduct;
    return `
     <div class="cart-item">
            <img
                 src=${Img}
                 alt="imagen del carro"
                             
            />
            <div class="item-info">
                <h3 class="item-title">${name}</h3>
                <span class="item-price">${price}</span>
            </div>
            <div class="item-handler">
                <span class="quantity-handler down" data-id=${id}>-</span>
                <span class="item-quantity">${quantity}</span>
                <span class="item-quantity up" data-id=${id}>+</span>
             </div>
        </div>
    `;
};

const renderCart = () => {
    if (!cart.length) {
        productsCart.innerHTML =  `<p class="empty-msg">Sin productos en el carrito.</p>`;
        return;
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};



const getCartTotal = () => {
    return cart.reduce((acc, val) => {
        return acc + Number(val.price) * Number(val.quantity);
    }, 0);
};

const showCartTotal = () => {
    total.innerHTML = `${getCartTotal().toFixed(2)} $`;
};

const createProductData = (product) => {
    const { id, name, price, cardImg } = product;
    return { id, name, price, cardImg };
};

const isExistingCartProduct = (productId) => {
    return cart.find((item) => {
        return item.id === productId;
    });
};

const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) => {
        return cartProduct.id === product.id
              ? {...cartProduct, quantity: cartProduct.quantity + 1 }
              : cartProduct;
    });
};

const showSuccessMsg = (msg) => {
    successMsg.classList.add("active-msg");
    successMsg.textContent = msg;
    setTimeout(() => {
        successMsg.classList.remove("active-msg");
    }, 1500);
};

const createCartProduct = (product) => {
    cart = [
        ...cart,
        {
            ...product,
            quantity: 1,
        },
    ];
};

const disableBtn = (btn) => {
    if (!cart.length) {
        btn.classList.add("disabled");
    } else {
           btn.classList.remove("disabled");
    }
};

const renderCartBubble = () => {
    cartBubble.textContent = cart.reduce((acc, val) => {
        return acc + val.quantity;
    }, 0);
};

const updateCartState = () => {
    saveCart();
    renderCart();
    showCartTotal();
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    renderCartBubble();
};

const addProduct = (e) => {
    if (!e.target.classList.contains("add-btn")) {
        return;
    }
    const product = createProductData(e.target.dataset);
    if (isExistingCartProduct(product.id)) {
        addUnitToProduct(product);
        showSuccessMsg("producto agregado al carrito exitosamente");
    } else {
        createCartProduct(product);
        showSuccessMsg("producto agregado al carrito exitosamente");
    }
    updateCartState();
};

const removeProductFromCart = (existingProduct) => {
    cart = cart.filter((product) => {
        return product.id !== existingProduct.id;
    });
    updateCartState();
};

const substractProductUnit = (existingProduct) => {
    cart = cart.map((product) => {
        return product.id === existingProduct.id
        ? {...product, quantity: Number(product.quantity) -1 }
          : product ;
    });
};

const handleMinusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
         if (existingCartProduct.quantity === 1) {
            if (window.confirm("¿esta seguro de eliminar el producto del carrito")) {
                removeProductFromCart(existingCartProduct);
            }
            return;
         }
         substractProductUnit(existingCartProduct);
};

const handlePlusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    addUnitToProduct(existingCartProduct);
};

const handleQuantity = (e) => {
    if (e.target.classList.contains("down")) {
        handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains("up")) {
        handlePlusBtnEvent(e.target.dataset.id);
    }
    updateCartState();
};

const resetCartItem = () => {
    cart = [];
    updateCartState();
};

const completeCartAction = (confirmMsg, SuccessMsg) => {
    if (!cart.length) return;

    if (window.confirm(confirmMsg)) {
        resetCartItem();
        alert(SuccessMsg);
    }
};

const completeBuy = () => {
    completeCartAction("¿deseas completar tu compra?", "¡gracias por tu compra!");
};

const deleteCart = () => {
    completeCartAction(
        "¿deseas vaciar tu carrito?",
        "No hay productos en el carrito"
    );
};




const init = () => {
    renderProducts(appState.products[appState.currentProductsIndex]);
    showMoreBtn.addEventListener("click", moreToggle);
    categoriesContainer.addEventListener("click",applyFilter);
    CartBtn.addEventListener("click" , CartToggle);
    menuIcon.addEventListener("click" , MenuToggle);
    window.addEventListener("scroll", closeOnScroll);
    barsMenu.addEventListener("click", closeOnClick);
    overlay.addEventListener("click", closeOnOverlayClick);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showCartTotal);
    productsContainer.addEventListener("click", addProduct);
    productsCart.addEventListener("click", handleQuantity);
    buyBtn.addEventListener("click", completeBuy);
    deleteBtn.addEventListener("click", deleteCart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    renderCartBubble();
    
};

init();