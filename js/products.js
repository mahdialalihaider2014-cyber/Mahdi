/*
==================================================
                 المنتجات والسلة
==================================================
*/


/*
==================================================
                 بيانات المنتجات
==================================================
*/

const products = [

    {
        id: 1,

        name: "المنتج الأول",

        category: "البلاستيك",

        price: 10000,

        icon: "📦",

        description:
            "وصف مختصر للمنتج الأول."
    },


    {
        id: 2,

        name: "المنتج الثاني",

        category: "البلاستيك",

        price: 15000,

        icon: "🧴",

        description:
            "وصف مختصر للمنتج الثاني."
    },


    {
        id: 3,

        name: "المنتج الثالث",

        category: "الأدوات المنزلية",

        price: 20000,

        icon: "🏠",

        description:
            "وصف مختصر للمنتج الثالث."
    },


    {
        id: 4,

        name: "المنتج الرابع",

        category: "الأدوات المنزلية",

        price: 25000,

        icon: "🛠️",

        description:
            "وصف مختصر للمنتج الرابع."
    },


    {
        id: 5,

        name: "المنتج الخامس",

        category: "منتجات جديدة",

        price: 30000,

        icon: "⭐",

        description:
            "وصف مختصر للمنتج الخامس."
    },


    {
        id: 6,

        name: "المنتج السادس",

        category: "منتجات جديدة",

        price: 35000,

        icon: "🛒",

        description:
            "وصف مختصر للمنتج السادس."
    }

];



/*
==================================================
                 السلة
==================================================
*/

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];



/*
==================================================
       كميات المنتجات في الصفحة الرئيسية
==================================================
*/

const productQuantities = {};



/*
==================================================
              تشغيل الموقع
==================================================
*/

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /*
        ------------------------------------------
        الصفحة الرئيسية
        ------------------------------------------
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
        ------------------------------------------
        السلة
        ------------------------------------------
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
==================================================
              الحصول على الأقسام
==================================================
*/

function getCategories() {

    return [

        ...new Set(

            products.map(
                function (product) {

                    return product.category;

                }
            )

        )

    ];

}



/*
==================================================
              عرض الأقسام
==================================================
*/

