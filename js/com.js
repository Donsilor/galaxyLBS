const url = "http://qkwl.tpddns.cn:8676";
const serverPath = url;


function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}


function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}


function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}


function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

const token = getCookie("token")
const userinfo = JSON.parse(getCookie("userinfo"))||{}

//const username = getCookie("username")
const tssotoken = getQueryString("tssotoken")
const ssoClientLogoutUrl = getCookie("ssoClientLogoutUrl")

function getSsoClient() {
    POST(URLs.ssoclient, {tssotoken: tssotoken}).then(function (res) {
        if (res.errcode !== 10001) {
            alert(res.msg)
        } else {
            console.log('===================', res.data)
            setCookie("ssoClientLogoutUrl", res.data.ssoClientLogoutUrl||'')
            setCookie("username", res.data.username||'')
            setCookie("tssotoken", tssotoken)

            ssoLogin(res.data.username) //内部登录
        }
    }).catch(function (error) {
        console.log(error)
    })
}

function ssoLogin(username) {
    const _username = username||getCookie("username")
    POST('/permission/user/login', {
        username: _username,
        password: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse("123"))
    }).then(function (res) {
        if (res.errcode !== 10001) {
            //alert(res.msg)
            const tssotoken = getCookie("tssotoken")
            if (ssoClientLogoutUrl != undefined && ssoClientLogoutUrl != "") {
                location.href = ssoClientLogoutUrl + "?tssotoken=" + tssotoken;
            } else {
                location.href = "login.html";
            }
        } else {
            setCookie("token", res.data.token)
            setCookie("userinfo", JSON.stringify(res.data))
            location.href = "realTimeMonitor.html"
        }
    }).catch(function (error) {
        console.log(error)
    })
}


const ax = axios.create({
        baseURL: url,
        timeout: 5000,
        headers: {
            token: token,
            userId: userinfo.userId,
            roleId: userinfo.roleId
        }
    }
);

function POST(url, data, config) {
    return ax.post(url, data, config || {}).then(function (response) {
        const data = response.data;
        if (data.errcode == 10012) {
            const ssoClientLogoutUrl = getCookie("ssoClientLogoutUrl")
            const tssotoken = getCookie("tssotoken")
            if (ssoClientLogoutUrl != undefined && ssoClientLogoutUrl != "") {
                location.href = ssoClientLogoutUrl + "?tssotoken=" + tssotoken;
            } else {
                location.href = "login.html";
            }
            return
        }
        return response.data
    })
}
function GET(url, data, config) {
    return ax.get(url, data, config || {})
}

function DownLoadURL(path) {
    return url + path
}


if (getQueryString("tssotoken") != undefined && getQueryString("tssotoken") != "") {
    this.getSsoClient()
}

// if (token == undefined || token == "") {
//     ssoLogin();
// }


const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})


function formatDateTime(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};


function format(now, format) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var monthStr = ""
    if (month > 9) {
        monthStr = "" + month
    } else {
        monthStr = "0" + month
    }
    //根据参数所传递的时间格式来进行具体的操作
    if (format == 'yyyy-mm') {
        return year + '-' + monthStr;
    }
}

function nDayBefore(n) {
    var date = new Date(new Date() - n * 30 * 24 * 60 * 60 * 1000);
    return format(date, 'yyyy-mm')
}

function formatDate(t) {
    return moment(t).format("YYYY-MM-DD hh:mm:ss")
}



function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
/**生成一个随机色**/
function randomColor(min, max) {
    var r = randomNum(min, max);
    var g = randomNum(min, max);
    var b = randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
}

/**绘制验证码图片**/
function drawPic(that, ctx, width, height) {
    //var ctx = wx.createCanvasContext('canvas');
    ctx.clearRect(0, 0, width, height)
    /**绘制背景色**/
    ctx.fillStyle = randomColor(180, 240); //颜色若太深可能导致看不清
    ctx.fillRect(0, 0, width, height)
    /**绘制文字**/
    var arr;
    var text = '';
    var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
    for (var i = 0; i < 4; i++) {
        var txt = str[randomNum(0, str.length)];
        ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
        ctx.font = randomNum(20, 26) + 'px SimHei'; //随机生成字体大小
        var x = 5 + i * 16;
        var y = randomNum(28, 20);
        var deg = randomNum(-20, 20);
        //修改坐标原点和旋转角度
        ctx.translate(x, y);
        ctx.rotate(deg * Math.PI / 180);
        ctx.fillText(txt, 5, 0);
        text = text + txt;
        //恢复坐标原点和旋转角度
        ctx.rotate(-deg * Math.PI / 180);
        ctx.translate(-x, -y);
    }
    /**绘制干扰线**/
    for (var i = 0; i < 2; i++) {
        ctx.strokeStyle = randomColor(40, 180);
        ctx.beginPath();
        ctx.moveTo(randomNum(0, 90), randomNum(0, 28));
        ctx.lineTo(randomNum(0, 90), randomNum(0, 28));
        ctx.stroke();
    }
    /**绘制干扰点**/
    for (var i = 0; i < 10; i++) {
        ctx.fillStyle = randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(randomNum(0, 90), randomNum(0, 28), 1, 0, 2 * Math.PI);
        ctx.fill();
    }
    that.text = text;
    // ctx.draw(false, function () {
    //     that.setData({
    //         text: text
    //     })
    // });
}