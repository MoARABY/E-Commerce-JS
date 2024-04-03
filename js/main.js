let pName = document.getElementById("p-name");
let pCategory = document.getElementById("p-category");
let pQuantity = document.getElementById("p-quantity");
let price = document.getElementById("p-price");
let taxes = document.getElementById("p-taxes");
let ads = document.getElementById("p-ads");
let discount = document.getElementById("p-discount");
let total = document.getElementById("p-total");
let CreateBTN = document.querySelector(".createBTN");
let DelBTN = document.querySelector(".createBTN-ALL");
let SearchBTN = document.querySelector(".SearchBTN");
let SearchTxt = document.querySelector("#product-name");
//
let mode = CreateBTN.innerHTML;
let tmp;
// get total -----------------------
const CalcTotal = (_price, _taxes = 0, _ads = 0, _discount = 0) => {
  if (_price) {
    let result = +_taxes + +_ads + +_price - +_discount;
    total.style.backgroundColor = "#040";
    total.value = result;
  } else {
    total.style.backgroundColor = "red";
    total.value = 0;
  }
};

price.onkeyup = () => {
  CalcTotal(price.value, taxes.value, ads.value, discount.value);
};
taxes.onkeyup = () => {
  CalcTotal(price.value, taxes.value, ads.value, discount.value);
};
ads.onkeyup = () => {
  CalcTotal(price.value, taxes.value, ads.value, discount.value);
};
discount.onkeyup = () => {
  CalcTotal(price.value, taxes.value, ads.value, discount.value);
};
// create func --------------------------------------------------------------------------
let ProductArr;
if (localStorage.product) {
  ProductArr = JSON.parse(localStorage.product);
} else {
  ProductArr = [];
}

CreateBTN.onclick = () => {
  createEle(
    pName.value,
    pCategory.value,
    pQuantity.value,
    price.value,
    taxes.value,
    ads.value,
    discount.value,
    total.value
  );

  showEle();
};

function createEle(
  _name,
  _cat,
  _quan = 1,
  _price,
  _taxes,
  _ads,
  _discount,
  _total
) {
  if (!_name) {
    pName.style.backgroundColor = "red";
  } else if (!_cat) {
    pCategory.style.backgroundColor = "red";
  } else if (!_price) {
    price.style.backgroundColor = "red";
  } else {
    let newOne = {
      ProductName: _name,
      ProductCategory: _cat,
      ProductPrice: +_price,
      ProductTaxes: +_taxes,
      ProductAds: +_ads,
      ProductDiscount: +_discount,
      ProductTotal: +_total,
      ProductQuantity: +_quan,
    };
    console.log(mode);
    if (mode === "CREATE") {
      ProductArr.push(newOne);
      localStorage.setItem("product", JSON.stringify(ProductArr));
    } else {
      ProductArr[tmp] = newOne;
      localStorage.setItem("product", JSON.stringify(ProductArr));
      console.log("uu");
    }
    pName.value = "";
    pCategory.value = "";
    pQuantity.value = "";
    price.value = "";
    taxes.value = "";
    pName.value = "";
    ads.value = "";
    discount.value = "";
    total.value = "";
    CreateBTN.innerHTML = "CREATE";
    mode = CreateBTN.innerHTML;
  }
}
showEle();

// showAll-----------------------------------------------------------------------------------
function showEle() {
  if (ProductArr.length > 0) {
    let TBody = document.getElementById("tbody");
    let NewTable = "";
    for (let i = 0; i < ProductArr.length; i++) {
      NewTable += `
            <tr>
            <td>${i}</td>
            <td>${ProductArr[i].ProductName}</td>
            <td>${ProductArr[i].ProductCategory}</td>
            <td>${ProductArr[i].ProductPrice}</td>
            <td>${ProductArr[i].ProductTaxes}</td>
            <td>${ProductArr[i].ProductAds}</td>
            <td>${ProductArr[i].ProductDiscount}</td>
            <td>${ProductArr[i].ProductTotal}</td>
            <td>${ProductArr[i].ProductQuantity}</td>
            <td><div onclick = updateOne(${i}) class="btn rounded-pill updateBTN">UPDATE</div></td>
            <td><div onclick = DeleteOne(${i}) class="btn rounded-pill deleteBTN">DELETE</div></td>
        </tr>
            `;
      TBody.innerHTML = NewTable;
    }
  } else {
    TBody.innerHTML = "";
  }
}
// addEventListener("click", (e) => {
//   let BTN = e.target;
//   if ((BTN.className = "deleteBTN")) {
//     DeleteOne;
//   }
// });

// deleteOne---------------------------------------------------------------------------------
function DeleteOne(index) {
  ProductArr.splice(index, 1);
  localStorage.product = JSON.stringify(ProductArr);
  showEle();
}

// deleteAll---------------------------------------------------------------------------------
DelBTN.onclick = () => {
  DeleteAll();
};
function DeleteAll() {
  if (ProductArr.length > 0) {
    ProductArr.splice(0);
    localStorage.clear();
    showEle();
  }
}

// update---------------------------------------------------------------------------------
function updateOne(index) {
  tmp = index;
  pName.value = ProductArr[index].ProductName;
  pCategory.value = ProductArr[index].ProductCategory;
  price.value = ProductArr[index].ProductPrice || 0;
  taxes.value = ProductArr[index].ProductTaxes || 0;
  ads.value = ProductArr[index].ProductAds || 0;
  discount.value = ProductArr[index].ProductDiscount || 0;
  total.value = ProductArr[index].ProductTotal || 0;
  pQuantity.value = ProductArr[index].ProductQuantity;
  CreateBTN.innerHTML = "UPDATE";
  mode = CreateBTN.innerHTML;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  console.log(mode);
}

// search---------------------------------------------------------------------------------
SearchBTN.onclick = () => {
  SearchFunc(SearchTxt.value);
};
let SearchFunc = (value) => {
  if (!SearchTxt.value) {
    SearchTxt.style.backgroundColor = "red";
  } else {
    console.log("done!!");
    SearchTxt.style.backgroundColor = "#000000";
    let TBody = document.getElementById("tbody");
    let NewTable = "";
    for (let i = 0; i < ProductArr.length; i++) {
      if (ProductArr[i].ProductName.includes(value)) {
        TBody.innerHTML = "";
        NewTable += `
        <tr>
        <td>${i}</td>
        <td>${ProductArr[i].ProductName}</td>
        <td>${ProductArr[i].ProductCategory}</td>
        <td>${ProductArr[i].ProductPrice}</td>
        <td>${ProductArr[i].ProductTaxes}</td>
        <td>${ProductArr[i].ProductAds}</td>
        <td>${ProductArr[i].ProductDiscount}</td>
        <td>${ProductArr[i].ProductTotal}</td>
        <td>${ProductArr[i].ProductQuantity}</td>
        <td><div onclick = updateOne(${i}) class="btn rounded-pill updateBTN">UPDATE</div></td>
        <td><div onclick = DeleteOne(${i}) class="btn rounded-pill deleteBTN">DELETE</div></td>
    </tr>
        `;
        TBody.innerHTML = NewTable;
      } else {
        SearchTxt.value = "";
        showEle();
      }
    }
  }
};
