const routers = {
    realtime: {key: 'realtime', desc: '实时监控', path: 'realTimeMonitor.html', css: 'link_1'},
    playback: {key: 'playback', desc: '轨迹回放', path: 'trackPlayBack.html', css: 'link_2'},
    call: {key: 'call', desc: '电子点名', path: 'callTheRoll.html', css: 'link_3'},
    attendance: {key: 'attendance', desc: '自动考勤', path: 'kqManage.html', css: 'link_4'},
    alarm: {key: 'alarm', desc: '告警管理', path: 'alarmManage.html', css: 'link_5'},
    health: {key: 'health', desc: '健康管理', path: 'healthManage.html', css: 'link_6'},
    configuration: {key: 'configuration', desc: '系统管理', path: 'systemManage_peopleManage.html', css: 'link_7'}
};

var header = new Vue({
    el: '#fixed-top',
    data: {
        done: false,
        user: userinfo,
        menus: [],

        amount: 0,
    },
    computed: {
        currPath: function () {
            var path = document.location.pathname;
            if (path.startsWith("/galaxyLBS")) {
                path = path.replace('/galaxyLBS', '')
            }
            if (path.startsWith("/")) {
                path = path.replace('/', '')
            }
            return path
        }
    },
    mounted: function () {
      this.getWarningsAmount()
    },
    methods: {
        goToTrackPlayBack: function () {
            location.href = "trackPlayBack.html"
        },
        mounted: function () {
            console.log('=======header=======', userinfo)
        },
        getMenu: function () {
            const that = this;
            POST(URLs.menu, {
                username: userinfo.username || '',
            }).then(function (res) {
                if (res.errcode !== 10001) {
                    alert(res.msg)
                } else {
                    const menus = [];
                    const cf = res.data.menus || [];
                    for (var i = 0; i < cf.length; i++) {
                        menus.push(routers[cf[i]])
                    }
                    that.menus = menus;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },

        getWarningsAmount: function () {
            const that = this;
            POST(URLs.warningsAmount, {}).then(function (res) {
                if (res.errcode !== 10001) {
                    alert(res.msg)
                } else {
                    that.amount = res.data.amount
                }
            }).catch(function (error) {
                console.log(error);
            });
        },

        logout: function () {
            const that = this;
            POST(URLs.logout, {}).then(function (res) {
                if (res.errcode !== 10001) {
                    alert(res.msg)
                } else {
                    if (res.errcode !== 10001) {
                        alert(res.msg)
                    } else {
                        delCookie("token");
                        delCookie("userinfo");

                        const ssoClientLogoutUrl = getCookie("ssoClientLogoutUrl")
                        if (ssoClientLogoutUrl != undefined && ssoClientLogoutUrl != "") {
                            location.href = ssoClientLogoutUrl;
                        } else {
                            location.href = "login.html";
                        }
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        },

    }
});

if (userinfo.username != undefined && userinfo.username != "") {
    header.getMenu();
}
