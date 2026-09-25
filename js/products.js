/*
========================================
المنتجات
========================================
*/

const products = [

    {
        id: 1,
        name: "المنتج الأول",
        category: "البلاستيك",
        price: 10000,
        icon: "📦",
        description: "وصف مختصر للمنتج الأول."
    },

    {
        id: 2,
        name: "المنتج الثاني",
        category: "البلاستيك",
        price: 15000,
        icon: "🧴",
        description: "وصف مختصر للمنتج الثاني."
    },

    {
        id: 3,
        name: "المنتج الثالث",
        category: "الأدوات المنزلية",
        price: 20000,
        icon: "🏠",
        description: "وصف مختصر للمنتج الثالث."
    },

    {
        id: 4,
        name: "المنتج الرابع",
        category: "الأدوات المنزلية",
        price: 25000,
        icon: "🛠️",
        description: "وصف مختصر للمنتج الرابع."
    },

    {
        id: 5,
        name: "المنتج الخامس",
        category: "منتجات جديدة",
        price: 30000,
        icon: "⭐",
        description: "وصف مختصر للمنتج الخامس."
    },

    {
        id: 6,
        name: "المنتج السادس",
        category: "منتجات جديدة",
        price: 35000,
        icon: "🛒",
        description: "وصف مختصر للمنتج السادس."
    }

];


/*
========================================
السلة
========================================
*/

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


/*
========================================
تشغيل الموقع
========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
        الصفحة الرئيسية
        */

        if (
            document.getElementById(
                "productsList"
            )
        ) {

            renderCategories();

            renderCategoryFilter();

            renderProducts();

        }


        /*
        السلة موجودة في الصفحتين
        */

        if (
            document.getElementById(
                "cartItems"
            )
        ) {

            renderCart();

        }

    }
);


/*
========================================
الأقسام
========================================
*/

function getCategories() {

    return [
        ...new Set(
            products.map(
                product =>
                    product.category
            )
        )
    ];

}


/*
========================================
عرض الأقسام
========================================
*/

function renderCategories() {

    const container =
        document.getElementById(
            "categoriesList"
        );

    if (!container) return;

    container.innerHTML = "";

    const categories =
        getCategories();

    categories.forEach(
        function (category) {

            const card =
                document.createElement(
                    "button"
                );

            card.className =
                "category-card";

            card.innerHTML = `

                <div class="category-icon">
                    📦
                </div>

                <strong>
                    ${escapeHTML(category)}
                </strong>

            `;

            card.onclick =
                function () {

                    const filter =
                        document.getElementById(
                            "categoryFilter"
                        );

                    if (filter) {

                        filter.value =
                            category;

                        renderProducts();

                    }

                    const productsSection =
                        document.getElementById(
                            "products"
                        );

                    if (productsSection) {

                        productsSection.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                };

            container.appendChild(card);

        }
    );

}


/*
========================================
فلترة الأقسام
========================================
*/

function renderCategoryFilter() {

    const select =
        document.getElementById(
            "categoryFilter"
        );

    if (!select) return;

    select.innerHTML = `

        <option value="all">
            كل الأقسام
        </option>

    `;

    getCategories().forEach(
        function (category) {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                category;

            option.textContent =
                category;

            select.appendChild(option);

        }
    );

}


/*
========================================
عرض المنتجات
========================================
*/

function renderProducts() {

    const container =
        document.getElementById(
            "productsList"
        );

    const noProducts =
        document.getElementById(
            "noProducts"
        );

    if (!container) return;

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );

    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";

    const category =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const filtered =
        products.filter(
            function (product) {

                const matchesSearch =
                    product.name
                        .toLowerCase()
                        .includes(search);

                const matchesCategory =
                    category === "all" ||
                    product.category ===
                    category;

                return (
                    matchesSearch &&
                    matchesCategory
                );

            }
        );


    container.innerHTML = "";


    filtered.forEach(
        function (product) {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "product-card";


            /*
            ========================================
            الضغط على بطاقة المنتج يفتح التفاصيل
            ========================================
            */

            card.style.cursor =
                "pointer";


            card.onclick =
                function () {

                    window.location.href =
                        "product.html?id=" +
                        product.id;

                };


            card.innerHTML = `

                <div class="product-image">

                    ${product.icon}

                </div>


                <div class="product-body">

                    <div class="product-category">

                        ${escapeHTML(
                            product.category
                        )}

                    </div>


                    <h3 class="product-name">

                        ${escapeHTML(
                            product.name
                        )}

                    </h3>


                    <div class="product-description">

                        ${escapeHTML(
                            product.description
                        )}

                    </div>


                    <div class="product-price">

                        ${formatNumber(
                            product.price
                        )}

                        د.ع

                    </div>


                    <button
                        class="add-button"
                        onclick="
                            event.stopPropagation();
                            addToCart(${product.id});
                        "
                    >

                        🛒 إضافة إلى السلة

                    </button>

                </div>

            `;


            container.appendChild(card);

        }
    );


    if (noProducts) {

        noProducts.classList.toggle(
            "hidden",
            filtered.length !== 0
        );

    }

}


