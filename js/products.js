/* ========================================
   المنتجات
======================================== */

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



/* ========================================
   السلة
======================================== */

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];



/* ========================================
   كميات المنتجات
======================================== */

const productQuantities = {};



/* ========================================
   تشغيل الصفحة
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            document.getElementById(
                "productsList"
            )
        ) {

            renderCategories();

            renderCategoryFilter();

            renderProducts();

        }

        renderCart();

    }
);



/* ========================================
   الأقسام
======================================== */

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



function renderCategories() {

    const container =
        document.getElementById(
            "categoriesList"
        );


    if (!container) return;


    container.innerHTML = "";


    getCategories().forEach(
        function (category) {


            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";

            button.className =
                "category-card";


            button.innerHTML = `

                <div class="category-icon">
                    📦
                </div>

                <strong>
                    ${escapeHTML(category)}
                </strong>

            `;


            button.addEventListener(
                "click",
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


                    const section =
                        document.getElementById(
                            "products"
                        );


                    if (section) {

                        section.scrollIntoView({
                            behavior:
                                "smooth"
                        });

                    }

                }
            );


            container.appendChild(
                button
            );

        }
    );

}



/* ========================================
   فلتر الأقسام
======================================== */

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


            select.appendChild(
                option
            );

        }
    );

}



/* ========================================
   عرض المنتجات
======================================== */

