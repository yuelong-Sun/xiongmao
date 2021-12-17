class Login {
    constructor() {
        this.toLogon()
        this.toIndex()
        this.scanCode()
        this.account()
    }
    // 登录跳转主页
    toIndex() {
        let that = this
        this._$('.login-btn').onclick = async function () {
            that.user = that._$('#username').value
            that.password = that._$('#password').value
            let data = await axios.post({
                url: './js/login.php',
                data: {
                    user: that.user,
                    password: that.password
                },
                dataType: ''
            })
            if (data == 1) {
                console.log(data);
                location.href = './index.html'
            } else if (that.user == '' && that.password == '') {
                alert('用户名或密码不能为空!')
            } else {
                alert('用户名或密码错误!')
            }
        }
    }
    // 扫码登录切换
    scanCode() {
        let that = this
        this._$('#code-login').onclick = function () {
            that._$('.twocode').classList.remove('off')
            that._$('.twocode').classList.add('on')
            that._$('form').classList.add('off')
            that._$('#loginFooter').classList.add('off')
            that._$('#code-login').classList.add('color-r')
            that._$('#id-login').classList.remove('color-r')
        }
    }
    // 账户登录切换
    account() {
        let that = this
        this._$('#id-login').onclick = function () {
            that._$('.twocode').classList.add('off')
            that._$('form').classList.remove('off')
            that._$('#loginFooter').classList.remo('off')
            that._$('#id-login').classList.add('color-r')
            that._$('#code-login').classList.remove('color-r')
        }
    }
    // 跳转注册页面
    toLogon() {
        this._$('#logon').onclick = function () {
            location.href = './logon.html'
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
new Login