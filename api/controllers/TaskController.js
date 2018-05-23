module.exports = {
    index(req, res) {
        const filter = permittedParams(req.query.filter, ["driverName", "courier", "status"]),
            sort = req.query.sort,
            page = req.query.page,
            limit = req.query.limit;

        return TaskService.search(filter, limit, page, sort)
            .then(result => res.ok(result))
            .catch(e => res.badRequest(e))
    },
    updateStatus(req, res) {
        let taskId = req.params.id;
        let status = req.body.status;

        return TaskService.updateStatus(taskId, status)
            .then(task => res.ok({ msg: 'Status Updated Successfully' }))
            .catch(err => res.badRequest(err));
    },

}

//private funcions
function permittedParams(params, permitted) {
    if (!_.isEmpty(params)) {
        return _.pick(params, permitted);
    }
    else return {}
}