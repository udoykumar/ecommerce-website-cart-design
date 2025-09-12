const cartContainer = document.getElementById("cart-container");
const cartIcon = document.getElementById("cart-icon");
const cart = document.getElementById("cart");
const closeIcon = document.getElementById("closeIcon");
// all card data
const cardDataLoad = () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => displayCart(data));
};

const displayCart = (products) => {
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
                <button class="bg-gray-400 py-3 px-4 rounded-md w-full cursor-pointer">Add To Card</button>
            </div>
    `;
    cartContainer.append(div);
  });
};
cardDataLoad();

cartContainer.addEventListener("click", (e) => {
  if (e.target.localName === "button") {
    const element = e.target;
    const image = element.parentNode.children[0].children[0].src;
    console.log(image);
    const title = element.parentNode.children[1].innerText;
    const price = element.parentNode.children[2].children[0].innerText;
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="bg-gray-700 rounded-lg text-white grid grid-cols-[30%_50%_20%] items-center gap-6 p-2 mb-3">
                <img src="${image}" alt="" class="w-20">
                <div class="space-y-2">
                    <h2 class="font-bold">${title}</h2>
                    <p>$ <span>${price}</span> </p>
                    <input type="number" value="1" class="p-2 w-20 border rounded-md text-center">
                </div>
                <div class="cursor-pointer">
                    <i class="fa-solid fa-trash text-red-600 text-xl"></i>
                </div>
            </div>
    `;
    document.getElementById("cartBox").append(div);
  }
});

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});
closeIcon.addEventListener("click", () => {
  cart.classList.remove("active");
});
