class GoodsItem {
    constructor(title, price, id) {
      this.title = title;
      this.price = price;
      this.id = id;
    }

    render() {
      return `<div class="goods-item"><img class="goods-img" src="img/dufault.jpg" alt="Изображение отсутствует"><h3 class="goods-head">${this.title}</h3><p>${this.price}</p><button class="button" id="${this.id}" type="button">Добавить</button></div>`;     
    }
}

class GoodsList {
    constructor() {
      this.goods = [];
    }

    fetchGoods() {
        this.goods = [
          { title: 'Shirt', price: 150, id: "good_1" },
          { title: 'Socks', price: 50, id: "good_2" },
          { title: 'Jacket', price: 350, id: "good_3" },
          { title: 'Shoes', price: 250, id: "good_4" }
        ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
          const goodItem = new GoodsItem(good.title, good.price, good.id);
          listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    costGoods() { //метод для подсчета суммарной стоимости всех товаров
      let cost = 0;
        this.goods.forEach(good => {
          cost += good.price;
        });      
        console.log(`Стоимость всех товаров = ${cost} `);
    }
    
}  

class BasketItem extends GoodsItem{
    constructor(title, price, id, count) {
      super(title, price, id);
      this.count = count;
    }

    render() { //метод для формирования html разметки карточки товара в корзине. С кнопками изменения количества товара (+, -) и кнопкой удаления товара из корзины
    
    }
}


class Basket {
  constructor(){
    this.goodsInBasket = [];
  }

  changeCountGoodInBasket(id){ //Метод изменени количества товара в корзине (если товар уже есть в корзине, но меняют его количство). На вход плучает id товара. Если после изменения количества оно равно 0, то вызываем метод удаления товара из корзины

  }

  costGoods() {  //метод для подсчета суммарной стоимости всех товаров в корзине

  }

  addBasket(id) { //метод для добавления товара в корзину. 

  }

  dellBasket(id) { //метод удаления товара из корзины

  }

  render(){ //метод для формирования html разметки для вывода содержимого корзины в документ.

  }

}



const list = new GoodsList();
list.fetchGoods();
list.render();
list.costGoods();