//div внутри корзины, в который мы добавляем товары
const btnDelete = document.querySelector(".button_delete")
const cartWrapper = document.querySelector(".cart-wrapper")
const btnKorsina = document.querySelector(".korsina");
const btnHider = document.querySelector(".drop_menu");
const btnOtpravka = document.querySelector(".dostavka_form_button");
                                       

let productArray = [];


const btn = document.querySelector(".button_hidden");



btnKorsina.addEventListener("mouseenter",(event)=> {

    btnHider.style.display="block";
});

btnHider.addEventListener("mouseleave",(event)=> {
    btnHider.style.display="none";
});


// Добавляем прослушку на всем окне
window.addEventListener("click", (event) => {
    
    //Проверяем является ли элемент по которому был совершен клик кнопкой Плюс
    if (event.target.dataset.action === "plus") {
        
    //Ищем родительский элемент , обёртку
      const itog = event.target.closest(".knopki");
     //Ищем нужный элемент внутри родителя 
      const chetchick = itog.querySelector("[data-counter]");

      chetchick.innerText = ++chetchick.innerText;
      
    }

   

    
    //Проверяем является ли элемент по которому был совершен клик кнопкой Минус
    if (event.target.dataset.action === "minus") {
        
        const itog = event.target.closest(".knopki");
        //Ищем нужный элемент внутри родителя 
         const chetchick = itog.querySelector("[data-counter]");
        // Переводим строчное значение в целое число parseInt
         if (parseInt(chetchick.innerText) > 1) {

            chetchick.innerText = --chetchick.innerText;
         }
   
    }
    //Проверяем клик на + или - внутри корзины для функции calcCartPrice();
    if (event.target.dataset.action && event.target.closest(".cart-wrapper")) {
         calcCartPrice();
         updateStorage();
    }

    // Удаление товара из корзины
    if (event.target.dataset.action === "button_del") {
		
		
		if (event.target.closest(".cart-wrapper")) {
			event.target.closest(".cart-item").remove();
            calcCartPrice();
            updateStorage();
		}
	
	}

    //Ищем атрибут корзину с названием data-cart
    if (event.target.hasAttribute("data-cart")) {
        //Находим карточку с товаров, Внутри которой был совершен клик
       const menu = event.target.closest(".menu");
       
       //Собираем данные с этого товара и записываем их в единый обьект productInfo
       const productInfo = {
           id: menu.dataset.id,
           imgSrc: menu.querySelector(".product-img").getAttribute("src"),
           title: menu.querySelector(".tovar-menu").innerText,
           price: menu.querySelector(".chena-menu").innerText,
           counter: menu.querySelector(".itog").innerText,
           weight: menu.querySelector(".cart-item__weight").innerText,

       };
       // Проверяем есть такой товар уже в корзине
       const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
       //Если товар есть в корзине
       if (itemInCart ) {
           const counterElement = itemInCart.querySelector("[data-counter]");
           counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
           updateStorage();
           
       } else {
        
           //Если товара нет в корзине

      

       // переносим Корзину в js чтобы поменять значения шаблона на значения productInfo
      const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
      <div class="cart-item__top">
          <div class="cart-item__img">
              <img src="${productInfo.imgSrc}" alt="">
          </div>
          <div class="cart-item__desc">
              <div class="cart-item__title">${productInfo.title}</div>
              <div class="cart-item__weight">${productInfo.weight}</div>
              <div class="tovarAndPrice">
                    <div class="price">${productInfo.price}</div>
                <div class="knopki">                        
                      <div class="minus" data-action="minus">-</div>
                      <div class="itog" data-counter="">${productInfo.counter}</div>
                      <div class="plus" data-action="plus">+</div>
                      <a><img class="button_del" data-action="button_del" src="img/корзинаУдаление.png"  width="20" height="20"" alt=""></a>
              </div>
         </div>
            

          </div>
      </div>
  </div>`;

  
       //Отображаем товар в корзине
       cartWrapper.insertAdjacentHTML("beforeend", cartItemHTML);
     
       updateStorage();
      
       
    }
//Сбрасываем счётчтик добавленного товара на 1
    menu.querySelector("[data-counter]").innerText = "1";
    
    calcCartPrice();
    
  } 
});

//Калькулятор прайса
function calcCartPrice() {
const cartWrapper = document.querySelector(".cart-wrapper");
const priceElements = cartWrapper.querySelectorAll(".price");
const totalPriceEl = document.querySelector(".total_summ");  
const cartItems = document.querySelectorAll(".cart-item");

let totalPrice = 0;

cartItems.forEach(function (item) {

    
 
 const amountEl = item.querySelector("[data-counter]");
 const priceEl = item.querySelector(".price");

 const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText); 
 
 totalPrice += currentPrice;

 
});
 totalPriceEl.innerText = totalPrice;
 
};
// добавление корзины в localStorage

const initialState = () => {
    if (localStorage.getItem("product") !== null) {
        cartWrapper.innerHTML = localStorage.getItem("product");
        calcCartPrice();
    }

};

initialState();

const updateStorage = () => {
    let parent = cartWrapper;
    let html = parent.innerHTML;
    html = html.trim();
    localStorage.setItem("product",html);
    

    if (html.length) {
        localStorage.setItem("product", html);
        } else {
        localStorage.removeItem("product");
    }

};



//Отправка товаров в массив
btnOtpravka.addEventListener("click", (event) => {

        const cartItems = document.querySelectorAll(".cart-item");
        cartWrapper
    
      cartItems.forEach(function(item) {
            
          const titleK =  item.querySelector(".cart-item__title").textContent;
          const counterK = item.querySelector("[data-counter]").textContent +` Кол-во`;
          const priceElements = item.querySelector(".price").innerText;
         
          let obj = {};
        obj.title = titleK;
        obj.counter = counterK;
        obj.price = priceElements;

        productArray.push(obj); 
        
        
        
       }); 
            fetch("http://localhost:3000/requests", {
            method: "POST",
            body: JSON.stringify(productArray),
            headers: {
                "Content-type": "application/json"
            }
        
        })
      .then(response => response.json())
           
    });

       
   