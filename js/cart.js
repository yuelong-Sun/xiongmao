class Cart {
  constructor() {
    this.getCartList()
    this.checkAll()
    this.cartNone()
    // 给tbody绑定点击事件
    this._$('#cartTable tbody').addEventListener('click', this.clickBubbleFn.bind(this))
    // 给tbody绑定输入事件
    this._$('#cartTable tbody').addEventListener('change', this.clickBubbleFn.bind(this))
  }
  // 判断操作节点来确定执行哪个方法
  clickBubbleFn(event) {
    let tar = event.target
    // 判断类名是否为check-one,是则执行其点击事件
    tar.classList.contains('check-one') && this.checkOne(tar)
    // 判断类名是否为add，是则执行其点击事件
    tar.classList.contains('add') && this.addNum(tar)
    // 判断类名是否为reduce，是则执行其点击事件
    tar.classList.contains('reduce') && this.reduceNum(tar)
    // 判断类名是否为deleteAll，是则执行其点击事件
    tar.classList.contains('delete') && this.delGoods(tar)
    // 判断类名是否为count-input，是则执行其输入事件
    tar.classList.contains('count-input') && this.changeNum(tar)
  }

  /***** 获取购物车数据并渲染到页面 *****/
  // 获取购物车数据
  async getCartList() {
    // 从localStorage里取出数据
    let cartGoods = JSON.parse(localStorage.getItem('CART'))
    // console.log(cartGoods)
    // 没有数据则终止
    if (!cartGoods) return
    // 有数据就发送ajax获取全部商品数据
    let results = await axios.get({
      url: 'http://www.xiongmaoyouxuan.com/api/tab/1'
    })
    let goodsData = results.data.items.list
    // console.log(goodsData)
    // 遍历所有商品数据，获取跟localStorage里id一样的商品的id
    let existCartGoods = goodsData.filter(item => {
      // console.log(item.id)
      // console.log(cartGoods[item.id])
      return cartGoods[item.id]
    })
    this.loadCartList(existCartGoods, cartGoods)
  }
  // 渲染购物车列表到页面
  loadCartList(goodsData, cg) {
    let html = ''
    // 循环商品数据
    goodsData.forEach(item => {
      html +=
                `
                  <tr good-id="${item.id}">
                    <td class="checkbox">
                      <input class="check-one check" type="checkbox" />
                    </td>
                    <td class="goods">
                      <img src="${item.image}" alt="" />
                      <span>${item.title}</span>
                    </td>
                    <td class="price">${item.price}</td>
                    <td class="count">
                      <span class="reduce iconfont icon-jianhao"></span>
                      <input class="count-input" type="text" value="${cg[item.id]}" />
                      <span class="add iconfont icon-jiahao"></span>
                    </td>
                    <td class="subtotal">${item.price * cg[item.id]}</td>
                    <td class="operation">
                      <span class="delete">删除</span>
                    </td>
                  </tr>
                `
    })
    this._$('#cartTable tbody').innerHTML = html
  }

  /***** 单选全选框功能及数量价格功能实现 *****/
  // 全选框功能
  checkAll() {
    // 找到所有全选框节点
    let allBox = this.$$('.check-all')
    // 给全选框按钮绑定事件，使用bind改变this指向
    allBox[0].addEventListener('click', this.allClickFn.bind(this, 1))
    allBox[1].addEventListener('click', this.allClickFn.bind(this, 0))
  }
  // 全选框点击
  allClickFn(checkAllIndex, event) {
    // 获取点击的全选框的状态
    let status = event.target.checked
    // 设置另一个全选框和点击的全选框为相同的状态
    this.$$('.check-all')[checkAllIndex].checked = status
    // 设置所有单选框和两个全选框为相同的状态
    this.$$('.check-one').forEach(item => {
      item.checked = status
    })
    // 调用统计选中后商品价格和数量
    this.subTotal(status)
  }
  // 单选框功能
  checkOne(target) {
    // 调用统计选中后商品价格和数量
    this.subTotal()
    // 如果单选框没有全选中，则两个全选框状态也为false
    if (!target.checked) {
      this.$$('.check-all')[0].checked = false
      this.$$('.check-all')[1].checked = false
    }
    // 如果单选框全选中，则两个全选框状态也为true
    let count = 0
    this.$$('.check-one').forEach(item => {
      item.checked && count++
    })
    if (count == this.$$('.check-one').length) {
      this.$$('.check-all')[0].checked = true
      this.$$('.check-all')[1].checked = true
    }
  }
  // 统计价格和数量
  subTotal(status = true) {
    // console.log(a)
    let totalNum = 0,
      totalPrice = 0
    status && this.$$('.check-one').forEach(item => {
      if (item.checked) {
        // 获取tr
        let tr = item.parentNode.parentNode
        // 获取数量和小计
        totalNum += (tr.querySelector('.count-input').value - 0 )
        totalPrice += (tr.querySelector('.subtotal').innerHTML- 0 )
        // console.log(totalPrice)
      }
    })
    // 将数量和小计加载到页面
    this._$('#selectedTotal').innerHTML = totalNum
    this._$('#priceTotal').innerHTML = totalPrice.toFixed(1)
  }

  /***** 增加减少删除商品及输入商品数量和修改相应local数据 *****/
  // 增加商品数量
  addNum(target) {
    // 获取数量的节点，也就是增加按钮的上一个兄弟节点
    let num = target.previousElementSibling
    // 让数量的值加1
    num.value = num.value - 0 + 1
    // 获取小计，单价乘以数量
    let sub = target.parentNode.nextElementSibling
    let price = target.parentNode.previousElementSibling.innerHTML
    sub.innerHTML = (num.value * price).toFixed(1)
    // 当这个商品是被选中时，调用统计价格和数量
    let tr = target.parentNode.parentNode
    tr.querySelector('.check-one').checked && this.subTotal()
    // 修改local数据
    this.modifyLocal(tr.getAttribute('good-id'), num.value)
  }
  // 减少商品数量
  reduceNum(target) {
    // 获取数量的节点，也就是增加按钮的下一个兄弟节点
    let num = target.nextElementSibling
    // 让数量的值减1，但是最小为1
    num.value = num.value - 0 - 1
    if (isNaN(num.value) || num.value < 1) {
      num.value = 1
    }
    // 获取小计，单价乘以数量
    let sub = target.parentNode.nextElementSibling
    let price = target.parentNode.previousElementSibling.innerHTML
    sub.innerHTML = (num.value * price).toFixed(1)
    // 当这个商品是被选中时，调用统计价格和数量
    let tr = target.parentNode.parentNode
    tr.querySelector('.check-one').checked && this.subTotal()
    // 修改local数据
    this.modifyLocal(tr.getAttribute('good-id'), num.value)
  }
  // 删除商品
  delGoods(target) {
    let that = this
    let tr = target.parentNode.parentNode
    layer.open({
      title: '确认删除框',
      content: '确认删除该商品吗？',
      btn: ['取消', '确认'],
      btn2: function (index, layero) {
        tr.remove()
        // 处于选中状态，则重新计算总价和数量
        tr.querySelector('.check-one').checked && that.subTotal()
        // 修改local数据
        that.modifyLocal(tr.getAttribute('good-id'))
        that.cartNone()
      }
    })
  }
  // 商品数量输入
  changeNum(target) {
    let num = target.value
    // 不能输入非数字或小于0的数字
    if (isNaN(num) || num <= 0) {
      alert('数量必须是大于0的数字!')
      let tr = target.parentNode.parentNode
      tr.remove()
      num = 0
    }
    // 获取数量和小计
    let tr = target.parentNode.parentNode
    let singlePrice = tr.querySelector('.price').innerHTML
    let subTotal = (singlePrice * num).toFixed(1)
    tr.querySelector('.subtotal').innerHTML = subTotal
    this.subTotal()
    // 修改数据
    this.modifyLocal(tr.getAttribute('good-id'), num)
    this.cartNone()
  }
  // 修改localStorage里数据
  modifyLocal(id, num = 0) {
    // console.log(id, num)
    // 取出local数据
    let cartGoods = JSON.parse(localStorage.getItem('CART'))
    // 没有数据就终止
    if (!cartGoods) return
    num == 0 && delete cartGoods[id]
    num != 0 && (cartGoods[id] = num)
    // console.log(cartGoods[id],num)
    // 修改后重新设置local
    localStorage.setItem('CART', JSON.stringify(cartGoods))
  }
  // 购物车无数据显示
  cartNone(){
    let cartGoods = localStorage.getItem('CART')
    let arr = Object.keys(cartGoods)
    if(arr.length > 2){
      // console.log('111')
      this._$('#cartNone').style.display = 'none'
    }else if(arr.length <= 2){
      this._$('#cartNone').style.display = 'block'
      // console.log('222')
    }
  }

  //获取节点方法
  _$(ele) {
    return document.querySelector(ele)
  }
  $$(ele) {
    return document.querySelectorAll(ele)
  }
}

new Cart