const form = document.querySelector("#admin-form");
const errorMessage = document.querySelector(".error");
const errorUserName = document.querySelector(".errorUserName");

const url = new URLSearchParams(window.location.search);
const searchValue = url.get("Id");
const searchProduct = url.get("ProductId");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userNameValue = form.userName.value;
  const passwordValue = form.password.value;

  const user = {
    userName: userNameValue,
    password: passwordValue,
  };

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).then(async (res) => {
    const message = await res.text();
    if (message == "OK") {
      if (searchValue) {
        window.location.href = "AddCompanyReview.html?Id=" + searchValue;
      } else if (searchProduct) {
        window.location.href = "ProductAddReview.html?Id=" + searchProduct;
      } else {
        window.location.href = "HomePage.html";
      }
    } else {
      if (message == "Please Add Correct Password") {
        errorMessage.innerHTML = `<h3>${message}</h3>`;
      } else {
        errorUserName.innerHTML = `<h3>${message}</h3>`;
      }
    }
  });
});

function Remove() {
  errorMessage.innerHTML = "";
  errorUserName.innerHTML = "";
}

function AddNewUser() {
  if (searchValue) {
    window.location.href = "Register.html?Id=" + searchValue;
  } else if (searchProduct) {
    window.location.href = "Register.html?ProductId=" + searchProduct;
  } else {
    window.location.href = "Register.html";
  }
}
