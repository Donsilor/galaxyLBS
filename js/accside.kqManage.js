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
        this.getTree()
    },
    methods: {
        filterNode: function (value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },

        checkChange: function (node, data) {
            const {checkedKeys, checkedNodes} = data;
            monitor.departmentCodeList = checkedKeys;
            monitor.getAttendanceStatistics()
        },

        getTree: function () {
            const that = this;
            POST(URLs.organization, {containsPerson: 0, username: userinfo.username}).then(function (res) {
                if (res.errcode !== 10001) {
                    alert(res.msg)
                } else {
                    that.organization = extraNode(res.data);
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
    }
})

