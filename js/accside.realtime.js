var width = $('.sel-boxone').find('input').width();
// $('.sel-boxone').find('ul').width(width+10);

$('#xclose').click(function () {
    $(this).parent().hide();
});

function extraNode(node) {
    const dealNodes = []
    const tmpNode = {
        id: node.departmentCode,
        label: node.departmentName,
        departmentCode: node.departmentCode,
        departmentName: node.departmentName,
        children: [],
        isLeaf: false,
    }

    for (var i = 0; i < node.children.length; i++) {
        const tt = extraNode(node.children[i]);
        tmpNode.children = tmpNode.children.concat(tt)
    }

    if (node.personList != undefined) {
        for (var j = 0; j < node.personList.length; j++) {
            const d = node.personList[j];
            const tmpPersonNode = {
                id: d.personCode,
                label: d.personName,
                personCode: d.personCode,
                personName: d.personName,
                isLeaf: true,
            }
            tmpNode.children = tmpNode.children.concat(tmpPersonNode)
        }
    }
    dealNodes.push(tmpNode)
    return dealNodes;
}

var side = new Vue({
    el: '#fixed-side',
    data: {
        organization: [],
        filterText: '',
        defaultCheckedKeys: [],
        defaultExpandedKeys: [],
        defaultProps: {
            children: 'children',
            label: 'label',
            isLeaf: 'isLeaf',
        },
    },

    watch: {
        filterText: function (val) {
            this.$refs.tree2.filter(val);
        }
    },
    mounted: function () {
        console.log('==============', userinfo, userinfo.username!=undefined&& userinfo.username!="")
        if (userinfo.username!=undefined&& userinfo.username!=""){
            this.getTree()
        }
    },
    methods: {
        filterNode: function (value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        nodeClick: function (node) {
            console.log(node)
            if (!node.isLeaf) {
                return;
            }
            POST(URLs.getPerson, {
                personCode: node.personCode,
                tagId: '',
            }).then(function (res) {
                console.log('-----==', res.data)
                if (res.errcode !== 10001) {
                    alert(res.msg)
                } else {
                    monitor.selectNode = res.data;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        checkChange: function (node, data) {
            const {checkedKeys, checkedNodes} = data;
            const personCodeList = [];
            for (var i = 0; i < checkedNodes.length; i++) {
                var d = checkedNodes[i];
                if (d.isLeaf) {
                    personCodeList.push(d.id)
                }
            }
            const that = this;
            POST(URLs.updateSelectStatus, {
                personCodeList: personCodeList,
                selectedKeyList: checkedKeys,
                username: userinfo.username
            }).then(function (res) {
                if (res.errcode !== 10001) {
                    alert(res.msg)
                } else {
                    //console.log('-----==', res.data)
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        getTree: function () {
            const that = this;
            POST(URLs.organization, {containsPerson: 1, username: userinfo.username}).then(function (res) {
                if (res.errcode !== 10001) {
                    alert(res.msg)
                } else {
                    that.organization = extraNode(res.data);
                    that.defaultCheckedKeys = res.data.selectedKeyList;
                    that.defaultExpandedKeys = res.data.selectedKeyList;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
    }
})

