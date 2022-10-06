const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const CARS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const EXT_TYPE = ".json";

let logout = function(){
  localStorage.removeItem('user');
  window.location = 'index.html';

}

let user = function(){
  document.getElementById('userMenuLink').innerHTML = localStorage.getItem('user');
  }

// let showSpinner = function(){
//   document.getElementById("spinner-wrapper").style.display = "block";
// }

// let hideSpinner = function(){
//   document.getElementById("spinner-wrapper").style.display = "none";
// }

let getJSONData = function(url){
    let result = {};
    // showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          // hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        // hideSpinner();
        return result;
    });
}

let loadCartProducts = function(purchaseData){
  
  let productsHTMLtoAppend = '';
  let purchaseProductsLocalStorage = JSON.parse(localStorage.getItem('listaProductosCompra'));
  let totalProductsPurchase = purchaseData.articles.concat(purchaseProductsLocalStorage);
  for (product of totalProductsPurchase){
    productsHTMLtoAppend += `
      <tr>
        <td><img class="img-thumbnail " src="`+product.image+`"/></td>
        <td>`+product.name+`</td>
        <td class="fs-6">`+product.currency+` `+product.unitCost+`</td>
        <td><input id = 'testBuy' class="cartProdsCount form-control" type="number" value="`+product.count+`" oninput="subTotalChange(this.value,`+product.unitCost+`,`+product.id+`)"></td>
        <td>`+product.currency+` <span id="cartProd`+product.id+`">`+product.unitCost*product.count+`</span></td>
      </tr>
      `
  }
  document.getElementById('cartProductsTable').innerHTML = productsHTMLtoAppend;
}

let subTotalChange = function(value,cost,id){
  document.getElementById("cartProd"+id).innerHTML=value*cost;
}

document.addEventListener("DOMContentLoaded", function(){
  let userCartURL = CART_INFO_URL + '25801.json'
  document.getElementById("userCart").addEventListener("click", function() {
    getJSONData(userCartURL).then(function(resultObj){
      
      if (resultObj.status === "ok"){
          let userPurchaseData = resultObj.data
          loadCartProducts(userPurchaseData)
      }
    });
  });
});