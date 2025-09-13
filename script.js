const cartContainer = document.getElementById("cart-container");
const cartIcon = document.getElementById("cart-icon");
const cartShow = document.getElementById("cart");
const closeIcon = document.getElementById("closeIcon");
const itemCount = document.getElementById("itemCount");
const buyNow = document.getElementById("buyNow");
const cartBox = document.getElementById("cartBox");
const totalAmount = document.getElementById("TotalAmount");
// all card data
const cardDataLoad = () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      searchItem(data);
      dispalyProduct(data);
      homePage(data);
    });
};

const dispalyProduct = (products) => {
  cartContainer.innerHTML = "";
  products.forEach((product) => {
    // console.log(product);
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="bg-gray-700 p-3 rounded-lg text-white">
                <div class="w-full h-[300px] overflow-hidden flex items-center rounded-md">
                    <img class="w-full h-full hover:scale-110 transition-all p-4 duration-200 ease-in-out bg-cover mx-auto bg-gray-200 rounded-md" src="${
                      product.image
                    }" alt="">
                </div>
                <h1 class="text-xl text-center "> ${product.title.slice(
                  0,
                  20
                )}</h1>
                <div class="flex justify-between items-center">
                    <p class="bg-green-100 text-black p-2 tracking-widest rounded-lg ">${
                      product.price
                    }</p>
                    <p class="bg-green-100 p-2 rounded-lg text-black">${
                      product.rating.rate
                    }</p>
                </div>
                <h2 class="p-2">${product.category}</h2>
                <button id="${
                  product.id
                }" class="bg-gray-400 py-3 px-4 rounded-md w-full cursor-pointer">Add To Card</button>
            </div>
    `;
    cartContainer.append(div);
  });
};
cardDataLoad();

let carts = [];

cartContainer.addEventListener("click", (e) => {
  if (e.target.localName === "button") {
    const element = e.target;
    const image = element.parentNode.children[0].children[0].src;
    const title = element.parentNode.children[1].innerText;
    const price = element.parentNode.children[2].children[0].innerText;
    const id = element.id;

    const checkCart = carts.find((cart) => cart.id == id);

    if (checkCart) {
      checkCart.quantity++;
    } else {
      carts.push({
        title: title,
        image: image,
        price: price,
        id: id,
        quantity: 1,
      });
    }
    displayCart(carts);
  }
});
const displayCart = (cartItems) => {
  cartBox.innerHTML = "";

  let amount = 0;
  let totalQuantity = 0;
  cartItems.forEach((cartItem) => {
    const div = document.createElement("div");
    div.innerHTML = `
              <div class="bg-gray-700 rounded-lg text-white grid grid-cols-[30%_50%_20%] items-center gap-6 p-2 mb-3">
                  <img src="${cartItem.image}" alt="" class="w-20">
                  <div class="space-y-2">
                      <h2 class="font-bold">${cartItem.title}</h2>
                      <p>$ <span>${(cartItem.price * cartItem.quantity).toFixed(
                        2
                      )}</span> </p>
                      <p>${cartItem.quantity}</p>
                  </div>
                  <div onclick= "handelDelete(${
                    cartItem.id
                  })" class="cursor-pointer">
                      <i class="fa-solid fa-trash text-red-600 text-xl"></i>
                  </div>
              </div>
      `;
    const tPrice = Number(cartItem.price * cartItem.quantity);
    amount += tPrice;
    totalQuantity += cartItem.quantity;
    cartBox.append(div);
  });
  itemCount.innerText = totalQuantity;
  totalAmount.innerText = amount.toFixed(2);
};

const handelDelete = (deleteID) => {
  carts.map((cart, index) => {
    if (cart.id == deleteID) {
      carts.splice(index, 1);
      displayCart(carts);
    }
  });
};
const searchItem = (data) => {
  document.getElementById("searchBtn").addEventListener("click", () => {
    const input = document.getElementById("searchInput");
    const searchInput = input.value.trim().toLowerCase();
    const searchItem = data.filter((item) =>
      item.title.toLowerCase().includes(searchInput)
    );
    cartContainer.innerHTML = "";
    console.log(searchItem);
    if (searchItem.length > 0) {
      dispalyProduct(searchItem);
    } else {
      cartContainer.innerHTML += `
    <div id="error" class="flex justify-center items-center py-30 w-[1200px] ">
      <h1 class="text-3xl text-red-600 ">
        Product Not Found
        <a href="index.html" class="hover:underline text-blue-500 ml-3">
            Please Back to home page
        </a>
      </h1>
    </div>;
    `;
    }
    input.value = "";
  });
};

buyNow.addEventListener("click", () => {
  carts.slice(0);
  displayCart(carts);
  alert("Purchase Successfull ✔");
});
cartIcon.addEventListener("click", () => {
  cartShow.classList.add("active");
});
closeIcon.addEventListener("click", () => {
  cartShow.classList.remove("active");
});