function renderCategories() {


    const container =
        document.getElementById(
            "categoriesList"
        );


    if (!container) {

        return;

    }


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


            card.type =
                "button";


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
==================================================
          عرض قائمة الأقسام في الفلتر
==================================================
*/

function renderCategoryFilter() {


    const select =
        document.getElementById(
            "categoryFilter"
        );


    if (!select) {

        return;

    }


    select.innerHTML = `

        <option value="all">
            كل الأقسام
        </option>

    `;


    const categories =
        getCategories();


    categories.forEach(
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
==================================================
                 عرض المنتجات
==================================================
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


    if (!container) {

        return;

    }


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



    /*
    ------------------------------------------
    فلترة المنتجات
    ------------------------------------------
    */

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



    /*
    ------------------------------------------
    إذا لم توجد منتجات
    ------------------------------------------
    */

    if (
        filtered.length === 0
    ) {

        if (noProducts) {

            noProducts.classList.remove(
                "hidden"
            );

        }

        return;

    }


    if (noProducts) {

        noProducts.classList.add(
            "hidden"
        );

    }



    /*
    ------------------------------------------
    إنشاء بطاقات المنتجات
    ------------------------------------------
    */

    filtered.forEach(
        function (product) {


            /*
            إذا لم توجد كمية محفوظة
            نجعلها 1
            */

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


            card.style.cursor =
                "pointer";



            /*
            ----------------------------------
            الضغط على البطاقة
            ----------------------------------
            */

            card.onclick =
                function () {

                    window.location.href =
                        "product.html?id=" +
                        product.id;

                };



            /*
            ----------------------------------
            محتوى البطاقة
            ----------------------------------
            */

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



                    <!-- ======================
                         التحكم بالكمية
                    ======================= -->

                    <div
                        style="
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            gap:12px;
                            margin:15px 0;
                        "
                    >


                        <!-- ناقص -->

                        <button
                            type="button"

                            onclick="
                                event.stopPropagation();

                                changeProductQuantity(
                                    ${product.id},
                                    -1
                                );
                            "

                            style="
                                width:42px;
                                height:42px;
                                border:0;
                                border-radius:8px;
                                background:#e5e7eb;
                                color:#111827;
                                font-size:24px;
                                font-weight:bold;
                                cursor:pointer;
                            "
                        >

                            −

                        </button>



                        <!-- الكمية -->

                        <strong
                            id="
                                productQuantity-${product.id}
                            "

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



                        <!-- زائد -->

                        <button
                            type="button"

                            onclick="
                                event.stopPropagation();

                                changeProductQuantity(
                                    ${product.id},
                                    1
                                );
                            "

                            style="
                                width:42px;
                                height:42px;
                                border:0;
                                border-radius:8px;
                                background:#e5e7eb;
                                color:#111827;
                                font-size:24px;
                                font-weight:bold;
                                cursor:pointer;
                            "
                        >

                            +

                        </button>


                    </div>



                    <!-- ======================
                         إضافة إلى السلة
                    ======================= -->

                    <button

                        type="button"

                        class="add-button"

                        onclick="
                            event.stopPropagation();

                            addSelectedQuantityToCart(
                                ${product.id}
                            );
                        "
                    >

                        🛒 إضافة إلى السلة

                    </button>


                </div>

            `;


            container.appendChild(card);

        }
    );

}



/*
==================================================
        تغيير كمية المنتج قبل الإضافة للسلة
==================================================
*/

function changeProductQuantity(
    productId,
    change
) {


    /*
    إذا لم تكن هناك كمية
    */

    if (
        !productQuantities[
            productId
        ]
    ) {

        productQuantities[
            productId
        ] = 1;

    }



    /*
    تغيير الكمية
    */

    productQuantities[
        productId
    ] += change;



    /*
    منع النزول تحت 1
    */

    if (
        productQuantities[
            productId
        ] < 1
    ) {

        productQuantities[
            productId
        ] = 1;

    }



    /*
    تحديث الرقم على الشاشة
    */

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



/*
==================================================
     إضافة الكمية المحددة إلى السلة
==================================================
*/

function addSelectedQuantityToCart(
    productId
) {


    const product =
        products.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (!product) {

        return;

    }



    /*
    الحصول على الكمية
    */

    const quantity =
        productQuantities[
            productId
        ] || 1;



    /*
    هل المنتج موجود في السلة؟
    */

    const existing =
        cart.find(
            function (item) {

                return item.id === productId;

            }
        );



    if (existing) {


        /*
        إذا موجود نزيد الكمية
        */

        existing.quantity +=
            quantity;

    }

    else {


        /*
        إذا غير موجود نضيفه
        */

        cart.push({

            id:
                product.id,

            name:
                product.name,

            price:
                product.price,

            quantity:
                quantity

        });

    }



    /*
    إعادة كمية المنتج إلى 1
    */

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



    /*
    حفظ السلة
    */

    saveCart();



    /*
    تحديث السلة
    */

    renderCart();



    /*
    فتح السلة
    */

    openCart();

}



/*
==================================================
        إضافة قطعة واحدة مباشرة للسلة
==================================================
*/

function addToCart(
    productId
) {


    const product =
        products.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (!product) {

        return;

    }


    const existing =
        cart.find(
            function (item) {

                return item.id === productId;

            }
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
==================================================
                 عرض السلة
==================================================
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


    if (!container) {

        return;

    }



    /*
    ------------------------------------------
    عدد القطع في السلة
    ------------------------------------------
    */

    const totalQuantity =
        cart.reduce(
            function (
                sum,
                item
            ) {

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



    /*
    ------------------------------------------
    السلة فارغة
    ------------------------------------------
    */

    if (
        cart.length === 0
    ) {


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



    /*
    ------------------------------------------
    بناء السلة
    ------------------------------------------
    */

    let total = 0;


    container.innerHTML = "";



    cart.forEach(
        function (
            item,
            index
        ) {


            const itemTotal =
                item.price *
                item.quantity;


            total +=
                itemTotal;



            container.innerHTML += `

                <div class="cart-item">


                    <!-- اسم المنتج والسعر -->

                    <div class="cart-item-top">


                        <div>


                            <div class="cart-item-name">

                                ${escapeHTML(
                                    item.name
                                )}

                            </div>



                            <div class="cart-item-price">

                                سعر القطعة:

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



                    <!-- ======================
                         التحكم بالكمية
                    ======================= -->

                    <div
                        class="cart-item-actions"
                        style="
                            display:flex;
                            align-items:center;
                            gap:10px;
                        "
                    >


                        <!-- زائد -->

                        <button
                            type="button"

                            class="quantity-button"

                            onclick="
                                changeQuantity(
                                    ${index},
                                    1
                                );
                            "
                        >

                            +

                        </button>



                        <!-- الكمية -->

                        <strong
                            style="
                                min-width:30px;
                                text-align:center;
                                font-size:18px;
                            "
                        >

                            ${item.quantity}

                        </strong>



                        <!-- ناقص -->

                        <button
                            type="button"

                            class="quantity-button"

                            onclick="
                                changeQuantity(
                                    ${index},
                                    -1
                                );
                            "
                        >

                            −

                        </button>



                        <!-- حذف -->

                        <button
                            type="button"

                            class="delete-button"

                            onclick="
                                removeFromCart(
                                    ${index}
                                );
                            "
                        >

                            حذف

                        </button>


                    </div>


                </div>

            `;

        }
    );



    /*
    ------------------------------------------
    الإجمالي
    ------------------------------------------
    */

    if (totalElement) {

        totalElement.textContent =
            formatNumber(total);

    }

}



/*
==================================================
             تغيير كمية المنتج في السلة
==================================================
*/

function changeQuantity(
    index,
    change
) {


    if (!cart[index]) {

        return;

    }



    /*
    تغيير الكمية
    */

    cart[index].quantity +=
        change;



    /*
    إذا أصبحت صفرًا نحذف المنتج
    */

    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(
            index,
            1
        );

    }



    /*
    حفظ
    */

    saveCart();



    /*
    تحديث
    */

    renderCart();

}



/*
==================================================
             حذف منتج من السلة
==================================================
*/

function removeFromCart(
    index
) {


    if (!cart[index]) {

        return;

    }


    cart.splice(
        index,
        1
    );


    saveCart();

    renderCart();

}



/*
==================================================
                 حفظ السلة
==================================================
*/

function saveCart() {

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

}



/*
==================================================
                 فتح السلة
==================================================
*/

function openCart() {


    const overlay =
        document.getElementById(
            "cartOverlay"
        );


    if (!overlay) {

        return;

    }


    overlay.classList.remove(
        "hidden"
    );

}



/*
==================================================
                 إغلاق السلة
==================================================
*/

function closeCart(
    event
) {


    const overlay =
        document.getElementById(
            "cartOverlay"
        );


    if (!overlay) {

        return;

    }



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
==================================================
                 إتمام الطلب
==================================================
*/

function showCheckoutNotice() {


    if (
        cart.length === 0
    ) {

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
==================================================
                 تنسيق الأرقام
==================================================
*/

function formatNumber(
    number
) {

    return Number(
        number
    ).toLocaleString(
        "en-US"
    );

}



/*
==================================================
                 حماية النصوص
==================================================
*/

function escapeHTML(
    text
) {

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
