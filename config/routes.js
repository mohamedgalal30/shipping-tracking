module.exports.routes = {
    'get /tasks': 'TaskController.index',
    'put /tasks/:id/edit_status': 'TaskController.updateStatus',
    'get /*': {
        controller: 'HomeController',
        action: 'homepage',
        skipAssets: true,
    }
};
