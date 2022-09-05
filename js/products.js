let productsList = [];
let filteredProducts = [];


function user(){
    let userLi = document.createElement("li");
    let userA = document.createElement("a");
    let userName = document.createTextNode(localStorage.getItem('user'));
    userLi.className = 'nav-item';
    userA.className = 'nav-link active';
    userLi.appendChild(userA);
    userA.appendChild(userName);
    document.getElementById('navbarNav').getElementsByTagName('ul')[0].appendChild(userLi);
}

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let product = array[i];
        console.log('hi')
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + ` - ` + product.cost + ` ` + product.currency + `</h4> 
                        <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `  
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
}

document.addEventListener("DOMContentLoaded", function(e){
    user()

    categoryID = localStorage.getItem('catID');
    let CATEGORY_URL = PRODUCTS_URL +  categoryID + '.json';
    console.log(CATEGORY_URL)
    getJSONData(CATEGORY_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            let data = resultObj.data;
            productsList = data.products;
            showProductsList(productsList);
        }
    });
});

document.getElementById('priceFilter').addEventListener('click', function(){
    let minPriceFilter = document.getElementById('minPrice').value;
    let maxPriceFilter = document.getElementById('maxPrice').value;
    let productsFilter;

    let productPrices = [];
    for (product of productsList){
        productPrices.push(product.cost)
    }
    let minPriceProd = Math.min(...productPrices);
    let maxPriceProd = Math.max(...productPrices);

    if(minPriceFilter == ''){
        minPriceFilter = minPriceProd
    }
    if(maxPriceFilter == ''){
        maxPriceFilter = maxPriceProd
    }
    
    if(filteredProducts.length == 0){
        productsFilter = productsList;
    }else{
        productsFilter = filteredProducts;
    }

    filteredProducts = productsFilter.filter(product => product.cost >= minPriceFilter && product.cost <= maxPriceFilter);
    showProductsList(filteredProducts);

})

document.getElementById('clearFilter').addEventListener('click', function(){
    document.getElementById('minPrice').value = ''
    document.getElementById('maxPrice').value = ''
    filteredProducts = [];
    showProductsList(productsList);
})

document.getElementById('sortAsc').addEventListener('click', function(){
    let productsAsc;
    if(filteredProducts.length == 0){
        productsAsc = productsList;
    }else{
        productsAsc = filteredProducts;
    }

    productsAsc.sort((a,b)=>a.cost-b.cost)
    showProductsList(productsAsc);
})

document.getElementById('sortDesc').addEventListener('click', function(){
    let productsDesc;
    if(filteredProducts.length == 0){
        productsDesc = productsList;
    }else{
        productsDesc = filteredProducts;
    }
    productsDesc.sort((a,b)=>b.cost-a.cost)
    showProductsList(productsDesc);
})

document.getElementById('sortRev').addEventListener('click', function(){
    let productsRev;
    if(filteredProducts.length == 0){
        productsRev = productsList;
    }else{
        productsRev = filteredProducts;
    }
    productsRev.sort((a,b)=>b.soldCount-a.soldCount)
    showProductsList(productsRev);
})