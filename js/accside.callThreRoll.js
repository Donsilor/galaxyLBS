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

        disarmingList: [],
        disarmingTimeOptions: [
            {key: '30min', value: 30},
            {key: '1h', value: 60},
            {key: '2h', value: 120},
            {key: '3h', value: 180},
            {key: '5h', value: 300},
            {key: '24h', value: 1440},
        ],

        disarmingId: '',
        duration: 0,
        startTime: '',
        endTime: '',

        personsList: [],
    },

    watch: {
        filterText: function (val) {
            this.$refs.tree2.filter(val);
        }
    },
    mounted: function () {
        this.getTree()
        this.getDisarmingList();

        console.log('================', this.startTime)
    },
    methods: {
        filterNode: function (value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },

        checkChange: function (node, data) {
            const {checkedKeys, checkedNodes} = data;
            const personsList = [];
            for (var i = 0; i < checkedNodes.length; i++) {
                var d = checkedNodes[i];
                if (d.isLeaf) {
                    personsList.push(d)
                }
            }
            this.personsList = personsList;
        },

        getTree: function () {
            const that = this;
            POST(URLs.organization, {containsPerson: 1, username: userinfo.username}).then(function (res) {
                if (res.errcode !== 10001) {
                    alert(res.msg)
                } else {
                    that.organization = extraNode(res.data);
                }
            }).catch(function (error) {
                console.log(error);
            });
        },

        getDisarmingList: function () {
            const that = this;
            POST(URLs.disarming_disarmingList, {}).then(function (res) {
                if (res.errcode !== 10001) {
                    //alert(res.msg)
                    that.disarmingList = [];
                } else {
                    that.disarmingList = res.data || [];
                }
            }).catch(function (error) {
                console.log(error);
            });
        },


        addDisarmingList: function () {
            console.log('==================', this.personsList, this.startTime, this.startTime==null, this.endTime==null)
            const that = this;
            const disarmingNameMatch = function (id) {
                for (var i = 0; i < that.disarmingList.length; i++) {
                    if (id == that.disarmingList[i].disarmingId) {
                        return that.disarmingList[i].disarmingName
                    }
                }
            }


            POST(URLs.disarming_addDisarmingRecord, {
                disarmingId: that.disarmingId,
                disarmingName: disarmingNameMatch(that.disarmingId),
                startTime: (that.startTime!=null&&that.startTime!='')?that.startTime.getTime():'',
                endTime: (that.endTime!=null&&that.endTime!='')?that.endTime.getTime():'',
                personList: that.personsList,
                // departmentCode: '',
                // departmentName: '',
                username: userinfo.username,
                disarmingTime: that.duration||'',
            }).then(function (res) {
                if (res.errcode !== 10001) {
                    that.$message({
                        message: res.msg,
                        type: 'error'
                    });
                } else {
                    that.$message({
                        message: res.msg,
                        type: 'success'
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
    }
})

