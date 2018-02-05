'use strict';

module.exports = (router) => {
    require('./user/user.ctrl')(router);
    require('./company/company.ctrl')(router);
    require('./order/order.ctrl')(router);
    require('./order-item/order-item.ctrl')(router);
    require('./item/item.ctrl')(router);
    require('./common/Error404')(router);
};