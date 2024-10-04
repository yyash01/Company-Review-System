const CompanyInfo = document.querySelector(".companyInfo");
const url = new URLSearchParams(window.location.search);
const searchValue = url.get("Id");
let user;

function showEmoji(count) {
  let emojis = "";
  for (let i = 0; i < count; i++) {
    emojis += "&#11088";
  }
  return emojis;
}

async function fetchProduct() {
  checkLogin();
  const data = await fetch(`/product/${searchValue}`);
  const message = await data.text();

  const ele = JSON.parse(message);

  CompanyInfo.innerHTML += `
    <div class="company__name">${ele.productName}</div>
  <div class="company__category">
    <div class="row">
      Category :
      <div class="catDiv">${ele.category}</div>
    </div>
  </div>
  <div class="company__feature">
    <div class="row">Features :</div>
    <div class="rowFeature">${ele.features}</div>
  </div>
  <div class="company__overview">
    <div class="row">Price :</div>
    <div class="rowOverview">$${ele.price}</div>
  </div>
  <div class="company__rating">
    <div class="row">Rating :</div>
    <div class="rowRating"></div>
  </div>
  <div class="company__website">
    <div class="row">Contact :</div>
    <div class="rowOverview"><a id="TakeToCompany">Go To Company</a></div>
  </div>

  `;
  //Adding the Rating Stars after creating the product Card
  let emojiContainer = CompanyInfo.querySelector(".rowRating");
  let emojis = showEmoji(ele.rating);
  emojiContainer.innerHTML = emojis;

  const myLink = document.getElementById("TakeToCompany");
  myLink.href = "CompanyPage.html?Id=" + ele.companyId;

  //fetching Review Details
  const reviewSection = document.querySelector(".company__review");
  reviewSection.innerHTML = "";
  const newData = await fetch(`/product/GetReview/${searchValue}`);
  const newMessage = await newData.text();
  const element = JSON.parse(newMessage);

  for (let key in element) {
    const review = element[key];
    const ValidDate = FormatDateTime(review.dateTime);

    //creating Card Element for Each Review.
    const Item = document.createElement("div");
    Item.className = "card";
    Item.innerHTML = `
    <div class="reviewHeader">
    <div class="review__Rating"></div>
      <div class="company__feature">${ValidDate}</div>
    </div>
    <div class="review__category">"${review.title}"</div>
    <div class="review__name">Author : ${review.author}</div>
    
    <div class="company__overview">
      What do you like about this Product : ${review.answerOne}
    </div>
    <div class="company__rating">
      What do you dislike about this Product : ${review.answerTwo}
    </div>
    <div class="company__website">
      Some key Features you used for your work : ${review.answerThree}
    </div>
    <div class="company__website">
      Some feedback to Improve : ${review.answerFour}
    </div>
    `;
    //Adding the Rating Stars after creating the company Card
    let emojiContainer = Item.querySelector(".review__Rating");
    let emojis = showEmoji(review.rating);
    emojiContainer.innerHTML = emojis;

    reviewSection.appendChild(Item);

    if (user == review.author) {
      const reviewHeader = Item.querySelector(".reviewHeader");
      let companyFeature = Item.querySelector(".company__feature");
      companyFeature.remove();

      let addRight = document.createElement("div");
      addRight.className = "right";
      addRight.innerHTML = `
        <div class="company__feature">${ValidDate}</div>
        <button onclick=deleteReview(${review.prid})>DELETE</button>
      `;
      reviewHeader.appendChild(addRight);
    }
  }
}

async function AddReview() {
  const data = await fetch(`/login`);
  const message = await data.text();
  console.log(message);

  if (message != "login") {
    window.location.href = "ProductAddReview.html?Id=" + searchValue;
  } else {
    window.location.href = "Login.html?ProductId=" + searchValue;
  }
}

async function checkLogin() {
  const data = await fetch(`/login`);
  const message = await data.text();
  const login = document.querySelector(".login");
  const loginBtn = document.querySelector("#login-btn");

  if (message != "login") {
    user = message;
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

function FormatDateTime(params) {
  const date = new Date(params);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  }; // Options for formatting the date string

  const formattedDateString = date.toLocaleDateString("en-US", options);
  return formattedDateString;
}

function login() {
  window.location.href = "Login.html";
}

function deleteReview(reviewId) {
  console.log("YASH : " + reviewId);
  fetch("/product/DeleteReview", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewId),
  }).then(async (res) => {
    const msg = await res.text();
    if (msg) {
      alert("Review Deleted Successfully");
      window.location.href = "ProductPage.html?Id=" + searchValue;
    }
  });
}
