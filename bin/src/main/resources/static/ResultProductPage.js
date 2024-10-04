const Companies = document.querySelector(".companies");
const url = new URLSearchParams(window.location.search);
const searchValue = url.get("Name");

let arr = [];
let productCard = [];

function showEmoji(count) {
  let emojis = "";
  for (let i = 0; i < count; i++) {
    emojis += "&#11088";
  }
  return emojis;
}

async function fetchProduct() {
  checkLogin();
  const data = await fetch(`/product/Search/${searchValue}`);
  const message = await data.text();
  const msg = JSON.parse(message);
  arr = msg;

  Companies.innerHTML = "";
  if (arr.length == 0) {
    const Item = document.createElement("div");
    Item.className = "card";
    Item.innerHTML = `
    <div class="card_row2">
      <div class="noresult">No Result Found</div>
      <div class="description">Your search: "${searchValue}" did not return any results </div>
    </div>
    `;
    Companies.appendChild(Item);
    return;
  }

  for (let key in msg) {
    const ele = msg[key];
    console.log(ele);

    //creating Card Element for Each Company.
    const Item = document.createElement("div");
    Item.className = "card";
    Item.innerHTML = `
    <div class="card_row1">
          <div class="company__img">
            <img src="demandfarm.svg" alt="demandfarm_image" />
          </div>
        </div>
        <div class="card_row2">
          <div class="company__name">${ele.productName}</div>
          <div class="company__rating"></div>
          <div class="company__category">${ele.category}</div>
          <div class="company__website">Price: ${ele.price}$</div>
          <div class="company__Line"></div>
          <div class="company__Button">
            <button id="ReviewButton">Review</button>
          </div>
        </div>
    `;
    //Adding the Rating Stars after creating the company Card
    let emojiContainer = Item.querySelector(".company__rating");
    let emojis = showEmoji(ele.rating);
    emojiContainer.innerHTML = emojis;

    const review = Item.querySelector("#ReviewButton");
    review.addEventListener("click", () => {
      window.location.href = "ProductPage.html?Id=" + ele.productId;
    });
    productCard.push(Item);
    Companies.appendChild(Item);
  }
}

function allProduct() {
  Companies.innerHTML = "";
  for (let key in productCard) {
    Companies.appendChild(productCard[key]);
  }
}

async function fetchRatingData(starCount) {
  const filterRatingArr = arr.filter((ele) => ele.rating == starCount);

  if (filterRatingArr.length == 0) {
    Companies.innerHTML = "<h2>Sorry No Company Available</h2>";
    return;
  }
  Companies.innerHTML = "";
  for (let key in filterRatingArr) {
    const ele = filterRatingArr[key];

    //creating Card Element for Each Company.
    const Item = document.createElement("div");
    Item.className = "card";
    Item.innerHTML = `
    <div class="card_row1">
          <div class="company__img">
            <img src="demandfarm.svg" alt="demandfarm_image" />
          </div>
        </div>
        <div class="card_row2">
          <div class="company__name">${ele.productName}</div>
          <div class="company__rating"></div>
          <div class="company__category">${ele.category}</div>
          <div class="company__website">Price: ${ele.price}$</div>
          <div class="company__Line"></div>
          <div class="company__Button">
            <button id="ReviewButton">Review</button>
          </div>
        </div>
    `;

    //Adding the Rating Stars after creating the company Card
    let emojiContainer = Item.querySelector(".company__rating");
    let emojis = showEmoji(ele.rating);
    emojiContainer.innerHTML = emojis;

    const review = Item.querySelector("#ReviewButton");
    review.addEventListener("click", () => {
      window.location.href = "ProductPage.html?Id=" + ele.productId;
    });
    Companies.appendChild(Item);
  }
}

function fetchPriceData(startRange, endRange) {
  const filterPriceArr = arr.filter(
    (ele) => ele.price >= startRange && ele.price <= endRange
  );
  if (filterPriceArr.length == 0) {
    Companies.innerHTML = "<h2>Sorry No Product Available</h2>";
    return;
  }
  Companies.innerHTML = "";
  for (let key in filterPriceArr) {
    const ele = filterPriceArr[key];

    //creating Card Element for Each Company.
    const Item = document.createElement("div");
    Item.className = "card";
    Item.innerHTML = `
    <div class="card_row1">
          <div class="company__img">
            <img src="demandfarm.svg" alt="demandfarm_image" />
          </div>
        </div>
        <div class="card_row2">
          <div class="company__name">${ele.productName}</div>
          <div class="company__rating"></div>
          <div class="company__category">${ele.category}</div>
          <div class="company__website">Price: ${ele.price}$</div>
          <div class="company__Line"></div>
          <div class="company__Button">
            <button id="ReviewButton">Review</button>
          </div>
        </div>
    `;

    //Adding the Rating Stars after creating the company Card
    let emojiContainer = Item.querySelector(".company__rating");
    let emojis = showEmoji(ele.rating);
    emojiContainer.innerHTML = emojis;

    const review = Item.querySelector("#ReviewButton");
    review.addEventListener("click", () => {
      window.location.href = "ProductPage.html?Id=" + ele.productId;
    });
    Companies.appendChild(Item);
  }
}

const rating = document.querySelector("#ratingForm");
rating.onclick = function (event) {
  const val = event.target.id;

  if (val == "inputValue1") {
    filterRating(1, event.target.checked);
  } else if (val == "inputValue2") {
    filterRating(2, event.target.checked);
  } else if (val == "inputValue3") {
    filterRating(3, event.target.checked);
  } else if (val == "inputValue4") {
    filterRating(4, event.target.checked);
  } else {
    filterRating(5, event.target.checked);
  }
};

const price = document.querySelector("#priceForm");
price.onclick = function (event) {
  const val = event.target.id;
  const check = event.target.checked;
  if (val == "priceValue1") {
    filterPrice(0, 100, check);
  } else if (val == "priceValue2") {
    filterPrice(101, 200, check);
  } else if (val == "priceValue3") {
    filterPrice(201, 250, check);
  } else if (val == "priceValue4") {
    filterPrice(251, 300, check);
  } else {
    filterPrice(301, 400, check);
  }
};
function filterRating(StarCount, check) {
  if (check == true) {
    fetchRatingData(StarCount);
  } else {
    allProduct();
  }
}

function filterPrice(startRange, endRange, check) {
  if (check == true) {
    fetchPriceData(startRange, endRange);
  } else {
    allProduct();
  }
}

async function checkLogin() {
  const data = await fetch(`/login`);
  const message = await data.text();
  const login = document.querySelector(".login");
  const loginBtn = document.querySelector("#login-btn");

  if (message != "login") {
    loginBtn.remove();
    login.innerHTML = `${message}`;
    const logout = document.querySelector(".logout");
    logout.innerHTML = `<button id="logout-btn" onclick="logout()">LogOut</button>`;
  }
}

async function logout() {
  const newData = await fetch(`/login/logout`);
  const newMessage = await newData.text();
  if (newMessage == "OK") {
    window.location.href = "HomePage.html";
  }
}

function login() {
  window.location.href = "Login.html";
}
