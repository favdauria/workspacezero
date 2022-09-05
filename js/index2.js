document.addEventListener("DOMContentLoaded", function(){
    let userLi = document.createElement("li");
    let userA = document.createElement("a");
    let userName = document.createTextNode(localStorage.getItem('user'));
    userLi.className = 'nav-item';
    userA.className = 'nav-link active';
    userLi.appendChild(userA);
    userA.appendChild(userName);
    document.getElementById('navbarNav').getElementsByTagName('ul')[0].appendChild(userLi);
    
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});