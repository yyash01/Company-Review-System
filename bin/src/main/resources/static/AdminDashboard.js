const content = document.querySelector(".main-content");
let companyData = [];
let productData = [];

async function fetchData() {
  const data = await fetch(`/company`);
  const message = await data.text();
  const msg = JSON.parse(message);
  companyData = msg;

  const productFetch = await fetch("/product");
  const prodMessage = await productFetch.text();
  productData = JSON.parse(prodMessage);

  console.log(companyData);
  console.log(productData);
}

function AddCompany() {
  const findInfo = document.querySelector(".InfoDiv");
  const ProductDiv = document.querySelector(".productDiv");
  let showCompanyDiv = document.querySelector(".showComapny");
  let showProductDiv = document.querySelector(".showProduct");
  if (findInfo != null) {
    return;
  }
  if (ProductDiv != null) {
    ProductDiv.remove();
  }
  if (showCompanyDiv != null) {
    showCompanyDiv.remove();
  }
  if (showProductDiv != null) {
    showProductDiv.remove();
  }
  const Info = document.createElement("div");
  Info.className = "InfoDiv";
  Info.innerHTML = `
    <div class="formDiv">
    <form id="Review-form">
      <div class="row">
        <div class="Firstcol">
          <label for="companyName">Add Company Name</label>
          <label for="website">Company Website</label>
        </div>
        <div class="SecondCol">
          <input type="text" name="CompanyName" required onchange="remove()" />
          <input type="text" name="CompanyWebsite" required />
        </div>
        <div class="companyNameError"></div>
      </div>
      <div class="Thirdcol">
        <label for="Category">Category</label>
      </div>
      <div class="SecondCol">
      <input type="text" name="CompanyCategory" required />
      </div>
      <div class="FourthCol">
        <label for="Overview">Overview</label>
      </div>
      <div class="SecondCol">
        <textarea
          type="text"
          name="CommpanyOverview"
          rows="7"
          cols="120"
          placeholder="Add Some OverView of Your Company ..."
          required
        ></textarea>
      </div>
      <div class="Thirdcol"><label for="Features">Features</label></div>
      <div class="SecondCol">
        <!-- <input type="text" name="CommpanyFeatures" required /> -->
        <textarea
          type="text"
          name="CommpanyFeatures"
          rows="7"
          cols="120"
          placeholder="Add Some Important Features of Your Company ..."
          required
        ></textarea>
      </div>
      <div class="SubmitBtn"><button type="submit">Submit</button></div>
    </form>
  </div>
    `;
  content.appendChild(Info);

  const form = document.querySelector("#Review-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const obj = {
      company_name: form.CompanyName.value,
      category: form.CompanyCategory.value,
      overview: form.CommpanyOverview.value,
      features: form.CommpanyFeatures.value,
      company_WEBSITE: form.CompanyWebsite.value,
      rating: RandomRating(),
    };

    const res = await checkCompany(obj.company_name);
    if (res) {
      const err = document.querySelector(".companyNameError");
      err.innerHTML = `<h3> This Company Already Exists </h3>`;
      return;
    }

    console.log(obj);

    fetch("/admin/AddCompany", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    }).then(async (res) => {
      const msg = await res.text();
      console.log(msg);
      if (msg) {
        alert("Comapny Added Successfully");
        window.location.href = "AdminDashboard.html";
      }
    });
  });
}

//Function to AddProduct
async function AddProduct() {
  const findInfo = document.querySelector(".productDiv");
  let companyDiv = document.querySelector(".InfoDiv");
  let showCompanyDiv = document.querySelector(".showComapny");
  let showProductDiv = document.querySelector(".showProduct");
  if (findInfo != null) {
    return;
  }

  if (companyDiv != null) {
    companyDiv.remove();
  }

  if (showCompanyDiv != null) {
    showCompanyDiv.remove();
  }
  if (showProductDiv != null) {
    showProductDiv.remove();
  }

  const Info = document.createElement("div");
  Info.className = "productDiv";
  Info.innerHTML = `
    <div class="formDiv">
    <form id="Review-form">
      <div class="row">
        <div class="Firstcol">
          <label for="companyName">Add Product Name</label>
          <label for="website">Company Name</label>
        </div>
        <div class="SecondCol">
          <input type="text" name="CompanyName" required />
          <input type="text" name="CompanyWebsite" required onchange="remove()" />
        </div>
        <div class="prodError"></div>
      </div>
      <div class="error"></div>
      <div class="Thirdcol">
        <label for="Category">Category</label>
      </div>
      <div id="companyCategory" class="SecondCol">
        <input type="text" name="CompanyCategory" required />
      </div>
      <div class="FourthCol">
        <label for="Overview">Price</label>
      </div>
      <div class="SecondCol">
      <input type="number" min="0" max="1000" name="CommpanyOverview" required placeholder="Add Price of this Product ..." />
      </div>
      <div class="Thirdcol"><label for="Features">Features</label></div>
      <div class="SecondCol">
        <textarea
          type="text"
          name="CommpanyFeatures"
          rows="7"
          cols="120"
          placeholder="Add Some Important Features of Your Product ..."
          required
        ></textarea>
      </div>
      <div class="SubmitBtn"><button type="submit">Submit</button></div>
    </form>
  </div>
    `;
  const category = Info.querySelector("#companyCategory");
  category.innerHTML = "";

  //Fetching the Category from the Company table
  const data = await fetch(`/company/category`);
  const message = await data.text();
  const msg = JSON.parse(message);

  const Item = document.createElement("select");
  Item.name = "CompanyCategory";
  Item.id = "option_button";
  for (key in msg) {
    let option = document.createElement("option");
    option.text = msg[key].CATEGORY;
    option.value = msg[key].CATEGORY;
    Item.add(option);
  }
  category.appendChild(Item);
  content.appendChild(Info);

  //Sending the Form data to Database
  const form = document.querySelector("#Review-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const obj = {
      productName: form.CompanyName.value,
      category: form.CompanyCategory.value,
      price: form.CommpanyOverview.value,
      features: form.CommpanyFeatures.value,
      companyName: form.CompanyWebsite.value,
      rating: RandomRating(),
    };

    //check the companyName is avalaible or not.
    const res = await checkCompany(obj.companyName);
    if (!res) {
      const err = document.querySelector(".error");
      err.innerHTML = `<h3> This Company Name is Unavailable </h3>`;
      return;
    }

    //check similar product Already Exists or not.
    const productExist = await checkProduct(obj.productName, obj.companyName);
    if (productExist) {
      //find the DOM element
      const prodErr = document.querySelector(".prodError");
      prodErr.innerHTML = `<h3> This Product Already Exists </h3>`;
      return;
    }

    fetch("/admin/AddProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    }).then(async (res) => {
      const msg = await res.text();
      if (msg) {
        alert("Product Added Successfully");
        window.location.href = "AdminDashboard.html";
      }
    });
  });
}

