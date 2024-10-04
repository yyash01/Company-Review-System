const form = document.querySelector("#admin-form");
const errorMessage = document.querySelector(".error");
const errorUserName = document.querySelector(".errorUserName");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userNameValue = form.userName.value;
  const passwordValue = form.password.value;

  const admin = {
    id: 1,
    userName: userNameValue,
    password: passwordValue,
  };

  fetch("/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(admin),
  }).then(async (res) => {
    const message = await res.text();
    if (message == "OK") {
      window.location.href = "AdminDashboard.html";
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
