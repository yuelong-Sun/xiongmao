class Index {
    constructor() {
        this.banner()
        this.tabLink()
        this.showGoods()
        this.loadMore()
        this.backTop()
    }

    轮播实现
    async banner() {
        let results = await axios.get({
            url: 'http://www.xiongmaoyouxuan.com/api/tab/1',
        })
        if (results.code == 200) {
            // console.log(results)
            // 获取轮播图数据
            let bannerList = results.data.banners
            // console.log(bannerList)
            // 用模板引擎渲染轮播图
            let htmlStr = template('banner-list-temp', {
                bannerList
            })
            this._$('.swiper-wrapper').innerHTML = htmlStr
            new Swiper('.swiper-container', {
                direction: 'horizontal',
                loop: true, // 循环模式选项

                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },

                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                autoplay: {
                    delay: 2000,
                    autoplayDisableOnInteraction: false,
                }
            })
        }

    }
    // 选项卡连接图渲染
    async tabLink() {
        let results = await axios.get({
            url: 'http://www.xiongmaoyouxuan.com/api/tab/1',
        })
        if (results.code == 200) {
            // console.log(results)
            // 获取轮播图下面选项卡数据
            let bannerBottomList = results.data.gridsV2
            // 截取两条数据
            let newBannerBottomList = bannerBottomList.splice(1, 2)
            let data = {
                newBannerBottomList
            }
            // console.log(data)
            // 用模板引擎渲染轮播图
            let htmlStr = template('banner-bottom-temp', data)
            this._$('.banner-bottom-left').innerHTML = htmlStr
        }
    }
    // 渲染商品列表
    async showGoods(pageNo) {
        let results = await axios.get({
            url: 'http://www.xiongmaoyouxuan.com/api/tab/1/feeds',
            data: {
                start: pageNo * 20
            }
        })
        if (results.code == 200) {
            // console.log(results)
            // 获取商品列表数据
            let goodList = results.data.list
            // console.log(goodList)
            // 遍历追加渲染到页面
            let htmlStr = ''
            goodList.forEach(item => {
                htmlStr +=
                    `
                    <li class="items" >
                        <div>
                            <img src="${item.image}" alt="" onclick="Index.toDetails(${item.id})">
                        </div>
                        <div class="cardBox">
                            <div class="productCard-title">${item.title}</div>
                            <div class="cardWord">
                                <span class="tMall">天猫</span>
                                <span class="postage">包邮</span>
                            </div>
                            <div class="cardBottom">
                                <div class="cardBottom-left">
                                    <span class="price">
                                        <span class="price-tag">￥</span>
                                        <span class="price-big">${item.price}</span>
                                    </span>
                                    <span class="saleNumber">${item.saleNum}人已买</span>
                                </div>
                                <div class="twoTicket">${item.couponValue}</div>
                                <span class="iconfont icon-gouwugouwuchedinggou" id="cart-font" onclick="Index.addCart(${item.id},1)"></span>
                            </div>
                        </div>
                    </li>
                    `
            })
            this._$('.productDetails').innerHTML += htmlStr
        }

    }
    // 点击加载更多
    loadMore() {
        let that = this
        // 初始商品数据分页
        let pageNo = 1
        // 点击分页加1
        this._$('.more-btn').onclick = function () {
            that.showGoods(++pageNo)
        }
    }
    // 回到顶部功能
    backTop() {
        let that = this
        // 滚动事件实现顶部按钮出现
        window.onscroll = function () {
            // 获取可视区域高度
            let clientHeight = document.documentElement.clientHeight
            // 获取滚动条高度
            let scHeight = document.documentElement.scrollTop || document.body.scrollTop
            if (scHeight <= clientHeight) {
                that._$('#toTop').style.display = 'none'
            } else {
                that._$('#toTop').style.display = 'block'
            }
        }
        // 点击按钮回到顶部
        this._$('#toTop').onclick = function () {
            // 设置定时器
            that.timer = setInterval(function () {
                // 获取当前滚动条高度
                let distNow = that._$('html,body').scrollTop
                // 回滚距离
                let dist = -100
                // 设置当前距离
                that._$('html,body').scrollTop = distNow + dist
                // 当前距离等于0则清除定时器
                if (distNow <= 0) {
                    clearInterval(that.timer)
                }
            }, 10)
        }
    }
    // 跳转详情页
    static toDetails(id) {
        // 根据商品id跳转详情页
        location.href = './details.html?id=' + id
    }
    // 加入购物车
    static addCart(id,num) {
        let cartGoods = JSON.parse(localStorage.getItem('CART'))
        console.log(cartGoods)
        if (!cartGoods) {
            cartGoods = {
                [id]: num
            }
            localStorage.setItem('CART', JSON.stringify(cartGoods))
        } else {
            for (let attr in cartGoods) {
                attr == id && (num = num + cartGoods[attr])
            }
            cartGoods[id] = num
            localStorage.setItem('CART', JSON.stringify(cartGoods))
        }
        location.href = './cart.html'
    }
    //获取节点方法
    _$(ele) {
        return document.querySelector(ele)
    }
    $$(ele) {
        return document.querySelectorAll(ele)
    }
}

new Index