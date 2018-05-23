module.exports = {
    search(filter, limit, page = 1, sort = 'deliveryDate DESC') {

        limit = limit || sails.config.appConfig.defaultPaginationLimit;
        const select = [
            "id",
            "courier",
            "driverName",
            "description",
            "status",
            "deliveryDate",
            "startedAt",
            "finishedAt",
            "driverComment",
            "fromLocation",
            "toLocation"
        ],
            where = prepareFilter(filter),
            promises = {};

        promises.list = Task.find({ where, select, sort })
            .paginate({ limit, page });

        promises.total = Task.count(where);

        return Promise.props(promises)
    },
    updateStatus(taskId, status) {
        //in case of task_Tag is  not found in the req Body
        if (!taskId || !status)
            return Promise.reject(new Error('missing params'))

        return Task.update({ id: taskId }, { status })
            .then(updatedTask => {
                return updatedTask[0]
            })
    },
    initTasks() {
        return Task.find()
            .then(tasks => {
                if (!tasks.length) {
                    const seeds = require(`${appRoot}/seeds.json`);
                    return Task.create(seeds.tasks);
                }
                return tasks;
            })
    }

}


//private functions

function prepareFilter(filter = {}) {
    // remove empty values
    filter = _.pickBy(filter, _.identity)

    return filter
}