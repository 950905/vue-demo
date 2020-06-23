const HOST = require('../api.js');

/*
* SOURCEAPI 为node的API
*
* OUTSIDEAPI 为内部转发API
*
* */

module.exports = {
  OUTSIDEAPI: {
    // 获取用户信息
    getUserInfo: HOST.USER_INFO + '/api/user/currentUser',
    // 获取保单列表
    getOrderList: HOST.POLICY_API + '/neo-order-system/bnail/list',
    // 获取订单详情
    getOrderDetail: HOST.POLICY_API + '/neo-order-system/bnail/detail'

  },
  SOURCEAPI: {
    getUserInfo: '/api/user/currentUser',
    getOrderList: '/bnail/list',
    getOrderDetail: '/bnail/detail/:orderCode'
  }
}
