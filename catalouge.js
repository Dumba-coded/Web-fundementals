const cart =
    JSON.parse(localStorage.getItem("perfumeCart")) || [];

const cartItems =
    document.getElementById("cart-items");

const cartTotal =
    document.getElementById("cart-total");

const cartEmpty =
    document.getElementById("cart-empty");

const cartContent =
    document.getElementById("cart-content");

const clearCartButton =
    document.getElementById("clear-cart");

function saveCart() {
    localStorage.setItem(
        "perfumeCart",
        JSON.stringify(cart)
    );
}

function updateCart() {
    const cartCount =
        document.getElementById("cart-count");

    if (!cartItems || !cartTotal || !cartEmpty || !cartContent) {
        return;
    }

    cartItems.innerHTML = "";

    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;

        const listItem =
            document.createElement("li");

        listItem.className = "cart-item";

        listItem.innerHTML = `
            <div class="cart-item-details">
                <strong>${item.name}</strong>

                <p>
                    $${item.price.toFixed(2)} each
                </p>
            </div>

            <div class="cart-item-controls">
                <button
                    type="button"
                    class="decrease-item"
                    data-index="${index}"
                >
                    −
                </button>

                <span>${item.quantity}</span>

                <button
                    type="button"
                    class="increase-item"
                    data-index="${index}"
                >
                    +
                </button>

                <button
                    type="button"
                    class="remove-item"
                    data-index="${index}"
                >
                    Remove
                </button>
            </div>
        `;

        cartItems.appendChild(listItem);
    });

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }

    cartTotal.textContent =
        totalPrice.toFixed(2);

    const hasItems =
        cart.length > 0;

    cartEmpty.hidden = hasItems;
    cartContent.hidden = !hasItems;

    saveCart();
}

document
    .querySelectorAll(".add-cart-button")
    .forEach((button) => {
        button.addEventListener("click", () => {
            const card =
                button.closest(".perfume-card");

            const name =
                card.dataset.name;

            const price =
                Number(card.dataset.price);

            const existingItem =
                cart.find((item) => {
                    return item.name === name;
                });

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });
            }

            updateCart();

            button.textContent = "Added!";

            setTimeout(() => {
                button.textContent =
                    "Add to My Cart";
            }, 900);
        });
    });

if (cartItems) {
    cartItems.addEventListener("click", (event) => {
        const clickedButton =
            event.target.closest("button");

        if (!clickedButton) {
            return;
        }

        const index =
            Number(clickedButton.dataset.index);

        if (Number.isNaN(index)) {
            return;
        }

        if (
            clickedButton.classList.contains(
                "increase-item"
            )
        ) {
            cart[index].quantity += 1;
        }

        if (
            clickedButton.classList.contains(
                "decrease-item"
            )
        ) {
            cart[index].quantity -= 1;

            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
        }

        if (
            clickedButton.classList.contains(
                "remove-item"
            )
        ) {
            cart.splice(index, 1);
        }

        updateCart();
    });
}

if (clearCartButton) {
    clearCartButton.addEventListener("click", () => {
        cart.length = 0;

        updateCart();
    });
}

document
    .querySelectorAll(".favourite-button")
    .forEach((button) => {
        button.addEventListener("click", () => {
            button.classList.toggle("active");

            if (
                button.classList.contains("active")
            ) {
                button.textContent = "★";
            } else {
                button.textContent = "☆";
            }
        });
    });

const filterForm =
    document.getElementById("filter-form");

const searchInput =
    document.getElementById("search");

const sortSelect =
    document.getElementById("sort");

const brandSelect =
    document.getElementById("brand");

const genderSelect =
    document.getElementById("gender");

const seasonSelect =
    document.getElementById("season");

const searchMessage =
    document.getElementById("search-message");

const perfumeList =
    document.querySelector(".perfume-list");

const originalPerfumeOrder =
    Array.from(
        document.querySelectorAll(".perfume-card")
    );

function applyFilters() {
    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();

    const sortValue =
        sortSelect.value;

    const brandValue =
        brandSelect.value;

    const genderValue =
        genderSelect.value;

    const seasonValue =
        seasonSelect.value;

    const perfumeCards =
        Array.from(
            document.querySelectorAll(".perfume-card")
        );

    const matchingCards =
        perfumeCards.filter((card) => {
            const perfumeName =
                card.dataset.name.toLowerCase();

            const perfumeBrand =
                card.dataset.brand;

            const perfumeGender =
                card.dataset.gender;

            const perfumeSeason =
                card.dataset.season;

            const matchesSearch =
                searchValue === "" ||
                perfumeName.includes(searchValue);

            const matchesBrand =
                brandValue === "" ||
                perfumeBrand === brandValue;

            const matchesGender =
                genderValue === "" ||
                perfumeGender === genderValue;

            const matchesSeason =
                seasonValue === "" ||
                perfumeSeason === seasonValue;

            return (
                matchesSearch &&
                matchesBrand &&
                matchesGender &&
                matchesSeason
            );
        });

    perfumeCards.forEach((card) => {
        card.hidden = true;
    });

    if (sortValue === "name-az") {
        matchingCards.sort(
            (firstCard, secondCard) => {
                return firstCard.dataset.name.localeCompare(
                    secondCard.dataset.name
                );
            }
        );
    }

    if (sortValue === "name-za") {
        matchingCards.sort(
            (firstCard, secondCard) => {
                return secondCard.dataset.name.localeCompare(
                    firstCard.dataset.name
                );
            }
        );
    }

    if (sortValue === "price-low-high") {
        matchingCards.sort(
            (firstCard, secondCard) => {
                return (
                    Number(firstCard.dataset.price) -
                    Number(secondCard.dataset.price)
                );
            }
        );
    }

    if (sortValue === "price-high-low") {
        matchingCards.sort(
            (firstCard, secondCard) => {
                return (
                    Number(secondCard.dataset.price) -
                    Number(firstCard.dataset.price)
                );
            }
        );
    }

    matchingCards.forEach((card) => {
        card.hidden = false;
        perfumeList.appendChild(card);
    });

    if (matchingCards.length === 0) {
        searchMessage.textContent =
            "No perfumes matched your search and filters.";
    } else if (matchingCards.length === 1) {
        searchMessage.textContent =
            "1 perfume found.";
    } else {
        searchMessage.textContent =
            `${matchingCards.length} perfumes found.`;
    }
}

if (filterForm) {
    filterForm.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            applyFilters();
        }
    );

    filterForm.addEventListener("reset", () => {
        setTimeout(() => {
            originalPerfumeOrder.forEach((card) => {
                card.hidden = false;
                perfumeList.appendChild(card);
            });

            searchMessage.textContent = "";
        }, 0);
    });
}

function initialiseHeaderCart() {
    const cartButton =
        document.getElementById("cart-button");

    if (cartButton) {
        cartButton.addEventListener("click", () => {
            const cartSection =
                document.getElementById("cart");

            if (cartSection) {
                cartSection.scrollIntoView({
                    behavior: "smooth"
                });
            } else {
                window.location.href =
                    "index.html#cart";
            }
        });
    }

    updateCart();
}

document.addEventListener(
    "headerLoaded",
    initialiseHeaderCart
);