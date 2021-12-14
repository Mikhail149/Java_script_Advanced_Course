const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'

const vue = new Vue({
    el: '#app',
    data: {
        goods: [],
        filterGoods: [],
        cart: [],
        cartSum: 0,
        searchText: '',
        isVisibleCart: false
    },
    methods: {
        loadGoods() {
            fetch(`${API_URL}catalogData.json`)
                .then((request) => request.json())
                .then((data) => {
                    this.goods = data;
                    this.filterGoods = data;
                });
        },
        addInCart(good) {
            let counter = 0;
            this.cart.forEach((goodInCart) => {
                if (good.id_product == goodInCart.id_product) {
                    counter++
                }
            })
            if (!counter) {
                good.quantity = 1;
                this.cart.push(good);
                this.cartSum += good.price * good.quantity;
            } else {
                this.changesInCart(good);
            }
        },

        dellInCart(good) {
            this.cart.splice(this.cart.indexOf(good), 1);
        },

        changesInCart(good, action = 'add') {
            switch (action) {
                case 'add':
                    this.cart[this.cart.indexOf(good)].quantity++;
                    break;
                case 'sub':
                    this.cart[this.cart.indexOf(good)].quantity--;
                    break;
                case 'dell':
                    this.cart[this.cart.indexOf(good)].quantity = 0;
                    break;
            }

            if (this.cart[this.cart.indexOf(good)].quantity == 0) {
                this.dellInCart(good);
            };

            this.cartSum = 0;
            this.cart.forEach((goodInCart) => {
                this.cartSum += goodInCart.price * goodInCart.quantity;
            })

        },
        onToggleCart() {
            this.isVisibleCart = !this.isVisibleCart;
        },
        onSearch() {
            console.log('ok');
            const reg = new RegExp(this.searchText, 'i')
            this.filterGoods = this.goods.filter((good) => reg.test(good.title))
        },
    },
    mounted() {
    },
    mounted() {
        this.loadGoods();
    }
});