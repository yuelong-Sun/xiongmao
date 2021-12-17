class Logon {
    constructor() {
        this.logonBtn()
        this.logonBlur()
    }
    // 注册点击事件
    logonBtn() {
        let that = this
        this._$('.logon-btn').onclick = function () {
            that.checkUser()
            that.checkPassword()
            that.checkEmail()
            if(that.checkUser() && that.checkPassword() && that.checkEmail()){
            location.href = './login.html'  
            }
        }


    }
    // 注册失去焦点事件
    logonBlur() {
        let that = this
        this._$('#username').onblur = function () {
            that.checkUser()
        }
        this._$('#password').onblur = function () {
            that.checkPassword()
        }
        this._$('#email').onblur = function () {
            that.checkEmail()
        }
    }
    // 用户名验证
    checkUser() {
        if (this._$('#username').value == '') {
            this._$('.userP').innerHTML = '用户名不能为空!'
            return false
        } else {
            this._$('.userP').innerHTML = ''
            return true
        }
    }
    // 密码验证
    checkPassword() {
        // 非空验证
        if (this._$('#password').value == '') {
            this._$('.passP').innerHTML = '密码不能为空!'
            return false
        } else {
            this._$('.passP').innerHTML = ''
        }
        // 密码格式验证
        let reg = /[a-z0-9]{6,}/
        if (!reg.test(this._$('#password').value)) {
            this._$('.passP').innerHTML = '密码必须是至少6位的字母和数字组合!'
            return false
        } else {
            this._$('.passP').innerHTML = ''
            return true
        }
    }
    // 邮箱验证
    checkEmail() {
        // 非空验证
        if (this._$('#email').value == '') {
            this._$('.emailP').innerHTML = '邮箱不能为空!'
            return false
        } else {
            this._$('.emailP').innerHTML = ''

        }
        // 邮箱格式验证
        let reg = /[_a-zA-Z0-9]+@[_a-zA-Z0-9]{2,}\.com$/
        if (!reg.test(this._$('#email').value)) {
            this._$('.emailP').innerHTML = '邮箱格式不正确'
            return false
        } else {
            this._$('.emailP').innerHTML = ''
            return true
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
new Logon