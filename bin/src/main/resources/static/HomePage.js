const form = document.querySelector(".container");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const resLogin = await loggedIn();

  if (resLogin == "login") {
    // Get the modal
    let modal = document.querySelector(".modal");
    modal.style.display = "block";

    // When the user clicks anywhere outside of the modal
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
    return;
  }
  const searchValue = document.querySelector(".searchBarTitle");
  const searchOption = document.getElementById("OptionButton");

  let option = searchOption.value;
  let findValue = searchValue.value;

  if (option == "Company") {
    if (findValue != null) {
      window.location.href = "ResultCompanyPage.html?Name=" + findValue;
    }
  } else {
    if (findValue != null) {
      window.location.href = "ResultProductPage.html?Name=" + findValue;
    }
  }
});

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

async function loggedIn() {
  const data = await fetch(`/login`);
  const message = await data.text();
  return message;
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
