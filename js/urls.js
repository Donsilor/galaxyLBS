const URLs = {

    ssoclient: '/permission/user/ssoClientLogoutUrl', // 首页
    changePassword: '/permission/user/changePassword', // 首页

    index: '/resources/realtime/info', // 首页
    personName: '/resources/person/simple', // 人员姓名
    organization: '/resources/department/tree', // 人员结构 1
    getPerson: '/resources/person/getPerson', //获取人员信息 1
    addOrg: '/resources/department/add', // 添加部门 1
    delOrg: '/resources/department/delete', // 删除部门 1
    modifyOrg: '/resources/department/update', // 修改部门 1
    topPersons: '/resources/person/topPersons', // 顶级部门人员信息  1

    personnelList: '/resources/person/persons', // 人员信息列表 1
    addPerson: '/resources/person/add', // 添加人员 1
    modifyPerson: '/resources/person/update', // 修改人员信息 1
    delPerson: '/resources/person/delete', // 删除人员 1
    importExcel: '/resources/person/importExcel', // 批量上传 1

    updateSelectStatus: '/resources/person/updateSelectStatus', //修改人员选中状态 1

    level: '/resources/level/info', // 职位和级别
    fences: '/resources/fence/fences', // 获取所有围栏列表 1
    fenceAdd: '/resources/fence/add', // 新增围栏  1
    fenceDel: '/resources/fence/delete', // 删除围栏 1
    modifyFence: '/resources/fence/update', // 修改围栏信息 1
    strategyList: '/resources/strategy/strategies', // 策略列表 1
    strategyAdd: '/resources/strategy/add', // 添加策略 1
    strategyDel: '/resources/strategy/delete', // 删除策略 1
    strategyModify: '/resources/strategy/update', // 修改策略 1
    strategySwitch: '/resources/strategy/switch', // 策略开关 1
    allFilesImg: '/fastdfs/fdfs/files',  // 图片列表  1
    changeImg: '/fastdfs/fdfs/update', // 修改图片信息 1
    fdfsSwitch: '/fastdfs/fdfs/switch', // 地图启用开关 1

    downloadTemplate: '/fastdfs/fdfs/downloadTemplate', // 下载模板(人员导入的模板) 1
    delMap: '/fastdfs/fdfs/delete', // 删除地图文件 1
    upImg: '/fastdfs/fdfs/upload', // 图片上传 1
    departments: '/resources/department/departments', // 部门信息 1
    leafDepartmentList: '/resources/department/leafDepartmentList', // 查询叶子节点部门 1
    warnings: '/resources/warning/warnings', // 告警管理  1
    warningsAmount: '/resources/warning/amount', // 未处理告警数 1
    statistics: '/resources/warning/statistics', // 告警分类统计 1
    coordinates: '/resources/coordinate/coordinates', // 轨迹查询  1
    warningUpdate: '/resources/warning/update', // 告警处理 1
    warningCreateExcel: '/resources/warning/createExcel', //导出excel  1
    topWaringTimes: '/resources/warning/topWaringTimes', //按照时间维度  1
    topWaringPersons: '/resources/warning/topWaringPersons', //按照时间维度  1

    version: '/producer/upgrade/version', // 版本查询  1
    upgrade: '/producer/upgrade/update', // 版本升级
    login: '/permission/user/login', // 登录  1
    logout: '/permission/user/logout', // 退出  1
    groupFences: '/resources/fence/groupFences',

    menu: '/permission/menu/get', // 菜单  1

    call_list: '/resources/call/list', //点名 list  1
    call_add: '/resources/call/add', //新增电子点名策略  1
    call_update: '/resources/call/update', //更新电子点名策略  1
    call_delete: '/resources/call/delete', //删除电子点名策略  1
    call_switch: '/resources/call/switch', //切换电子点名策略状态  1

    call_realTimeCall: '/resources/call/realTimeCall', //一键点名  1

    attendance_list: '/resources/attendance/list', //查询考勤策略列表 list  1
    attendance_add: '/resources/attendance/add', //新增考勤策略  1
    attendance_update: '/resources/attendance/update', //更新考勤策略  1
    attendance_delete: '/resources/attendance/delete', //删除考勤策略  1
    attendance_switch: '/resources/attendance/switch', //切换考勤策略状态  1

    attendance_statistics: '/resources/attendance/statistics', //考勤统计 1



    absence_class_list: '/resources/absence/list', //查询缺勤分类集合 1
    attendance_attendanceRecordList: '/resources/attendance/attendanceRecordList', //查询考勤日志列表 1
    attendance_createExcel: '/resources/attendance/createExcel', //导出考勤记录 1





    disarming_disarmingList: '/resources/disarming/disarmingList', //查询撤防原因列表 list  1
    disarming_listDisarmingRecord: '/resources/disarming/listDisarmingRecord', //查询撤防历史记录 list  1
    disarming_add: '/resources/disarming/add', //新增撤防原因  1
    disarming_addDisarmingRecord: '/resources/disarming/addDisarmingRecord', //新增撤防记录  1
    disarming_update: '/resources/disarming/update', //更新撤防原因 1
    disarming_delete: '/resources/disarming/deleteDisarming', //删除撤防原因  1
    disarming_createExcel: '/resources/disarming/createExcel', //导出excel  1


}
const WEB_SOCKET_URL = 'ws://192.168.1.111:10003/coordinate/coors'
const WS_ALARM_URL = 'ws://192.168.1.111:10004/alarm/alarms'
