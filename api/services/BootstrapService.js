

module.exports = {
    
    init: function () {
        process.title = 'shipping-tracking';
        // promises.push(RPCService.init()
        this.initGlobals()
        return TaskService.initTasks()
        
    },
    initGlobals: function () {
        global.Promise = require('bluebird');
        global._ = require('lodash')
        global.constants = sails.config.constants
        global.appRoot = process.cwd()
    },

}
