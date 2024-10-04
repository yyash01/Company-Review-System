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

  fetch("/login/RegisterUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).then(async (res) => {
    const message = await res.text();
    if (message == "OK") {
      if (searchValue) {
        window.location.href = "Login.html?Id=" + searchValue;
      } else if (searchProduct) {
        window.location.href = "Login.html?ProductId=" + searchProduct;
      } else {
        window.location.href = "Login.html";
      }
    } else {
      errorUserName.innerHTML = `<h3>${message}</h3>`;
    }
  });
});

function Remove() {
  errorMessage.innerHTML = "";
  errorUserName.innerHTML = "";
}
