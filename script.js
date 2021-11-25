const goods = [
    { title: 'Shirt', price: 150, id: "goog_1" },
    { title: 'Socks', price: 50, id: "goog_2" },
    { title: 'Jacket', price: 350, id: "goog_3" },
    { title: 'Shoes', price: 250, id: "goog_4" }
];

const $goodsList = document.querySelector('.goods-list');
  
const renderGoodsItem = ({ title, price, id }) => {
    return `<div class="goods-item"><img class="goods-img" src="img/dufault.jpg" alt="Изображение отсутствует"><h3 class="goods-head">${title}</h3><p>${price}</p><button class="button" id="${id}" type="button">Добавить</button></div>`;
};
  
const renderGoodsList = (list = goods) => {
    let goodsList = list.map(
            (item) =>  {
                return renderGoodsItem(item)
            }
        ).join('');

    $goodsList.insertAdjacentHTML('beforeend', goodsList);
}
  
renderGoodsList();