function RandomRating() {
  let min = 1;
  let max = 5;
  let randomInt = Math.floor(Math.random() * (max - min + 1) + min);
  return randomInt;
}

async function remove() {
  //for removing the Company error
  const companyErr = document.querySelector(".companyNameError");
  if (companyErr) companyErr.innerHTML = "";

  //for removing the productName error
  const err = document.querySelector(".error");
  if (err) err.innerHTML = "";

  //for removing the productNot Exist Error
  const prodErr = document.querySelector(".prodError");
  if (prodErr) prodErr.innerHTML = "";
}

async function checkCompany(param) {
  for (key in companyData) {
    if (param == companyData[key].company_name) {
      return true;
    }
  }
  return false;
}

async function checkProduct(productName, companyName) {
  for (key in productData) {
    if (
      productName == productData[key].productName &&
      companyName == productData[key].companyName
    ) {
      return true;
    }
  }
  return false;
}

async function showCompany() {
  let prodDiv = document.querySelector(".productDiv");
  let companyDiv = document.querySelector(".InfoDiv");
  let showCompanyDiv = document.querySelector(".showComapny");
  let showProductDiv = document.querySelector(".showProduct");
  if (showCompanyDiv != null) {
    return;
  }
  if (prodDiv != null) {
    prodDiv.remove();
  }
  if (companyDiv != null) {
    companyDiv.remove();
  }
  if (showProductDiv != null) {
    showProductDiv.remove();
  }

  const Info = document.createElement("div");
  Info.className = "showComapny";
  Info.innerHTML = `
      <div class="formDiv">
      <table class="companyTable">
        <tr>
          <th>Company Name</th>
          <th>Category</th>
          <th>OverView</th>
          <th>Features</th>
          <th>Website</th>
          <th>Rating</th>
        </tr>
      </table>
    </div>
  `;
  content.appendChild(Info);
  const table = document.querySelector(".companyTable");
  for (key in companyData) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${companyData[key].company_name} </td>
      <td>${companyData[key].category} </td>
      <td>${companyData[key].overview} </td>
      <td>${companyData[key].features} </td>
      <td>${companyData[key].company_WEBSITE} </td>
      <td>${companyData[key].rating} </td>
    `;
    table.appendChild(tr);
  }
}

async function showProduct() {
  let prodDiv = document.querySelector(".productDiv");
  let companyDiv = document.querySelector(".InfoDiv");
  let showCompanyDiv = document.querySelector(".showComapny");
  let showProductDiv = document.querySelector(".showProduct");
  if (showProductDiv != null) {
    return;
  }
  if (prodDiv != null) {
    prodDiv.remove();
  }
  if (companyDiv != null) {
    companyDiv.remove();
  }
  if (showCompanyDiv != null) {
    showCompanyDiv.remove();
  }

  const Info = document.createElement("div");
  Info.className = "showProduct";
  Info.innerHTML = `
      <div class="formDiv">
      <table class="prodTable">
        <tr>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Features</th>
          <th>Company Name</th>
          <th>Rating</th>
        </tr>
      </table>
    </div>
  `;
  content.appendChild(Info);
  const table = document.querySelector(".prodTable");
  for (key in productData) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${productData[key].productName} </td>
      <td>${productData[key].category} </td>
      <td>${productData[key].price}$ </td>
      <td>${productData[key].features} </td>
      <td>${productData[key].companyName} </td>
      <td>${productData[key].rating} </td>
    `;
    table.appendChild(tr);
  }
}