/*
========================================
إضافة منتج إلى السلة
========================================
*/

function addToCart(productId) {

    const product =
        products.find(
            item =>
                item.id === productId
        );


    if (!product) return;


    const existing =
        cart.find(
            item =>
                item.id === productId
        );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            id:
                product.id,

            name:
                product.name,

            price:
                product.price,

            quantity:
                1

        });

    }


    saveCart();

    renderCart();

    openCart();

}


/*
========================================
عرض السلة
========================================
*/

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );

    const count =
        document.getElementById(
            "cartCount"
        );

    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    if (!container) return;


    const totalQuantity =
        cart.reduce(
            function (sum, item) {

                return (
                    sum +
                    item.quantity
                );

            },
            0
        );


    if (count) {

        count.textContent =
            totalQuantity;

    }


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="cart-empty">

                🛒 السلة فارغة

            </div>

        `;


        if (totalElement) {

            totalElement.textContent =
                "0";

        }

        return;

    }


    let total = 0;

    container.innerHTML = "";


    cart.forEach(
        function (item, index) {

            const itemTotal =
                item.price *
                item.quantity;


            total += itemTotal;


            container.innerHTML += `

                <div class="cart-item">

                    <div class="cart-item-top">

                        <div>

                            <div class="cart-item-name">

                                ${escapeHTML(
                                    item.name
                                )}

                            </div>

                            <div class="cart-item-price">

                                ${formatNumber(
                                    item.price
                                )}

                                د.ع

                            </div>

                        </div>


                        <strong>

                            ${formatNumber(
                                itemTotal
                            )}

                            د.ع

                        </strong>

                    </div>


                    <div class="cart-item-actions">

                        <button
                            class="quantity-button"
                            onclick="
                                changeQuantity(
                                    ${index},
                                    1
                                )
                            "
                        >

                            +

                        </button>


                        <strong>

                            ${item.quantity}

                        </strong>


                        <button
                            class="quantity-button"
                            onclick="
                                changeQuantity(
                                    ${index},
                                    -1
                                )
                            "
                        >

                            −

                        </button>


                        <button
                            class="delete-button"
                            onclick="
                                removeFromCart(
                                    ${index}
                                )
                            "
                        >

                            حذف

                        </button>

                    </div>

                </div>

            `;

        }
    );


    if (totalElement) {

        totalElement.textContent =
            formatNumber(total);

    }

}


/*
========================================
تغيير الكمية
========================================
*/

function changeQuantity(
    index,
    change
) {

    if (!cart[index]) return;


    cart[index].quantity +=
        change;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(index, 1);

    }


    saveCart();

    renderCart();

}


/*
========================================
حذف المنتج
========================================
*/

function removeFromCart(index) {

    if (!cart[index]) return;


    cart.splice(index, 1);


    saveCart();

    renderCart();

}


/*
========================================
حفظ السلة
========================================
*/

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


/*
========================================
فتح السلة
========================================
*/

function openCart() {

    const overlay =
        document.getElementById(
            "cartOverlay"
        );

    if (!overlay) return;


    overlay.classList.remove(
        "hidden"
    );

}


/*
========================================
إغلاق السلة
========================================
*/

function closeCart(event) {

    const overlay =
        document.getElementById(
            "cartOverlay"
        );

    if (!overlay) return;


    if (
        !event ||
        event.target.id ===
        "cartOverlay"
    ) {

        overlay.classList.add(
            "hidden"
        );

    }

}


/*
========================================
إتمام الطلب
========================================
*/

function showCheckoutNotice() {

    if (cart.length === 0) {

        alert(
            "السلة فارغة."
        );

        return;

    }


    alert(
        "السلة جاهزة. سنضيف إتمام الطلب في المرحلة القادمة."
    );

}


/*
========================================
تنسيق الأرقام
========================================
*/

function formatNumber(number) {

    return Number(number)
        .toLocaleString("en-US");

}


/*
========================================
حماية النصوص
========================================
*/

function escapeHTML(text) {

    return String(text)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
