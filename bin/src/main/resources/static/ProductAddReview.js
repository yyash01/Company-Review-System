const form = document.getElementById("Review-form");
const url = new URLSearchParams(window.location.search);
const ProductId = url.get("Id");
let user;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const DateTime = new Date().toISOString().slice(0, 19).replace("T", " ");

  const titleValue = form.title.value;
  const ratingValue = form.rating.value;

  const answer1 = form.like.value;
  const answer2 = form.dislike.value;
  const answer3 = form.feature.value;
  const answer4 = form.feedback.value;

  const obj = {
    author: user,
    title: titleValue,
    rating: ratingValue,
    answerOne: answer1,
    answerTwo: answer2,
    answerThree: answer3,
    answerFour: answer4,
    productId: ProductId,
    dateTime: DateTime,
  };

  fetch("/product/AddReview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  }).then(async (res) => {
    const msg = await res.text();
    console.log(msg);
    if (msg == "OK") {
      alert("Review Added Successfully");
      window.location.href = "ProductPage.html?Id=" + ProductId;
    }
  });
});

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

function login() {
  window.location.href = "Login.html";
}
