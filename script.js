

    //  SIGNUP      
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let signUpBtn = document.getElementById("signUpBtn");
    
// signUpBtn.addEventListener("click", registerInformation);
    
function registerInformation(event){
    event.preventDefault();
    let usernameValue = username.value;
    let emailValue = email.value;
    let passwordValue = password.value;
    let confirmPasswordValue = confirmPassword.value;
    
    let emailRegX = /^([\w\d]+)@([\w]+)\.([\w\.]+)$/;
    let passwordRegX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).{8,20}[\w\W]/;
         // + to combine
        //allowing special chars 1 by 1
        // $ ending the statement
        // {start, end} for range
        // add _@\s for spaces
        //allowing capital and noncapital letter on our input
        //[\w] for a-z, A-Z, 0-9
        //[\W] for special chars
        //[\d] for digits 0-9
    
        // for password
        // 1 = small char
        // 1 = big char
        // 1 = special char
        // 8-10 chars only
    
    if(emailValue.match(emailRegX)){
        alert("Valid Email");
    }else{
        alert("Invalid Email");
    }
    
    if(passwordValue.match(passwordRegX)){
        alert("Valid Password");
    }else{
        alert("Invalid Password");
    }
}
    
                // ONGOING FILTER
// let selectBtn = document.querySelector(".select-btn"),
//     items = document.querySelectorAll(".items");

// selectBtn.addEventListener("click", () => {
//     selectBtn.classList.toggle("open");
// });

// items.forEach(item => {
//     item.addEventListener("click", () => {
//         item.classList.toggle("checked");

//         let checked = document.querySelectorAll(".checked"),
//         btnText = document.querySelector(".btn-text");
        
//         if(checked && checked.length > 0){
//             btnText.innerHTML = `${checked.length} Selected`;
//         }else{
//             btnText.innerHTML = `Select Product`;
//         }
//     })
// });

//DISPLAY ALL PRODUCTS
document.addEventListener("DOMContentLoaded", function () {
    let prodDisplay = document.querySelector('#trial');

    fetch("./products.json")
    .then((res) => res.json())
    .then((data) => {
        const allProducts = data.products;
        
        for (const category in allProducts) {
            allProducts[category].forEach((product) => {
                displayProd(product);
            });
        }

        function displayProd(item) {
            let price = item.price.toLocaleString('en-PH', {
                style: 'currency',
                currency: 'PHP'
            });
            let display = `
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="card h-100"> 
                        <img src="${item.photo1}" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">${item.prodName}</h5>
                            PHP ${price}
                        </div>
                        <div class="card-footer text-center">
                            <button class="btn atc" id="addtocart" onclick="addCart('${item.prodName}', ${item.price}, '${item.photo1}')"><i class="fa-solid fa-plus"></i>Add to Cart</button>
                        </div>
                    </div>
                </div>`;
        
            prodDisplay.innerHTML += display;
        }

    })
    .catch(function (error) {
        console.error("Error fetching product data:", error);
    });
});

//CART

let cart = [];

if (localStorage.getItem("myCart")){
    cart = JSON.parse(localStorage.getItem("myCart"));
}

function addCart(prodName, prodPrice, prodImg) {
    alert("Sucessfully Added to Cart");
    cart.push({pName: prodName, pPrice: prodPrice, pImg: prodImg});

    localStorage.setItem("myCart", JSON.stringify(cart));
    
}

function displayCart(){
    let totalPrice = 0;
    let getCart = JSON.parse(localStorage.getItem("myCart"));
    let showItems = "";
    getCart.forEach(
        function(items, index){
            let price = items.pPrice.toLocaleString('en-PH', {
                style: 'currency',
                currency: 'PHP'
            });
            showItems = showItems +
            `<div class="cartitem" id="cartitem">
            <img src=${items.pImg} id="itemimage">
            <button onclick='remove(${index})' class="btn-close text-white" id="removebtn"></button>
            <h3 id="itemname">${items.pName}</h3>
            <p id="itemprice"> ${price}</p>
            <hr>
            </div>`;
            totalPrice += items.pPrice;
        }
    );
    let finalPrice = totalPrice.toLocaleString('en-PH', {
        style: 'currency',
        currency: 'PHP'
        });
    document.getElementById('cartlist').innerHTML = showItems;
    document.getElementById('total').innerHTML = finalPrice;
    document.getElementById('subtotal').innerHTML = finalPrice;
}
displayCart();

function remove(index){
    let getCart = JSON.parse(localStorage.getItem("myCart"));
    let removedItem = getCart.splice(index, 1)[0];
    localStorage.setItem("myCart", JSON.stringify(getCart));
    displayCart(); 
}

