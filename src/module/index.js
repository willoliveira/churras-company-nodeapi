'use strict';

module.exports = (router) => {
    require('./user/user.ctrl')(router);
    require('./company/company.ctrl')(router);
    require('./common/Error404')(router);
};