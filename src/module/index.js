'use strict';

module.exports = (router) => {
    require('./user/user.ctrl')(router);
    require('./company/company.ctrl')(router);
    require('./order/order.ctrl')(router);
    require('./item/item.ctrl')(router);
    require('../services/auth/auth.ctrl')(router);
    require('./common/Error404')(router);
};