const API_URL = "/api/products";


// Products received from Python backend
let products = [];


// Cart
const cart = [];


// HTML elements
const productsContainer =
    document.getElementById("products");

const loadingElement =
    document.getElementById("loading");

const errorElement =
    document.getElementById("error");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const sortSelect =
    document.getElementById("sortSelect");

const totalElement =
    document.getElementById("total");

const retryButton =
    document.getElementById("retryButton");


// ==========================================
// GET PRODUCTS FROM PYTHON BACKEND
// ==========================================

async function fetchProducts() {

    loadingElement.classList.remove("hidden");

    errorElement.classList.add("hidden");

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        products = await response.json();

        console.log(
            "Products received from Python:"
        );

        console.log(products);


        loadingElement.classList.add("hidden");


        createCategoryOptions();


        displayProducts(products);

    }

    catch (error) {

        console.error(
            "Failed to fetch products:",
            error
        );

        loadingElement.classList.add("hidden");

        errorElement.classList.remove("hidden");
    }
}


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(productsToDisplay) {

    productsContainer.innerHTML = "";


    if (productsToDisplay.length === 0) {

        productsContainer.innerHTML = `
            <p class="no-products">
                No products match your search.
            </p>
        `;

        totalElement.textContent =
            "Total: $0.00";

        return;
    }


    productsToDisplay.forEach(product => {

        const productCard =
            document.createElement("div");

        productCard.classList.add(
            "product-card"
        );


        productCard.innerHTML = `

            <h3>
                ${product.title}
            </h3>

            <p>
                Category: ${product.category}
            </p>

            <p class="price">
                $${product.price.toFixed(2)}
            </p>

            <button
                onclick="addToCart(${product.id})"
            >
                Add to Cart
            </button>

        `;


        productsContainer.appendChild(
            productCard
        );
    });


    totalElement.textContent =
        `Total: $${calculateTotal(
            productsToDisplay
        ).toFixed(2)}`;
}


// ==========================================
// SEARCH PRODUCTS
// ==========================================

function searchProducts(products, searchTerm) {

    return products.filter(product =>

        product.title
            .toLowerCase()
            .includes(
                searchTerm.toLowerCase()
            )
    );
}


// ==========================================
// FILTER BY CATEGORY
// ==========================================

function filterByCategory(products, category) {

    if (category.toLowerCase() === "all") {
        return products;
    }


    return products.filter(product =>

        product.category.toLowerCase() ===
        category.toLowerCase()

    );
}


// ==========================================
// CALCULATE TOTAL
// ==========================================

function calculateTotal(products) {

    return products.reduce(
        (total, product) => {

            return total + product.price;

        },
        0
    );
}


// ==========================================
// SEARCH + CATEGORY + SORT
// ==========================================

function updateProducts() {

    const searchTerm =
        searchInput.value;


    const selectedCategory =
        categoryFilter.value;


    // Search
    let filteredProducts =
        searchProducts(
            products,
            searchTerm
        );


    // Category
    filteredProducts =
        filterByCategory(
            filteredProducts,
            selectedCategory
        );


    // Sort
    const sortOption =
        sortSelect.value;


    if (sortOption === "low-high") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    }


    if (sortOption === "high-low") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    }


    displayProducts(
        filteredProducts
    );
}


// ==========================================
// SEARCH EVENT
// ==========================================

searchInput.addEventListener(
    "input",
    updateProducts
);


// ==========================================
// CATEGORY EVENT
// ==========================================

categoryFilter.addEventListener(
    "change",
    updateProducts
);


// ==========================================
// SORT EVENT
// ==========================================

sortSelect.addEventListener(
    "change",
    updateProducts
);


// ==========================================
// CREATE CATEGORY OPTIONS
// ==========================================

function createCategoryOptions() {

    categoryFilter.innerHTML = `
        <option value="all">
            All Categories
        </option>
    `;


    const categories = [
        ...new Set(
            products.map(
                product => product.category
            )
        )
    ];


    categories.forEach(category => {

        const option =
            document.createElement("option");


        option.value = category;

        option.textContent = category;


        categoryFilter.appendChild(
            option
        );

    });
}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(productId) {

    const product =
        products.find(
            product =>
                product.id === productId
        );


    if (!product) {

        console.log(
            "Product not found."
        );

        return;
    }


    cart.push(product);


    console.log(
        `${product.title} added to cart.`
    );


    displayCart();
}


// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(productId) {

    const index =
        cart.findIndex(
            product =>
                product.id === productId
        );


    if (index === -1) {

        console.log(
            "Product is not in the cart."
        );

        return;
    }


    cart.splice(index, 1);


    displayCart();
}


// ==========================================
// CART TOTAL
// ==========================================

function calculateCartTotal() {

    return cart.reduce(
        (total, product) => {

            return total + product.price;

        },
        0
    );
}


// ==========================================
// CART COUNT
// ==========================================

function countCartItems() {

    return cart.length;
}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    console.log("Cart:");


    cart.forEach(product => {

        console.log(
            `${product.title} — $${product.price}`
        );

    });


    console.log(
        `Total: $${calculateCartTotal().toFixed(2)}`
    );


    console.log(
        `Items: ${countCartItems()}`
    );
}


// ==========================================
// RETRY
// ==========================================

retryButton.addEventListener(
    "click",
    fetchProducts
);


// ==========================================
// START APPLICATION
// ==========================================

fetchProducts();