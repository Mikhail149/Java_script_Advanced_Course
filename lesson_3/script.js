const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const API_Data = '/catalogData.json';
const API_Basket = '/getBasket.json';
const API_AddBasket = '/addToBasket.json';
const API_DelBasket = '/deleteFromBasket.json';

function makeGETRequest(url, callback) {
  var xhr;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  }
  xhr.open('GET', url, true);
  xhr.send();
}


class GoodsItem {
  constructor(product_name, price, id_product) {
    this.product_name = product_name;
    this.price = price;
    this.id_product = id_product;
  }

  render() {
    return `<div class="goods-item"><img class="goods-img" src="img/dufault.jpg" alt="Изображение отсутствует"><h3 class="goods-head">${this.product_name}</h3><p>${this.price}</p><button class="button add_button" onclick="f1(event)" id="GodID_${this.id_product}" type="button">Добавить</button></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods(cb) {
    makeGETRequest(`${API_URL}${API_Data}`, (goods) => {
      this.goods = JSON.parse(goods);
      cb();
    })

  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  //метод для подсчета суммарной стоимости всех товаров
  costGoods() {
    let cost = 0;
    this.goods.forEach(good => {
      cost += good.price;
    });
    console.log(`Стоимость всех товаров = ${cost} `);
  }
  //Метод поиска объекта в массиве объектов по id.
  search(id_product) {
    let product = {};
    this.goods.forEach(good => {
      if (good.id_product == id_product) {
        product = good;
      }
    });
    return (product);
  }
}

class CartItem extends GoodsItem {
  constructor(product_name, price, id_product, count = 1) {
    super(product_name, price, id_product);
    this.count = count;
  }
  //метод для формирования html разметки карточки товара в корзине. С кнопками изменения количества товара (+, -) и кнопкой удаления товара из корзины (все это можно заменить в одну длинную строчу как в методе товаров)
  render() {
    //Создание карточки товара
    let cartItem = document.createElement("div");
    cartItem.className = `cart_item cart_item-${this.id_product}`;
    let cartItemHead = document.createElement("h3");
    cartItemHead.innerText = this.product_name;
    cartItem.append(cartItemHead);
    //Формирование и вывод в карточку товара названия товара
    let price = document.createElement("p");
    price.innerText = this.price;
    cartItem.append(price);
    //Формирование и вывод в карточку товара кнопки уменьшения количества товара в корзине
    let anSub = document.createElement("button");
    anSub.innerHTML = `-`;
    anSub.setAttribute('id', `cartItemCount-sub-${this.id_product}`);
    anSub.setAttribute('class', `butChange`);
    anSub.onclick = this.f3.bind(this);
    cartItem.append(anSub);
    //Формирование и вывод в карточку товара количества товара
    let countDiv = document.createElement("div");
    let count = document.createElement("p");
    count.innerText = this.count;
    count.className = "count_item";
    count.setAttribute('id', `cartItemCount-${this.id_product}`);
    countDiv.append(count);
    cartItem.append(count);
    //Формирование и вывод в карточку товара кнопки увеличения количества товара в корзине
    let anAdd = document.createElement("button");
    anAdd.innerHTML = `+`;
    anAdd.setAttribute('id', `cartItemCount-add-${this.id_product}`);
    anAdd.setAttribute('class', `butChange`);
    anAdd.onclick = this.f3.bind(this);
    cartItem.append(anAdd);
    //Формирование и вывод в карточку товара
    let costItem = document.createElement("p");
    costItem.innerText = this.count * this.price;
    costItem.setAttribute('id', `cartItemCost-${this.id_product}`);
    cartItem.append(costItem);
    //Формирование и вывод в карточку товара кнопки удалния товара из корзины
    let delItem = document.createElement("button");
    delItem.innerText = `X`;
    delItem.onclick = this.f3.bind(this);
    delItem.setAttribute('id', `cartItemCount-dell-${this.id_product}`);
    delItem.setAttribute('class', `butChange`);
    cartItem.append(delItem);

    return cartItem;
  }
  //Функция обработки события. Берет id элемента и выделяет из неко id товара и ключ операции и вызывает функцию изменения корзины
  f3(e) {
    let split = e.target.id.split('-');
    cart.changeCountGoodInCart(split[2], split[1]);
  }

}
//Класс корзины
class Cart {
  constructor() {
    this.goodsCart = [],
      this.cost = 0
  }

  //Метод изменениz количества товара в корзине 
  // (если товар уже есть в корзине, то меняют его количство). 
  // На вход плучает id товара. Если после изменения количества оно равно 0, 
  // то вызываем метод удаления товара из корзины
  changeCountGoodInCart(id_product, change = 'add') {
    let item = document.querySelector(`#cartItemCount-${id_product}`);
    this.goodsCart.forEach(goodCart => {
      if (goodCart.id_product == id_product) {
        switch (change) {
          case 'add':
            goodCart.count++;
            break;
          case 'sub':
            goodCart.count--;
            break;
          case 'dell':
            goodCart.count = 0;
            break;
        };
        if (goodCart.count != 0) {
          item.innerText = goodCart.count;
          document.querySelector(`#cartItemCost-${id_product}`).innerHTML = goodCart.count * goodCart.price;
        } else {
          this.dellInCart(goodCart);
        }
      }
      this.costGoods();
    });
  }
  //метод для подсчета суммарной стоимости всех товаров в корзине
  costGoods() {
    let cust = 0;
    this.goodsCart.forEach(goodCart => {
      cust += goodCart.count * goodCart.price;
    });
    if (cust != 0) {
      document.querySelector(`.costCartSum`).innerHTML = `Стоимость товаро в корзине = ${cust}`;
    } else {
      document.querySelector(`.costCartSum`).innerHTML = `Пока в корзине нет товаров`;
    }
  }
  //метод добавления товара в корзину. 
  addInCart(good) {
    let index = this.goodsCart.findIndex((item) => item.id_product == good.id_product); //Ищем товар в корзине
    console.log(index);
    if (index >= 0) { //если товар в корзине есть, то вызываем изменения
      this.changeCountGoodInCart(good.id_product);
    } else {  //Иначе вызываем рендер товара
      this.render(good);
    }
    this.costGoods();
  }
  //метод удаления товара из корзины
  dellInCart(deletedGood) {
    document.querySelector(`.cart_item-${deletedGood.id_product}`).remove();    //Удаляем карточку корзины с экрана
    this.goodsCart.splice(this.goodsCart.indexOf(deletedGood), 1)       //Удаляем товар из корзины
  }
  //метод для формирования html разметки для вывода объекта корзины в документ.
  render(goodCart) {
    let cart = document.querySelector(".cart");
    const goodItem = new CartItem(goodCart.product_name, goodCart.price, goodCart.id_product);
    this.goodsCart.push(goodItem);
    cart.append(goodItem.render());
  }
}

const list = new GoodsList();
list.fetchGoods(() => {
  list.render();
  list.costGoods();
});

let cart = new Cart();
//Событие кнопок добавить. Выделяет id товара ищет этот товар в списке товаров и запускает метод корзины на добавление товара в корзину
function f1(event) {
  let id_product = event.target.id;
  id_product = id_product.split('_');
  let good = list.search(id_product[1]);
  cart.addInCart(good);
}
//После вывода товаров ищет все кнопки "добавить" и вешает на них событие.