function renderProducts() {

    const container =
        document.getElementById(
            "productsList"
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


                const nameMatch =
                    product.name
                        .toLowerCase()
                        .includes(search);


                const categoryMatch =
                    category === "all" ||
                    product.category ===
                        category;


                return (
                    nameMatch &&
                    categoryMatch
                );

            }
        );


    container.innerHTML = "";


    const noProducts =
        document.getElementById(
            "noProducts"
        );


    if (
        noProducts
    ) {

        if (filtered.length === 0) {

            noProducts.classList.remove(
                "hidden"
            );

        } else {

            noProducts.classList.add(
                "hidden"
            );

        }

    }


    filtered.forEach(
        function (product) {


            if (
                !productQuantities[
                    product.id
                ]
            ) {

                productQuantities[
                    product.id
                ] = 1;

            }


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "product-card";


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


                    <!-- التحكم بالكمية -->

                    <div
                        class="product-quantity-controls"
                        style="
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            gap:14px;
                            margin:15px 0;
                        "
                    >


                        <button
                            type="button"
                            class="product-minus-button"
                            data-action="minus"
                            style="
                                width:42px;
                                height:42px;
                                border:0;
                                border-radius:8px;
                                background:#e5e7eb;
                                font-size:24px;
                                font-weight:bold;
                                cursor:pointer;
                            "
                        >
                            −
                        </button>


                        <strong
                            id="productQuantity-${product.id}"
                            style="
                                min-width:35px;
                                text-align:center;
                                font-size:19px;
                            "
                        >
                            ${
                                productQuantities[
                                    product.id
                                ]
                            }
                        </strong>


                        <button
                            type="button"
                            class="product-plus-button"
                            data-action="plus"
                            style="
                                width:42px;
                                height:42px;
                                border:0;
                                border-radius:8px;
                                background:#e5e7eb;
                                font-size:24px;
                                font-weight:bold;
                                cursor:pointer;
                            "
                        >
                            +
                        </button>


                    </div>


                    <!-- إضافة -->

                    <button
                        type="button"
                        class="add-button"
                        data-action="add"
                    >

                        🛒 إضافة إلى السلة

                    </button>


                </div>

            `;



            /* زر ناقص */

            const minus =
                card.querySelector(
                    '[data-action="minus"]'
                );


            minus.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    changeProductQuantity(
                        product.id,
                        -1
                    );

                }
            );



            /* زر زائد */

            const plus =
                card.querySelector(
                    '[data-action="plus"]'
                );


            plus.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    changeProductQuantity(
                        product.id,
                        1
                    );

                }
            );



            /* زر الإضافة */

            const add =
                card.querySelector(
                    '[data-action="add"]'
                );


            add.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    addSelectedQuantityToCart(
                        product.id
                    );

                }
            );



            /* فتح المنتج */

            card.addEventListener(
                "click",
                function (event) {


                    if (
                        event.target.closest(
                            "button"
                        )
                    ) {

                        return;

                    }


                    window.location.href =
                        "product.html?id=" +
                        product.id;

                }
            );


            container.appendChild(
                card
            );

        }
    );

}



/* ========================================
   تغيير كمية المنتج
======================================== */

function changeProductQuantity(
    productId,
    change
) {

    if (
        !productQuantities[
            productId
        ]
    ) {

        productQuantities[
            productId
        ] = 1;

    }


    productQuantities[
        productId
    ] += change;


    if (
        productQuantities[
            productId
        ] < 1
    ) {

        productQuantities[
            productId
        ] = 1;

    }


    const quantityElement =
        document.getElementById(
            "productQuantity-" +
            productId
        );


    if (quantityElement) {

        quantityElement.textContent =
            productQuantities[
                productId
            ];

    }

}



/* ========================================
   إضافة الكمية للسلة
======================================== */

function addSelectedQuantityToCart(
    productId
) {

    const product =
        products.find(
            item =>
                item.id ===
                productId
        );


    if (!product) return;


    const quantity =
        productQuantities[
            productId
        ] || 1;


    const existing =
        cart.find(
            item =>
                item.id ===
                productId
        );


    if (existing) {

        existing.quantity +=
            quantity;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            quantity: quantity

        });

    }


    productQuantities[
        productId
    ] = 1;


    const quantityElement =
        document.getElementById(
            "productQuantity-" +
            productId
        );


    if (quantityElement) {

        quantityElement.textContent =
            "1";

    }


    saveCart();

    renderCart();

}



/* ========================================
   إضافة قطعة واحدة
======================================== */

function addToCart(productId) {

    addSelectedQuantityToCart(
        productId
    );

}



/* ========================================
   عرض السلة
======================================== */

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
                    Number(
                        item.quantity
                    )
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


    let html = "";


    cart.forEach(
        function (item, index) {


            const price =
                Number(
                    item.price
                ) || 0;


            const quantity =
                Number(
                    item.quantity
                ) || 1;


            const lineTotal =
                price *
                quantity;


            total +=
                lineTotal;


            html += `

                <div class="cart-item">


                    <div class="cart-item-top">


                        <div>

                            <div
                                class="cart-item-name"
                            >
                                ${escapeHTML(
                                    item.name
                                )}
                            </div>


                            <div
                                class="cart-item-price"
                            >
                                ${formatNumber(
                                    lineTotal
                                )}
                                د.ع
                            </div>

                        </div>


                    </div>


                    <div
                        class="cart-item-actions"
                    >


                        <button
                            type="button"
                            class="quantity-button"
                            onclick="changeQuantity(
                                ${index},
                                -1
                            )"
                        >
                            −
                        </button>


                        <strong>
                            ${quantity}
                        </strong>


                        <button
                            type="button"
                            class="quantity-button"
                            onclick="changeQuantity(
                                ${index},
                                1
                            )"
                        >
                            +
                        </button>


                        <button
                            type="button"
                            class="delete-button"
                            onclick="removeFromCart(
                                ${index}
                            )"
                        >
                            حذف
                        </button>


                    </div>


                </div>

            `;

        }
    );


    container.innerHTML =
        html;


    if (totalElement) {

        totalElement.textContent =
            formatNumber(total);

    }

}



/* ========================================
   زيادة / نقصان داخل السلة
======================================== */

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

        cart.splice(
            index,
            1
        );

    }


    saveCart();

    renderCart();

}



/* ========================================
   حذف المنتج
======================================== */

function removeFromCart(index) {

    if (!cart[index]) return;


    cart.splice(
        index,
        1
    );


    saveCart();

    renderCart();

}



/* ========================================
   فتح السلة
======================================== */

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



/* ========================================
   إغلاق السلة
======================================== */

function closeCart(event) {

    if (
        event &&
        event.target &&
        event.target.id !==
            "cartOverlay"
    ) {

        return;

    }


    const overlay =
        document.getElementById(
            "cartOverlay"
        );


    if (!overlay) return;


    overlay.classList.add(
        "hidden"
    );

}



/* ========================================
   حفظ السلة
======================================== */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}



/* ========================================
   تنسيق الأرقام
======================================== */

function formatNumber(number) {

    return Number(
        number
    ).toLocaleString(
        "en-US"
    );

}



/* ========================================
   حماية HTML
======================================== */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text ?? "";


    return div.innerHTML;

}
