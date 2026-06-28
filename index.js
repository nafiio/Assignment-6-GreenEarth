const loadCategories = () => {
  const url = `https://openapi.programming-hero.com/api/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

const loadTree = (id) => {
  const uri = id
    ? `https://openapi.programming-hero.com/api/category/${id}`
    : `https://openapi.programming-hero.com/api/plants`;

  // loading spinner
  document.getElementById("loading-spinner").classList.remove("hidden");
  document.getElementById("cart-container").classList.add("hidden");

  // 1.sobaike dhore active class remove kore diye jake click kora hoiche take deu

  const catBtns = document.querySelectorAll(".cat-btn");
  // console.log(catBtns);
  catBtns.forEach((btn) => btn.classList.remove("active"));
  // 2. sobaike dhore active class add kore deu
  const currentBtns = document.getElementById(`cat-btn-${id}`);
  currentBtns?.classList.add("active");
  fetch(uri)
    .then((res) => res.json())
    .then((data) => displayTree(data.plants));
};

const loadModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayModal(data.plants));
};

let cart = [];
let total = 0;

const displayCategories = (btns) => {
  //   console.log(btn);
  const categoriesBtn = document.getElementById("categories-btn");
  categoriesBtn.innerHTML = "";
  for (let btn of btns) {
    // console.log(btn);
    const createElement = document.createElement("div");
    createElement.innerHTML = `
    <button id="cat-btn-${btn.id}" onclick="loadTree(${btn.id})" class="btn bg-green-100 cat-btn" >${btn.category_name}</button>
    `;
    categoriesBtn.append(createElement);
  }
};

const displayTree = (trees) => {
  //   console.log(trees);

  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";
  for (let tree of trees) {
    // console.log(tree);
    const newTree = document.createElement("div");
    newTree.innerHTML = `
    <div class="card bg-base-100 shadow-sm">
                <figure class="px-2 pt-2">
                  <img
                    src=${tree.image}
                    alt="Shoes"
                    class="rounded-xl"
                  />
                </figure>
                <div class="card-body">
                  <h2 onclick="loadModal(${tree.id})" class="card-title tree-name">${tree.name}</h2>
                  <p class="text-slate-500">
                    ${tree.description}
                  </p>
                  <div class="flex justify-between items-center gap-10">
                    <p
                      class="btn max-w-30 bg-green-100 shadow-sm rounded-full text-green-700 "
                    >
                      ${tree.category}
                    </p>
                    <p class="text-lg font-semibold">$<span class="tree-price">${tree.price}</span></p>
                  </div>
                  <div class="card-actions">
                    <button
                      onclick="addToCart(this)"
                      class="btn w-full text-white bg-green-700 rounded-full"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
    `;

    cartContainer.append(newTree);
  }

  // loading spinner
  document.getElementById("loading-spinner").classList.add("hidden");
  document.getElementById("cart-container").classList.remove("hidden");
};

const displayModal = (modal) => {
  console.log(modal);
  const myModal = document.getElementById("tree_modal");
  myModal.innerHTML = `
  
  <div class="modal-box">
    
  <div class="space-y-5 p-5 ">
    <h1 class="text-xl font-bold"> ${modal.name}</h1>
    <img src="${modal.image}" alt="">
    
    <p class="text-lg font-semibold"> Category:<span class="text-xs font-normal"> ${modal.category}</span></p>
    <p class="text-lg font-semibold">Price: ৳<span class="text-xs font-normal">${modal.price}</p>
    <p class="text-lg font-semibold"> Description:<span class="text-xs font-normal"> ${modal.description}</p>

  </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>

  `;
  document.getElementById("foodDetailsModal").showModal();
};

loadCategories();
loadTree(1);

const addToCart = (btn) => {
  // console.log(btn);
  const item = btn.parentNode.parentNode;
  // console.log(item);
  const treeName = item.querySelector(".tree-name").innerText;
  console.log(treeName);
  const treePrice = Number(item.querySelector(".tree-price").innerText);
  // console.log(foodName, foodPrice);

  const selectedTree = {
    treeName: treeName,
    treePrice: treePrice,
  };
  cart.push(selectedTree);
  console.log(cart);
  total = total + treePrice;
  displayCart(cart);
  displayTotal(total);
};

const displayCart = (carts) => {
  // console.log(carts);
  const addCartContainer = document.getElementById("add-to-cart-container");
  addCartContainer.innerHTML = "";
  for (let cart of carts) {
    // console.log(cart);
    const newCart = document.createElement("div");
    newCart.innerHTML = `
     <div class="p-2 mt-5 bg-green-50 flex gap-3 shadow rounded-xl relative">
                  <div class="flex-1">
                    <h1 class="text-lg font-bold plant-name">
                      ${cart.treeName}
                    </h1>

                    <div class="">
                      <h2 class="font-semibold text-slate-400">
                        ৳ <span class="plant-price">${cart.treePrice}</span> BDT
                      </h2>
                    </div>
                  </div>
                  <div
                    onclick="removeCart(this)"
                    class="w-6 h-6 flex justify-center items-center absolute top-5 right-2 text-slate-400"
                  >
                    <i class="fa-solid fa-x"></i>
                  </div>
                </div>
    `;
    addCartContainer.append(newCart);
  }
};

const displayTotal = (val) => {
  document.getElementById("cart-total").innerHTML = val;
};

const removeCart = (remove) => {
  const removeItem = remove.parentNode;
  const plantName = removeItem.querySelector(".plant-name").innerText;
  // console.log(plantName);
  const plantPrice = Number(removeItem.querySelector(".plant-price").innerText);
  console.log(plantName, plantPrice);
  cart = cart.filter((item) => item.treeName != plantName);
  total = 0;
  cart.forEach((price) => (total += price.treePrice));

  displayCart(cart);
  displayTotal(total);
};
