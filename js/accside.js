//������
(function ($) {
    $.fn.input = function () {
        var iptlabel = $(this).find("input[for='label']");
        var iptvalue = $(this).find("input[for='value']");
        var ul = $(this).find('ul');
        var li = ul.find('li');
        var btn = $(this).find('.pubicon');
        iptlabel.click(function () {
            ul.show();
            return false;
        });

        btn.click(function () {
            ul.show();
            return false;
        });
        li.click(function () {
            iptlabel.val($(this).html());
            iptvalue.val($(this).attr("data"));
            ul.hide();
            return false;
        }).mouseover(function () {
            $(this).css({
                'background': '#008fe7',
                'color': '#fff'
            })
        }).mouseout(function () {
            $(this).css({
                'background': '#fff',
                'color': '#333'
            });
        });
        $(document).click(function () {
            ul.hide();
        });
    }
})(jQuery);

var width = $('.sel-boxone').find('input').width();
// $('.sel-boxone').find('ul').width(width+10);

$('#xclose').click(function () {
    $(this).parent().hide();
});


Vue.component('tree-menu', {
    props: ['item'],
    data: function () {
        return {
            visiable: false
        }
    },
    methods: {
        toggle: function () {
            this.visiable = !this.visiable;
        }
    },
    template: `
     <ul>
        <li>
            <div class="item">
                <a href="javascript:" class="switchBtn" @click="toggle"></a>
                <label><input type="checkbox">{{item.departmentName}}</label>
            </div>
            <ul v-show="visiable">
                <li v-for="child in item.children||[]"><tree-menu :item="child"></tree-menu></li>
                <li v-for="item in item.personList||[]"><div class="item" ><label><input type="checkbox">{{item.personName}}</label></div></li>
            </ul>
        </li>
     </ul>
    `
})


var side = new Vue({
    el: '#fixed-side',
    data: {
        organization: {}
    },
    methods: {
        getTree: function () {
            const that = this;
            POST(URLs.organization, {}).then(function (res) {
                if (res.errcode !== 10001) {
                    alert(res.msg)
                } else {
                    that.organization = res.data;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
    }
})

side.getTree()