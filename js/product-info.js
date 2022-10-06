let productID
let PRODUCT_INFO
let PRODUCT_INFO_DATA
let PRODUCT_COMMENT


function comprarProducto(product){
    let prodDataToCart = {
        id: PRODUCT_INFO_DATA.id,
        name: PRODUCT_INFO_DATA.name,
        count: 1,
        unitCost: PRODUCT_INFO_DATA.cost,
        currency: PRODUCT_INFO_DATA.currency,
        image: PRODUCT_INFO_DATA.images[0]
    }

    let listaProdCompraArray = JSON.parse(localStorage.getItem('listaProductosCompra'));
    listaProdCompraArray.push(prodDataToCart);
    localStorage.setItem('listaProductosCompra', JSON.stringify(listaProdCompraArray));
    
}


function showProductInfo(product){

    let htmlContentToAppend = `
        <br>
        <br>
        <div class="row">
        <br>
            <div class="col">
                <h2>`+product.name+`</h2>
            </div>
            <div class="col-1">
                <span class = "col-12"><button type="button" class="btn btn-success" onclick="comprarProducto()">Comprar</button></span>
            </div>
            
        </div>
        <hr/>
        <p class='fw-bold'>Precio:</p>
        <p>` + product.currency + ` ` + product.cost +`</p>
        <p class='fw-bold'>Descripcion:</p>
        <p>` + product.description + `</p>
        <p class='fw-bold'>Categoria:</p>
        <p>` + product.category + `</p>
        <p class='fw-bold'>Cantidad de Vendidos:</p>
        <p>` + product.soldCount + `</p>
        <p class='fw-bold'>Imagenes Ilustrativas:</p>        
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <img class="img-fluid resize-image center-block" src="`+ product.images[0] +`" /> 
                </div>
                <div class="col-md-3">
                    <img class="img-fluid resize-image center-block" src="`+ product.images[1] +`" /> 
                </div>
                <div class="col-md-3">
                    <img class="img-fluid resize-image center-block" src="`+ product.images[2] +`" /> 
                </div>
                <div class="col-md-3">
                    <img class="img-fluid resize-image center-block" src="`+ product.images[3] +`" /> 
                </div>
            </div>    
        </div>
        <br>`;

    document.getElementsByTagName('main')[0].innerHTML=htmlContentToAppend;

    getJSONData(PRODUCT_COMMENT).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            let data = resultObj.data;
            showProductComments(data);
        }
    });
}

function starsComment(score){
    let stars = "";
    for(i=1; i<=5; i++){
        if (i<=score){
            stars+=`<span class="fa fa-star checked"></span>`

        }else{
            stars+=`<span class="fa fa-star"></span>`
        }
    }
    return stars
}

function showProductComments(comments){
        
    let commentsHTML= "";

    for (comment of comments){        
        commentsHTML += `
            <div >
                <p>
                <span class= "fw-bold">`+comment.user+`</span>`+` - `+comment.dateTime + ` - ` + starsComment(comment.score) + `
                </p>
                <p>`+comment.description+`</p>
            </div>
            <hr/> 
        `
    }
    document.getElementsByTagName('main')[0].insertAdjacentHTML('beforeend', `
        <br>
        <div id = "productComments" class = "text-left p4">
            <h4>Comentarios</h4>
            <hr/>
            <p>`+commentsHTML+`</p>
        </div>`)
        
    addCommentForm();
}


function addCommentForm(){

    document.getElementsByTagName('main')[0].insertAdjacentHTML('beforeend', `
    <br>
        <div class="form-outline ">
        <h4>Comentar</h4>
        <h6>Tu nombre</h6>
        <input type="text" class="form-control w-50" id="nameComment">
        <br>
        <h6>Tu opinion</h6>
        <textarea class="form-control w-50" id="textComment" rows="4"></textarea>
        <br>
        <h6>Tu rating</h6>
        <select class="form-select w-50" id="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5" selected>5</option>
            </select>
        <br>
        <button type="button" class="btn btn-primary" id="commentSend">Enviar</button>
    </div>
    <hr/> 
    `)
    
    document.getElementById("commentSend").addEventListener('click',function(){
        let newName = document.getElementById("nameComment").value;
        let newCommentText = document.getElementById('textComment').value;
        let newRating = document.getElementById("rating").value;

        if (newName == ''){
            newName = 'Anonimo'
        }
        if (newCommentText==''){
            newCommentText = 'Sin comentarios'
        }
        
        let newDate = new Date();
        let newDateText = newDate.getFullYear()+'-'+newDate.getMonth()+'-'+newDate.getDate()+' '+newDate.getHours()+':'+newDate.getMinutes()+':'+newDate.getSeconds();

        document.getElementById('productComments').insertAdjacentHTML('beforeend', `
        <div>
            <p>
            <span class= "fw-bold">`+newName+`</span>`+` - `+newDateText + ` - ` + starsComment(newRating) + `
            </p>
            <p>`+newCommentText+`</p>
        </div>
        <hr/> 
    `)
    })


    getJSONData(PRODUCT_INFO).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            let data = resultObj.data;
            addRelatedProducts(data.relatedProducts);
        }
    });

}

function addRelatedProducts(products){

    let relatedProdHTML = '';

    for (product of products){
        relatedProdHTML += `
            <div class="col-lg-4 col-md-4 col-xs-4 thumb">
                <a id=`+product.id+` class="thumbnail" href="#" onclick="redirectProduct(this.id)">
                    <img class="img-fluid" src=`+product.image  +`>
                </a>
                <p class="text-center">`+product.name+`</p>
            </div>`
        }

        document.getElementsByTagName('main')[0].insertAdjacentHTML('beforeend', `
        <br>
        <p>Productos relacionados</p>
        <div class="row">`+relatedProdHTML+`</div>
        `)

}

function redirectProduct(relatedProdID){
    localStorage.setItem("prodID", relatedProdID);
    location.reload();
}

document.addEventListener("DOMContentLoaded", function(e){
    user();
    productID = localStorage.getItem('prodID');
    PRODUCT_INFO = PRODUCT_INFO_URL+productID+'.json';
    PRODUCT_COMMENT = PRODUCT_INFO_COMMENTS_URL+productID+'.json';
    
    getJSONData(PRODUCT_INFO).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            PRODUCT_INFO_DATA = resultObj.data;
            showProductInfo(PRODUCT_INFO_DATA);
        }
    });
    
    

})